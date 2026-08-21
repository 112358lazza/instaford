import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CapturedPhoto, StickerItem } from '../types';
import { fabricCanvasManager } from '../services/fabricCanvas';
import { StickersModal } from './StickersModal';
import {
  ArrowLeft,
  Check,
  RotateCcw,
  RotateCw,
  Trash2,
  FlipHorizontal,
  BringToFront,
  SendToBack,
  Sparkles
} from 'lucide-react';

interface EditorViewProps {
  photo: CapturedPhoto;
  onBackToCamera: () => void;
  onProceedToExport: (compositeDataUrl: string) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  photo,
  onBackToCamera,
  onProceedToExport
}) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasSelection, setHasSelection] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isStickersModalOpen, setIsStickersModalOpen] = useState(false);

  // Initialize Fabric Canvas
  const initEditor = useCallback(async () => {
    if (!canvasElementRef.current || !containerRef.current) return;
    setIsReady(false);

    await fabricCanvasManager.init(
      canvasElementRef.current,
      containerRef.current,
      1080,
      1920
    );

    // Layer 1: User's real captured photo
    await fabricCanvasManager.setPhoto(photo.dataUrl);

    // Layer 3: Official Ford Racing Frame Overlay (touch passes through to stickers)
    await fabricCanvasManager.loadOfficialFrame();

    // Selection listener
    const canvas = fabricCanvasManager.getCanvas();
    if (canvas) {
      canvas.on('selection:created', () => setHasSelection(true));
      canvas.on('selection:updated', () => setHasSelection(true));
      canvas.on('selection:cleared', () => setHasSelection(false));
    }

    setIsReady(true);
  }, [photo]);

  useEffect(() => {
    initEditor();

    const handleResize = () => {
      fabricCanvasManager.updateCanvasDimensions();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      fabricCanvasManager.dispose();
    };
  }, [initEditor]);

  // Add Sticker from Modal
  const handleAddSticker = async (sticker: StickerItem) => {
    await fabricCanvasManager.addHelmetSticker(sticker.imageSrc, sticker.defaultScale || 0.38);
  };

  // Finish & Export
  const handleComplete = () => {
    const compositeDataUrl = fabricCanvasManager.exportComposite('jpeg', 0.96);
    onProceedToExport(compositeDataUrl);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden select-none">
      {/* Top Action Bar: Scatta, Undo/Redo, Avanti (NO TESTO) */}
      <header className="relative z-30 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]">
        {/* Back / Retake Button */}
        <button
          onClick={onBackToCamera}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full apple-glass apple-button text-white/90 hover:text-white text-xs font-medium tracking-[-0.01em]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Scatta</span>
        </button>

        {/* Action Controls: Undo & Redo only */}
        <div className="flex items-center gap-1.5 p-1 rounded-full apple-glass">
          <button
            onClick={() => fabricCanvasManager.undo()}
            className="p-1.5 rounded-full apple-button text-white/80 hover:text-white"
            title="Annulla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => fabricCanvasManager.redo()}
            className="p-1.5 rounded-full apple-button text-white/80 hover:text-white"
            title="Ripristina"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Proceed / Next Button */}
        <button
          onClick={handleComplete}
          className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#0032ff] hover:bg-[#1a4fff] text-white text-xs font-semibold tracking-[-0.01em] shadow-[0_2px_12px_rgba(0,50,255,0.4)] apple-button"
        >
          <span>Avanti</span>
          <Check className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Fullscreen Studio Area */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        {/* 9:16 Interactive Canvas Container with Full Touch Area */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[420px] aspect-story max-h-full flex items-center justify-center rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-black touch-none"
        >
          <canvas
            ref={canvasElementRef}
            className="w-full h-full object-contain"
          />

          {/* Floating Sticker Setting Pill: MOVED TO TOP-LEFT IN ACCORDANCE WITH USER DRAWING */}
          {hasSelection && (
            <div className="absolute top-3.5 left-3.5 z-40 flex items-center gap-1 p-1 rounded-full apple-glass-heavy shadow-2xl border border-white/15 animate-apple-fade-in">
              <button
                onClick={() => fabricCanvasManager.flipActiveObject()}
                className="p-2 rounded-full apple-button text-white/85 hover:text-white"
                title="Specchia Orizzontale"
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => fabricCanvasManager.bringActiveForward()}
                className="p-2 rounded-full apple-button text-white/85 hover:text-white"
                title="Porta Avanti"
              >
                <BringToFront className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => fabricCanvasManager.sendActiveBackward()}
                className="p-2 rounded-full apple-button text-white/85 hover:text-white"
                title="Porta Indietro"
              >
                <SendToBack className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-white/15 mx-0.5" />
              <button
                onClick={() => fabricCanvasManager.deleteActiveObject()}
                className="p-2 rounded-full apple-button text-red-400 hover:text-red-300"
                title="Elimina"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {!isReady && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#0032ff] animate-spin" />
                <span className="text-xs font-medium text-white/70 tracking-[-0.01em]">
                  Caricamento Studio...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Center Bar: Only SCEGLI STICKER Button */}
      <footer className="relative z-30 pb-6 pt-2 px-6 flex items-center justify-center">
        <button
          onClick={() => setIsStickersModalOpen(true)}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full apple-glass apple-button text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] border border-white/20"
        >
          <img
            src="/assets/branding/casco_simbolo.png"
            alt="Stickers"
            className="w-5 h-5 object-contain"
          />
          <span className="font-bold text-xs uppercase tracking-wider">
            SCEGLI STICKER
          </span>
        </button>
      </footer>

      {/* Instagram-style Stickers Modal */}
      <StickersModal
        isOpen={isStickersModalOpen}
        onClose={() => setIsStickersModalOpen(false)}
        onSelectSticker={handleAddSticker}
      />
    </div>
  );
};
