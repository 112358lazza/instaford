import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CameraFacingMode, CapturedPhoto } from '../types';
import { cameraService } from '../services/camera';
import { soundService } from '../services/soundEffects';
import { AlertCircle, Image as ImageIcon } from 'lucide-react';

interface CameraViewProps {
  onPhotoCaptured: (photo: CapturedPhoto) => void;
  onOpenGallery: () => void;
  lastPhoto?: CapturedPhoto | null;
}

export const CameraView: React.FC<CameraViewProps> = ({
  onPhotoCaptured,
  onOpenGallery,
  lastPhoto
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode] = useState<CameraFacingMode>('user');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Initialize and start camera stream (Selfie / Front camera default)
  const initCamera = useCallback(async (mode: CameraFacingMode) => {
    if (!videoRef.current) return;
    setCameraError(null);
    try {
      await cameraService.startCamera(videoRef.current, mode);
      setIsCameraActive(true);
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

  // Capture Photo
  const executeCapture = () => {
    if (!videoRef.current || isCapturing) return;
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

    onPhotoCaptured({
      dataUrl: rawCapture.dataUrl,
      width,
      height,
      facingMode,
      timestamp: Date.now()
    });
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
      {/* Main Viewport: Clean Fullscreen Live Camera Feed */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        <div className="relative w-full max-w-[420px] aspect-story max-h-full rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-black border border-white/10 flex items-center justify-center">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />

          {/* Shutter White Flash Animation */}
          {showFlash && (
            <div className="absolute inset-0 bg-white z-40 animate-flash pointer-events-none" />
          )}

          {/* Camera Permission Error Overlay */}
          {cameraError && (
            <div className="absolute inset-4 z-30 flex flex-col items-center justify-center p-6 rounded-[22px] apple-glass-heavy text-center">
              <AlertCircle className="w-9 h-9 text-[#0032ff] mb-3" />
              <h3 className="text-base font-semibold text-white mb-1.5 tracking-[-0.01em]">Accesso Fotocamera</h3>
              <p className="text-xs text-white/60 mb-5 max-w-xs leading-relaxed">{cameraError}</p>

              <div className="flex flex-col gap-2.5 w-full max-w-xs">
                <button
                  onClick={() => initCamera(facingMode)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-[14px] bg-[#0032ff] text-white font-medium text-xs tracking-[-0.01em] shadow-md apple-button"
                >
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

      {/* Bottom Controls Bar: Gallery on left & Centered Shutter */}
      <div className="relative z-20 pb-7 pt-2 flex items-center justify-center max-w-xs mx-auto w-full px-6">
        <div className="w-full flex items-center justify-between">
          {/* Left: Gallery Thumbnail Square */}
          <button
            onClick={onOpenGallery}
            className="w-12 h-12 rounded-[14px] apple-glass flex items-center justify-center overflow-hidden border border-white/30 shadow-md apple-button"
            title="Galleria foto scattate"
          >
            {lastPhoto ? (
              <img
                src={lastPhoto.dataUrl}
                alt="Ultima foto"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-5 h-5 text-white/70" />
            )}
          </button>

          {/* Center: Apple / Instagram Circular Shutter Button */}
          <button
            onClick={executeCapture}
            disabled={isCapturing}
            className="group relative flex items-center justify-center w-[76px] h-[76px] rounded-full apple-shutter-ring focus:outline-none"
            title="Scatta selfie"
          >
            {/* Outer White Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-white shadow-[0_0_22px_rgba(255,255,255,0.35)]" />
            {/* Inner White Shutter Circle */}
            <div className="w-[62px] h-[62px] rounded-full bg-white group-active:scale-90 transition-transform duration-100 ease-out shadow-inner" />
          </button>

          {/* Spacer to balance gallery button */}
          <div className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};
