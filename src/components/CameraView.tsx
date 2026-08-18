import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CameraFacingMode, Scenario, CapturedPhoto } from '../types';
import { cameraService } from '../services/camera';
import { segmentationService } from '../services/segmenter';
import { soundService } from '../services/soundEffects';
import { HeaderBar } from './HeaderBar';
import { ScenarioCarousel } from './ScenarioCarousel';
import { StandModal } from './StandModal';
import { Camera, Image as ImageIcon, Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';

interface CameraViewProps {
  currentScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
  onPhotoCaptured: (photo: CapturedPhoto) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  currentScenario,
  onSelectScenario,
  onPhotoCaptured
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<CameraFacingMode>('user');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isStandModalOpen, setIsStandModalOpen] = useState(false);
  const [isAiReady, setIsAiReady] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Preload background image whenever scenario changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentScenario.bgUrl;
    img.onload = () => {
      bgImageRef.current = img;
    };
  }, [currentScenario]);

  // Initialize MediaPipe AI Vision Segmenter
  useEffect(() => {
    let isMounted = true;
    segmentationService.initialize().then((ready) => {
      if (isMounted) {
        setIsAiReady(ready);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initCamera, facingMode]);

  // Real-time animation loop for AI background compositing
  const renderLoop = useCallback(() => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const isUserFacing = facingMode === 'user';
      segmentationService.renderLiveComposite(
        videoRef.current,
        bgImageRef.current,
        canvasRef.current,
        isUserFacing
      );
    }
    animationFrameRef.current = requestAnimationFrame(renderLoop);
  }, [isCameraActive, facingMode]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderLoop]);

  // Toggle Timer (Off -> 3s -> 5s -> Off)
  const handleToggleTimer = () => {
    setTimerSeconds((prev) => {
      if (prev === 0) return 3;
      if (prev === 3) return 5;
      return 0;
    });
  };

  // Toggle Torch
  const handleToggleTorch = async () => {
    const newState = await cameraService.toggleTorch();
    setIsTorchOn(newState);
  };

  // Switch between front/back cameras
  const handleToggleFacingMode = async () => {
    const nextMode: CameraFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    await initCamera(nextMode);
  };

  // Perform actual photo capture
  const executeCapture = async () => {
    if (!videoRef.current) return;
    setIsCapturing(true);
    soundService.playShutter();
    setShowFlash(true);

    setTimeout(() => setShowFlash(false), 300);

    const isUserFacing = facingMode === 'user';
    const video = videoRef.current;
    const width = video.videoWidth || 1080;
    const height = video.videoHeight || 1920;

    // Capture raw photo frame
    const rawCapture = cameraService.captureFrame(video, isUserFacing);

    // Extract high-resolution transparent person cutout
    const segmentedPersonImage = await segmentationService.extractSegmentedPerson(
      video,
      width,
      height,
      isUserFacing
    );

    setIsCapturing(false);
    setCountdown(null);

    onPhotoCaptured({
      rawImage: rawCapture.dataUrl,
      segmentedPersonImage,
      originalWidth: width,
      originalHeight: height,
      scenarioId: currentScenario.id,
      facingMode,
      timestamp: Date.now()
    });
  };

  // Start capture sequence (handles timer countdown if active)
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

  // Fallback image upload from phone gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = async () => {
        setIsCapturing(true);
        const segmentedPersonImage = await segmentationService.extractSegmentedPerson(
          img,
          img.width,
          img.height,
          false
        );
        setIsCapturing(false);
        onPhotoCaptured({
          rawImage: dataUrl,
          segmentedPersonImage,
          originalWidth: img.width,
          originalHeight: img.height,
          scenarioId: currentScenario.id,
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
      {/* Top Instagram-like Header Bar */}
      <HeaderBar
        timerSeconds={timerSeconds}
        onToggleTimer={handleToggleTimer}
        isTorchOn={isTorchOn}
        onToggleTorch={handleToggleTorch}
        facingMode={facingMode}
        onToggleFacingMode={handleToggleFacingMode}
        onOpenStandModal={() => setIsStandModalOpen(true)}
        scenarioName={currentScenario.name}
        isAiReady={isAiReady}
      />

      {/* Hidden Video Source Element for MediaPipe */}
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        autoPlay
        muted
        width={1080}
        height={1920}
      />

      {/* Live 9:16 Canvas Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1080}
          height={1920}
          className="w-full h-full max-h-full aspect-story object-cover shadow-2xl"
        />

        {/* Shutter White Flash Animation */}
        {showFlash && (
          <div className="absolute inset-0 bg-white z-40 animate-flash pointer-events-none" />
        )}

        {/* Large Countdown Overlay (3... 2... 1...) */}
        {countdown !== null && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pulse">
            <div className="text-8xl sm:text-9xl font-black text-white font-display drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] animate-ping">
              {countdown}
            </div>
          </div>
        )}

        {/* Live Scenario Watermark Badge */}
        <div className="absolute top-16 left-4 z-20 pointer-events-none flex flex-col gap-1">
          <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-ford-accent animate-spin" />
            <span className="text-xs font-black uppercase tracking-wider font-display">
              {currentScenario.vehicle}
            </span>
          </div>
          <span className="text-[10px] text-gray-300 font-medium px-1 drop-shadow-md">
            {currentScenario.name}
          </span>
        </div>

        {/* Camera Permission / Error Fallback Overlay */}
        {cameraError && (
          <div className="absolute inset-4 z-30 flex flex-col items-center justify-center p-6 rounded-3xl bg-ford-dark/95 border border-ford-metal text-center backdrop-blur-xl">
            <AlertCircle className="w-12 h-12 text-ford-accent mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Accesso Fotocamera</h3>
            <p className="text-xs text-gray-300 mb-6 max-w-xs">{cameraError}</p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={() => initCamera(facingMode)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-ford-blue text-white font-bold text-sm tracking-wide shadow-lg active:scale-95"
              >
                <RefreshCcw className="w-4 h-4" />
                Riprova Accesso
              </button>

              <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm cursor-pointer active:scale-95 transition-all">
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

      {/* Bottom Controls Area (Scenarios Carousel + Instagram Shutter Button) */}
      <div className="relative z-20 pb-6 pt-2 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
        {/* Scenarios Carousel */}
        <ScenarioCarousel
          selectedScenarioId={currentScenario.id}
          onSelectScenario={onSelectScenario}
        />

        {/* Shutter Bar Controls */}
        <div className="w-full px-6 pt-3 flex items-center justify-around max-w-sm">
          {/* Gallery / File Upload Button */}
          <label className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white cursor-pointer active:scale-90 transition-all shadow-lg">
            <ImageIcon className="w-6 h-6" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Big Instagram Stories Shutter Button */}
          <button
            onClick={handleTriggerCapture}
            disabled={isCapturing}
            className="group relative flex items-center justify-center w-20 h-20 rounded-full transition-transform active:scale-90 focus:outline-none"
          >
            {/* Outer Progress Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/80 group-hover:border-ford-accent transition-colors shadow-2xl" />
            {/* Inner Shutter Circle */}
            <div className="w-16 h-16 rounded-full bg-white group-hover:bg-ford-accent transition-all duration-150 flex items-center justify-center shadow-inner">
              <Camera className="w-7 h-7 text-black group-hover:text-white transition-colors" />
            </div>
          </button>

          {/* Quick Switch Camera Button */}
          <button
            onClick={handleToggleFacingMode}
            className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white active:scale-90 transition-all shadow-lg"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stand QR Modal */}
      <StandModal
        isOpen={isStandModalOpen}
        onClose={() => setIsStandModalOpen(false)}
      />
    </div>
  );
};
