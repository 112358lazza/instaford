import React, { useState } from 'react';
import { AppStep, CapturedPhoto } from './types';
import { LandingScreen } from './components/LandingScreen';
import { CameraView } from './components/CameraView';
import { EditorView } from './components/EditorView';
import { ExportView } from './components/ExportView';
import { StandModal } from './components/StandModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [compositeDataUrl, setCompositeDataUrl] = useState<string | null>(null);
  const [isStandModalOpen, setIsStandModalOpen] = useState(false);

  const handleStartExperience = () => {
    setCurrentStep('camera');
  };

  const handlePhotoCaptured = (photo: CapturedPhoto) => {
    setCapturedPhoto(photo);
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

  return (
    <main className="relative w-full h-full max-w-lg mx-auto bg-[#080b11] flex flex-col overflow-hidden shadow-2xl">
      {/* Screen 1: Landing Page */}
      {currentStep === 'landing' && (
        <LandingScreen
          onStart={handleStartExperience}
          onOpenStandModal={() => setIsStandModalOpen(true)}
        />
      )}

      {/* Screen 2: Real-time Camera with Live Ford Racing Frame Overlay */}
      {currentStep === 'camera' && (
        <CameraView
          onPhotoCaptured={handlePhotoCaptured}
        />
      )}

      {/* Screen 3: Post-Capture Editor with 2 Official Helmets */}
      {currentStep === 'editor' && capturedPhoto && (
        <EditorView
          photo={capturedPhoto}
          onBackToCamera={handleBackToCamera}
          onProceedToExport={handleProceedToExport}
        />
      )}

      {/* Screen 4: High-Res Export & Instagram Stories Share */}
      {currentStep === 'export' && compositeDataUrl && (
        <ExportView
          compositeDataUrl={compositeDataUrl}
          onRetake={handleRetakeAll}
        />
      )}

      {/* Stand QR Modal */}
      <StandModal
        isOpen={isStandModalOpen}
        onClose={() => setIsStandModalOpen(false)}
      />
    </main>
  );
};

export default App;
