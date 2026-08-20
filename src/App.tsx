import React, { useState } from 'react';
import { AppStep, CapturedPhoto, StickerItem } from './types';
import { LandingScreen } from './components/LandingScreen';
import { CameraView } from './components/CameraView';
import { EditorView } from './components/EditorView';
import { ExportView } from './components/ExportView';
import { StickersModal } from './components/StickersModal';
import { GalleryModal } from './components/GalleryModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [compositeDataUrl, setCompositeDataUrl] = useState<string | null>(null);
  const [sessionPhotos, setSessionPhotos] = useState<CapturedPhoto[]>([]);
  const [isStickersModalOpen, setIsStickersModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const handleStartExperience = () => {
    setCurrentStep('camera');
  };

  const handlePhotoCaptured = (photo: CapturedPhoto) => {
    setCapturedPhoto(photo);
    // Add to ephemeral session gallery
    setSessionPhotos((prev) => [photo, ...prev]);
    setCurrentStep('editor');
  };

  const handleBackToCamera = () => {
    setCurrentStep('camera');
  };

  const handleProceedToExport = (dataUrl: string) => {
    setCompositeDataUrl(dataUrl);
    setCurrentStep('export');
  };

  const handleRetakeAll = () => {
    setCapturedPhoto(null);
    setCompositeDataUrl(null);
    setCurrentStep('camera');
  };

  const handleSelectFromGallery = (photo: CapturedPhoto) => {
    setCapturedPhoto(photo);
    setCurrentStep('editor');
  };

  const handleDeleteFromGallery = (timestamp: number) => {
    setSessionPhotos((prev) => prev.filter((p) => p.timestamp !== timestamp));
  };

  const handleSelectSticker = (sticker: StickerItem) => {
    // If not in editor yet, we can transition to camera or editor
    if (currentStep === 'landing') {
      setCurrentStep('camera');
    }
  };

  const lastPhoto = sessionPhotos.length > 0 ? sessionPhotos[0] : null;

  return (
    <main className="relative w-full h-full max-w-lg mx-auto bg-black flex flex-col overflow-hidden shadow-2xl">
      {/* Screen 1: InstaFord Landing Screen (Page 2) */}
      {currentStep === 'landing' && (
        <LandingScreen
          onStart={handleStartExperience}
          onOpenStickers={() => setIsStickersModalOpen(true)}
          onOpenGallery={() => setIsGalleryModalOpen(true)}
          lastPhoto={lastPhoto}
        />
      )}

      {/* Screen 2: Real-time Camera View (Page 3) */}
      {currentStep === 'camera' && (
        <CameraView
          onPhotoCaptured={handlePhotoCaptured}
          onOpenStickers={() => setIsStickersModalOpen(true)}
          onOpenGallery={() => setIsGalleryModalOpen(true)}
          lastPhoto={lastPhoto}
        />
      )}

      {/* Screen 3: Post-Capture Editor Studio with Stickers & Pinch-to-Zoom */}
      {currentStep === 'editor' && capturedPhoto && (
        <EditorView
          photo={capturedPhoto}
          onBackToCamera={handleBackToCamera}
          onProceedToExport={handleProceedToExport}
        />
      )}

      {/* Screen 4: High-Res Export & Instagram Share */}
      {currentStep === 'export' && compositeDataUrl && (
        <ExportView
          compositeDataUrl={compositeDataUrl}
          onRetake={handleRetakeAll}
          onOpenGallery={() => setIsGalleryModalOpen(true)}
        />
      )}

      {/* Global Stickers Modal (Page 3 Right) */}
      <StickersModal
        isOpen={isStickersModalOpen}
        onClose={() => setIsStickersModalOpen(false)}
        onSelectSticker={handleSelectSticker}
      />

      {/* Session Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        photos={sessionPhotos}
        onSelectPhoto={handleSelectFromGallery}
        onDeletePhoto={handleDeleteFromGallery}
      />
    </main>
  );
};

export default App;
