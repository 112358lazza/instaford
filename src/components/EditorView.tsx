import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CapturedPhoto, StickerItem, FilterPreset } from '../types';
import { STICKERS } from '../data/stickers';
import { FILTERS } from '../data/filters';
import { fabricCanvasManager } from '../services/fabricCanvas';
import {
  ArrowLeft,
  Check,
  RotateCcw,
  RotateCw,
  Trash2,
  FlipHorizontal,
  Type,
  Sparkles,
  Sliders,
  BringToFront,
  SendToBack,
  Plus
} from 'lucide-react';

interface EditorViewProps {
  photo: CapturedPhoto;
  onBackToCamera: () => void;
  onProceedToExport: (compositeDataUrl: string) => void;
}

type EditorTab = 'helmets' | 'filters';

export const EditorView: React.FC<EditorViewProps> = ({
  photo,
  onBackToCamera,
  onProceedToExport
}) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);

  const [activeTab, setActiveTab] = useState<EditorTab>('helmets');
  const [selectedFilterId, setSelectedFilterId] = useState<string>('natural');
  const [hasSelection, setHasSelection] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize Fabric Canvas
  const initEditor = useCallback(async () => {
    if (!canvasElementRef.current) return;
    setIsReady(false);

    await fabricCanvasManager.init(canvasElementRef.current, 1080, 1920);

    // Layer 1: User's real captured photo
    await fabricCanvasManager.setPhoto(photo.dataUrl);

    // Layer 3: Official Ford Racing Frame (locked on top)
    await fabricCanvasManager.loadOfficialFrame();

    // Auto-add first helmet as initial suggestion
    const defaultHelmet = STICKERS[0];
    if (defaultHelmet) {
      await fabricCanvasManager.addHelmetSticker(defaultHelmet.imageSrc, defaultHelmet.defaultScale);
    }

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
    return () => {
      fabricCanvasManager.dispose();
    };
  }, [initEditor]);

  // Add Helmet Sticker
  const handleAddHelmet = async (sticker: StickerItem) => {
    await fabricCanvasManager.addHelmetSticker(sticker.imageSrc, sticker.defaultScale || 0.35);
  };

  // Apply Filter
  const handleApplyFilter = (filter: FilterPreset) => {
    setSelectedFilterId(filter.id);
    fabricCanvasManager.applyFilter(filter);
  };

  // Add Text
  const handleAddText = () => {
    fabricCanvasManager.addText('FORD RACING');
  };

  // Finish & Export
  const handleComplete = () => {
    const compositeDataUrl = fabricCanvasManager.exportComposite('jpeg', 0.96);
    onProceedToExport(compositeDataUrl);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden select-none">
      {/* Top Action Bar with Apple Glass */}
      <div className="relative z-30 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]">
        {/* Back Button */}
        <button
          onClick={onBackToCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-glass apple-button text-white/90 hover:text-white text-xs font-medium tracking-[-0.01em]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Scatta</span>
        </button>

        {/* Action Controls: Undo, Redo, Add Text */}
        <div className="flex items-center gap-1 p-0.5 rounded-full apple-glass">
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
          <div className="w-px h-3.5 bg-white/10 mx-0.5" />
          <button
            onClick={handleAddText}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full apple-button text-white/90 hover:text-white text-xs font-medium"
            title="Aggiungi Testo"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Testo</span>
          </button>
        </div>

        {/* Done / Proceed Button */}
        <button
          onClick={handleComplete}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#0062FF] hover:bg-[#1a73ff] text-white text-xs font-semibold tracking-[-0.01em] shadow-[0_2px_12px_rgba(0,98,255,0.4)] apple-button"
        >
          <span>Avanti</span>
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Canvas Studio Area */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        {/* 9:16 Canvas Container */}
        <div className="relative w-full max-w-[420px] aspect-story max-h-full flex items-center justify-center rounded-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-black">
          <canvas
            ref={canvasElementRef}
            className="w-full h-full object-contain"
          />

          {/* Floating Sticker Action Capsule (when a helmet is selected) */}
          {hasSelection && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1 rounded-full apple-glass-heavy shadow-2xl animate-apple-fade-in">
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
                <Sparkles className="w-6 h-6 text-[#0062FF] animate-spin" />
                <span className="text-xs font-medium text-white/70 tracking-[-0.01em]">
                  Caricamento Studio...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet Drawer with Apple Segmented Control */}
      <div className="relative z-30 apple-glass-heavy border-t border-white/[0.08] flex flex-col pb-5 pt-3 px-4">
        {/* Apple Segmented Control Header */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-white/[0.08] max-w-xs w-full">
            <button
              onClick={() => setActiveTab('helmets')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium tracking-[-0.01em] transition-all duration-150 ${
                activeTab === 'helmets'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Caschi Ufficiali (2)
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium tracking-[-0.01em] transition-all duration-150 ${
                activeTab === 'filters'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Filtri Studio
            </button>
          </div>
        </div>

        {/* Tab 1: 2 Official Helmets */}
        {activeTab === 'helmets' && (
          <div className="flex items-center justify-center gap-3">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => handleAddHelmet(sticker)}
                className="flex-1 max-w-[170px] flex flex-col items-center p-2.5 rounded-[18px] apple-glass-card hover:bg-white/[0.08] apple-button group"
              >
                <div className="relative w-16 h-14 flex items-center justify-center mb-1">
                  <img
                    src={sticker.imageSrc}
                    alt={sticker.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0062FF] text-white flex items-center justify-center shadow-md">
                    <Plus className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-white tracking-[-0.01em] truncate w-full text-center">
                  {sticker.name}
                </div>
                <div className="text-[9px] text-white/50 tracking-[-0.01em] truncate w-full text-center">
                  {sticker.subtitle}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Pro Photography Filters */}
        {activeTab === 'filters' && (
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {FILTERS.map((filter) => {
              const isSelected = filter.id === selectedFilterId;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleApplyFilter(filter)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-[16px] text-center apple-button w-24 h-18 ${
                    isSelected
                      ? 'bg-[#0062FF] text-white shadow-md'
                      : 'apple-glass-card text-white/70 hover:text-white'
                  }`}
                >
                  <Sliders className={`w-3.5 h-3.5 mb-1 ${isSelected ? 'text-white' : 'text-white/60'}`} />
                  <span className="text-[10px] font-medium tracking-[-0.01em] truncate w-full">{filter.name}</span>
                  <span className={`text-[8px] truncate w-full ${isSelected ? 'text-white/80' : 'text-white/40'}`}>{filter.subtitle}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
