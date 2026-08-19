import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CameraFacingMode, CapturedPhoto } from '../types';
import { cameraService } from '../services/camera';
import { soundService } from '../services/soundEffects';
import { OFFICIAL_FRAME } from '../data/frames';
import { HeaderBar } from './HeaderBar';
import { StandModal } from './StandModal';
import { Image as ImageIcon, AlertCircle, RefreshCcw } from 'lucide-react';

interface CameraViewProps {
  onPhotoCaptured: (photo: CapturedPhoto) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  onPhotoCaptured
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<CameraFacingMode>('user');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isStandModalOpen, setIsStandModalOpen] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Initialize and start camera stream
  const initCamera = useCallback(async (mode: CameraFacingMode) => {
    if (!videoRef.current) return;
    setCameraError(null);
    try {
      await cameraService.startCamera(videoRef.current, mode);
      setIsCameraActive(true);
      setFacingMode(mode);
    } catch (err) {
      console.warn('Camera start error:', err);
      setCameraError(
        'Impossibile accedere alla fotocamera. Verifica i permessi del browser o carica una foto dalla galleria.'
      );
      setIsCameraActive(false);
    }
  }, []);

  useEffect(() => {
    initCamera(facingMode);
    return () => {
      cameraService.stopCamera();
    };
  }, [initCamera, facingMode]);

  // Toggle Timer (Off -> 3s -> Off)
  const handleToggleTimer = () => {
    setTimerSeconds((prev) => (prev === 0 ? 3 : 0));
  };

  // Toggle Torch
  const handleToggleTorch = async () => {
    const newState = await cameraService.toggleTorch();
    setIsTorchOn(newState);
  };

  // Switch Camera
  const handleToggleFacingMode = async () => {
    const nextMode: CameraFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    await initCamera(nextMode);
  };

  // Capture Photo
  const executeCapture = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);
    soundService.playShutter();
    setShowFlash(true);

    setTimeout(() => setShowFlash(false), 250);

    const isUserFacing = facingMode === 'user';
    const video = videoRef.current;
    const width = video.videoWidth || 1080;
    const height = video.videoHeight || 1920;

    const rawCapture = cameraService.captureFrame(video, isUserFacing);

    setIsCapturing(false);
    setCountdown(null);

    onPhotoCaptured({
      dataUrl: rawCapture.dataUrl,
      width,
      height,
      facingMode,
      timestamp: Date.now()
    });
  };

  // Shutter trigger with countdown
  const handleTriggerCapture = () => {
    if (isCapturing) return;

    if (timerSeconds > 0) {
      setCountdown(timerSeconds);
      soundService.playBeep(false);

      let current = timerSeconds;
      const interval = setInterval(() => {
        current -= 1;
        if (current > 0) {
          setCountdown(current);
          soundService.playBeep(false);
        } else {
          clearInterval(interval);
          setCountdown(null);
          soundService.playBeep(true);
          executeCapture();
        }
      }, 1000);
    } else {
      executeCapture();
    }
  };

  // Fallback gallery image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onPhotoCaptured({
          dataUrl,
          width: img.width,
          height: img.height,
          facingMode: 'user',
          timestamp: Date.now()
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden select-none">
      {/* Top Header Bar */}
      <HeaderBar
        timerSeconds={timerSeconds}
        onToggleTimer={handleToggleTimer}
        isTorchOn={isTorchOn}
        onToggleTorch={handleToggleTorch}
        facingMode={facingMode}
        onToggleFacingMode={handleToggleFacingMode}
        onOpenStandModal={() => setIsStandModalOpen(true)}
      />

      {/* Main Viewport: Live Camera + Ford Racing Frame Overlay */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        {/* 9:16 Viewport Container with Apple Glass Border */}
        <div className="relative w-full max-w-[420px] aspect-story max-h-full rounded-[26px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-black border border-white/10 flex items-center justify-center">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />

          {/* Official Ford Racing Frame Overlay (Live!) */}
          <img
            src={OFFICIAL_FRAME.imageSrc}
            alt="Ford Racing Frame"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
          />

          {/* Shutter White Flash Animation */}
          {showFlash && (
            <div className="absolute inset-0 bg-white z-40 animate-flash pointer-events-none" />
          )}

          {/* Countdown Display */}
          {countdown !== null && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 backdrop-blur-sm">
              <div className="text-[7rem] font-bold text-white tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-sans animate-apple-fade-in">
                {countdown}
              </div>
            </div>
          )}

          {/* Camera Permission Error Overlay */}
          {cameraError && (
            <div className="absolute inset-4 z-30 flex flex-col items-center justify-center p-6 rounded-[22px] apple-glass-heavy text-center">
              <AlertCircle className="w-9 h-9 text-[#0062FF] mb-3" />
              <h3 className="text-base font-semibold text-white mb-1.5 tracking-[-0.01em]">Accesso Fotocamera</h3>
              <p className="text-xs text-white/60 mb-5 max-w-xs leading-relaxed">{cameraError}</p>

              <div className="flex flex-col gap-2.5 w-full max-w-xs">
                <button
                  onClick={() => initCamera(facingMode)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-[14px] bg-[#0062FF] text-white font-medium text-xs tracking-[-0.01em] shadow-md apple-button"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Riprova Accesso
                </button>

                <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-[14px] apple-glass text-white/90 font-medium text-xs cursor-pointer apple-button">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Carica Foto da Galleria
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Area with Apple Camera Style Shutter */}
      <div className="relative z-20 pb-7 pt-2 flex items-center justify-around max-w-xs mx-auto w-full px-6">
        {/* Upload File Button */}
        <label className="p-3.5 rounded-full apple-glass apple-button text-white/90 hover:text-white cursor-pointer shadow-md">
          <ImageIcon className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Apple iOS Camera Shutter Button */}
        <button
          onClick={handleTriggerCapture}
          disabled={isCapturing}
          className="group relative flex items-center justify-center w-[74px] h-[74px] rounded-full apple-shutter-ring focus:outline-none"
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
          {/* Inner Circle */}
          <div className="w-[60px] h-[60px] rounded-full bg-white group-active:scale-90 transition-transform duration-100 ease-out shadow-inner" />
        </button>

        {/* Quick Flip Camera Button */}
        <button
          onClick={handleToggleFacingMode}
          className="p-3.5 rounded-full apple-glass apple-button text-white/90 hover:text-white shadow-md"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Stand QR Modal */}
      <StandModal
        isOpen={isStandModalOpen}
        onClose={() => setIsStandModalOpen(false)}
      />
    </div>
  );
};
