import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CameraFacingMode, CapturedPhoto } from '../types';
import { cameraService } from '../services/camera';
import { soundService } from '../services/soundEffects';
import { OFFICIAL_FRAME } from '../data/frames';
import { HeaderBar } from './HeaderBar';
import { StandModal } from './StandModal';
import { Camera, Image as ImageIcon, AlertCircle, RefreshCcw } from 'lucide-react';

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

    setTimeout(() => setShowFlash(false), 300);

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
    <div className="relative w-full h-full flex flex-col bg-[#080b11] overflow-hidden select-none">
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
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 overflow-hidden">
        {/* 9:16 Viewport Container */}
        <div className="relative w-full max-w-[420px] aspect-story max-h-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />

          {/* Official Ford Racing Frame Overlay (Visible Live!) */}
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
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pulse">
              <div className="text-8xl font-black text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] font-sans">
                {countdown}
              </div>
            </div>
          )}

          {/* Camera Permission Error Overlay */}
          {cameraError && (
            <div className="absolute inset-4 z-30 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0b101d]/95 border border-[#0050d8]/30 text-center backdrop-blur-xl">
              <AlertCircle className="w-10 h-10 text-[#0050d8] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Accesso Fotocamera</h3>
              <p className="text-xs text-gray-300 mb-6 max-w-xs">{cameraError}</p>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={() => initCamera(facingMode)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0050d8] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Riprova Accesso
                </button>

                <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all">
                  <ImageIcon className="w-4 h-4" />
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

      {/* Bottom Controls Area (Luxury Shutter Button) */}
      <div className="relative z-20 pb-6 pt-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-around max-w-sm mx-auto w-full px-6">
        {/* Upload File Button */}
        <label className="p-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 text-white cursor-pointer active:scale-90 transition-all shadow-md">
          <ImageIcon className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Shutter Button with Brushed Metal Ring & Ford Blue Center */}
        <button
          onClick={handleTriggerCapture}
          disabled={isCapturing}
          className="group relative flex items-center justify-center w-20 h-20 rounded-full transition-transform active:scale-90 focus:outline-none"
        >
          {/* Outer Metallic Ring */}
          <div className="absolute inset-0 rounded-full border-[3.5px] border-white/80 group-hover:border-[#0050d8] shadow-[0_0_20px_rgba(0,80,216,0.3)] transition-colors" />
          {/* Inner Shutter Button */}
          <div className="w-16 h-16 rounded-full bg-white group-hover:bg-[#0050d8] transition-all duration-150 flex items-center justify-center shadow-inner">
            <Camera className="w-7 h-7 text-black group-hover:text-white transition-colors" />
          </div>
        </button>

        {/* Quick Flip Camera Button */}
        <button
          onClick={handleToggleFacingMode}
          className="p-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 text-white active:scale-90 transition-all shadow-md"
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
