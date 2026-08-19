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
    <div className="relative w-full h-full flex flex-col bg-[#080b11] overflow-hidden select-none">
      {/* Top Action Bar */}
      <div className="relative z-30 flex items-center justify-between px-4 py-3 bg-black/85 backdrop-blur-md border-b border-white/10">
        {/* Back Button */}
        <button
          onClick={onBackToCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Rifai</span>
        </button>

        {/* Action Controls: Undo, Redo, Add Text */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => fabricCanvasManager.undo()}
            className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white active:scale-90 transition-all"
            title="Annulla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => fabricCanvasManager.redo()}
            className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white active:scale-90 transition-all"
            title="Ripristina"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleAddText}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold active:scale-90 transition-all"
            title="Aggiungi Testo"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Testo</span>
          </button>
        </div>

        {/* Done / Proceed Button */}
        <button
          onClick={handleComplete}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#002C6C] to-[#0050d8] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,80,216,0.4)] active:scale-95 transition-all"
        >
          <span>Avanti</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

      {/* Main Canvas Studio Area */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 overflow-hidden">
        {/* 9:16 Canvas Container */}
        <div className="relative w-full max-w-[420px] aspect-story max-h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <canvas
            ref={canvasElementRef}
            className="w-full h-full object-contain"
          />

          {/* Floating Sticker Action Toolbar (appears when a helmet is selected) */}
          {hasSelection && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-[#0050d8] shadow-[0_0_20px_rgba(0,80,216,0.5)] animate-scaleIn">
              <button
                onClick={() => fabricCanvasManager.flipActiveObject()}
                className="p-2 rounded-full hover:bg-white/20 text-white active:scale-90 transition-all"
                title="Specchia Orizzontale"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() => fabricCanvasManager.bringActiveForward()}
                className="p-2 rounded-full hover:bg-white/20 text-white active:scale-90 transition-all"
                title="Porta Avanti"
              >
                <BringToFront className="w-4 h-4" />
              </button>
              <button
                onClick={() => fabricCanvasManager.sendActiveBackward()}
                className="p-2 rounded-full hover:bg-white/20 text-white active:scale-90 transition-all"
                title="Porta Indietro"
              >
                <SendToBack className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-white/20 mx-0.5" />
              <button
                onClick={() => fabricCanvasManager.deleteActiveObject()}
                className="p-2 rounded-full hover:bg-red-500/30 text-red-400 active:scale-90 transition-all"
                title="Elimina"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {!isReady && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-7 h-7 text-[#0050d8] animate-spin" />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
                  Caricamento Studio...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Drawer (2 Helmets + Pro Filters) */}
      <div className="relative z-30 bg-[#0b101d] border-t border-white/10 flex flex-col pb-4 pt-2">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-center gap-8 border-b border-white/10 px-4 pb-2">
          <button
            onClick={() => setActiveTab('helmets')}
            className={`flex items-center gap-2 py-1 px-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'helmets'
                ? 'border-[#0050d8] text-white shadow-sm'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Caschi Ufficiali (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('filters')}
            className={`flex items-center gap-2 py-1 px-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'filters'
                ? 'border-[#0050d8] text-white shadow-sm'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Filtri Pro</span>
          </button>
        </div>

        {/* Tab 1: 2 Official Helmets */}
        {activeTab === 'helmets' && (
          <div className="flex items-center justify-center gap-4 px-4 pt-3">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => handleAddHelmet(sticker)}
                className="flex-1 max-w-[180px] flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#0050d8] transition-all active:scale-95 group shadow-lg"
              >
                <div className="relative w-20 h-16 flex items-center justify-center mb-1.5">
                  <img
                    src={sticker.imageSrc}
                    alt={sticker.name}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 drop-shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0050d8] text-white flex items-center justify-center shadow-md">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-[11px] font-bold text-white truncate w-full text-center">
                  {sticker.name}
                </div>
                <div className="text-[9px] text-[#4d88ff] truncate w-full text-center">
                  {sticker.subtitle}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Pro Photography Filters */}
        {activeTab === 'filters' && (
          <div className="flex items-center gap-3 px-4 pt-3 overflow-x-auto no-scrollbar">
            {FILTERS.map((filter) => {
              const isSelected = filter.id === selectedFilterId;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleApplyFilter(filter)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all w-24 h-20 ${
                    isSelected
                      ? 'bg-[#002C6C]/60 border-[#0050d8] ring-2 ring-[#0050d8] text-white shadow-lg'
                      : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Sliders className={`w-4 h-4 mb-1 ${isSelected ? 'text-[#4d88ff]' : 'text-gray-400'}`} />
                  <span className="text-[10px] font-bold truncate w-full">{filter.name}</span>
                  <span className="text-[8px] text-gray-400 truncate w-full">{filter.subtitle}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
