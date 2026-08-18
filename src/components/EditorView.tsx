import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CapturedPhoto, Scenario, StickerItem, FrameItem, FilterPreset, StickerCategory } from '../types';
import { STICKERS } from '../data/stickers';
import { FRAMES } from '../data/frames';
import { FILTERS } from '../data/filters';
import { SCENARIOS } from '../data/scenarios';
import { fabricCanvasManager } from '../services/fabricCanvas';
import {
  ArrowLeft,
  Check,
  RotateCcw,
  RotateCw,
  Trash2,
  FlipHorizontal,
  Type,
  Layers,
  Sparkles,
  Smile,
  Frame,
  Image as ImageIcon,
  Sliders,
  BringToFront,
  SendToBack,
  Plus
} from 'lucide-react';

interface EditorViewProps {
  photo: CapturedPhoto;
  initialScenario: Scenario;
  onBackToCamera: () => void;
  onProceedToExport: (compositeDataUrl: string) => void;
}

type EditorTab = 'stickers' | 'frames' | 'backgrounds' | 'filters';

export const EditorView: React.FC<EditorViewProps> = ({
  photo,
  initialScenario,
  onBackToCamera,
  onProceedToExport
}) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);

  const [activeTab, setActiveTab] = useState<EditorTab>('stickers');
  const [selectedCategory, setSelectedCategory] = useState<StickerCategory>('ford');
  const [currentScenario, setCurrentScenario] = useState<Scenario>(initialScenario);
  const [selectedFrameId, setSelectedFrameId] = useState<string>('ford-adventure-tour');
  const [selectedFilterId, setSelectedFilterId] = useState<string>('normal');
  const [showOriginalBg, setShowOriginalBg] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize Fabric Canvas with layers
  const initEditor = useCallback(async () => {
    if (!canvasElementRef.current) return;
    setIsReady(false);

    await fabricCanvasManager.init(canvasElementRef.current, 1080, 1920);

    // Layer 1: Sfondo (Scenario or Raw)
    const bgUrl = showOriginalBg ? photo.rawImage : currentScenario.bgUrl;
    await fabricCanvasManager.setBackground(bgUrl);

    // Layer 2: Soggetto Scontornato (or full photo if background is original)
    if (!showOriginalBg) {
      await fabricCanvasManager.setPersonImage(photo.segmentedPersonImage || photo.rawImage);
    }

    // Layer 4: Initial Frame Overlay
    const defaultFrame = FRAMES.find(f => f.id === selectedFrameId);
    if (defaultFrame && defaultFrame.overlaySvg) {
      await fabricCanvasManager.setFrame(defaultFrame.overlaySvg);
    }

    // Auto-suggest 1-2 brand stickers
    const initialSticker = STICKERS.find(s => s.id === 'bronco-wild') || STICKERS[0];
    if (initialSticker) {
      await fabricCanvasManager.addSticker(initialSticker.svgDataUri, initialSticker.defaultScale);
    }

    // Selection listener
    const canvas = fabricCanvasManager.getCanvas();
    if (canvas) {
      canvas.on('selection:created', () => setHasSelection(true));
      canvas.on('selection:updated', () => setHasSelection(true));
      canvas.on('selection:cleared', () => setHasSelection(false));
    }

    setIsReady(true);
  }, [photo, currentScenario, showOriginalBg, selectedFrameId]);

  useEffect(() => {
    initEditor();
    return () => {
      fabricCanvasManager.dispose();
    };
  }, [initEditor]);

  // Add Sticker to Canvas
  const handleAddSticker = async (sticker: StickerItem) => {
    await fabricCanvasManager.addSticker(sticker.svgDataUri, sticker.defaultScale || 0.45);
  };

  // Change Frame
  const handleSelectFrame = async (frame: FrameItem) => {
    setSelectedFrameId(frame.id);
    await fabricCanvasManager.setFrame(frame.overlaySvg);
  };

  // Change Scenario Background
  const handleSelectScenario = async (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setShowOriginalBg(false);
    await fabricCanvasManager.setBackground(scenario.bgUrl);
  };

  // Toggle Original Real Photo background
  const handleToggleOriginalBg = async () => {
    const nextState = !showOriginalBg;
    setShowOriginalBg(nextState);
    if (nextState) {
      await fabricCanvasManager.setBackground(photo.rawImage);
    } else {
      await fabricCanvasManager.setBackground(currentScenario.bgUrl);
    }
  };

  // Apply Filter
  const handleApplyFilter = (filter: FilterPreset) => {
    setSelectedFilterId(filter.id);
    fabricCanvasManager.applyFilter(filter);
  };

  // Add Custom Text
  const handleAddText = () => {
    fabricCanvasManager.addText('FORD 4X4 ADVENTURE');
  };

  // Complete editing and export
  const handleComplete = () => {
    const compositeDataUrl = fabricCanvasManager.exportComposite('jpeg', 0.95);
    onProceedToExport(compositeDataUrl);
  };

  const filteredStickers = STICKERS.filter(s => s.category === selectedCategory);

  const categories: { key: StickerCategory; label: string }[] = [
    { key: 'ford', label: 'Ford & 4x4' },
    { key: 'wildlife', label: 'Animali & Orso' },
    { key: 'adventure', label: 'Avventura' },
    { key: 'mud', label: 'Fango & Pista' },
    { key: 'badges', label: 'Badge Stand' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-ford-dark overflow-hidden select-none">
      {/* Top Action Bar */}
      <div className="relative z-30 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10">
        {/* Back Button */}
        <button
          onClick={onBackToCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nuovo Scatto</span>
        </button>

        {/* Action Controls: Undo, Redo, Add Text */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => fabricCanvasManager.undo()}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-90 transition-all"
            title="Annulla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => fabricCanvasManager.redo()}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-90 transition-all"
            title="Ripristina"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddText}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold active:scale-90 transition-all"
            title="Aggiungi Testo"
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Testo</span>
          </button>
        </div>

        {/* Done / Proceed Button */}
        <button
          onClick={handleComplete}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-ford-accent to-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-ford-accent/30 active:scale-95 transition-all"
        >
          <span>Avanti</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 overflow-hidden">
        {/* 9:16 Canvas Viewport */}
        <div className="relative w-full max-w-[420px] aspect-story max-h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <canvas
            ref={canvasElementRef}
            className="w-full h-full object-contain"
          />

          {/* Floating Sticker Action Toolbar (appears when a sticker is selected) */}
          {hasSelection && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-ford-accent shadow-2xl animate-scaleIn">
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
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-8 h-8 text-ford-accent animate-spin" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Caricamento Editor 4x4...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Multi-Tab Drawer */}
      <div className="relative z-30 bg-ford-card border-t border-ford-metal flex flex-col max-h-56 pb-2">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-around border-b border-white/10 px-2 pt-2">
          <button
            onClick={() => setActiveTab('stickers')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold tracking-wide border-b-2 transition-all ${
              activeTab === 'stickers'
                ? 'border-ford-accent text-ford-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Sticker</span>
          </button>

          <button
            onClick={() => setActiveTab('frames')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold tracking-wide border-b-2 transition-all ${
              activeTab === 'frames'
                ? 'border-ford-accent text-ford-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Frame className="w-4 h-4" />
            <span>Cornici</span>
          </button>

          <button
            onClick={() => setActiveTab('backgrounds')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold tracking-wide border-b-2 transition-all ${
              activeTab === 'backgrounds'
                ? 'border-ford-accent text-ford-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Sfondi 4x4</span>
          </button>

          <button
            onClick={() => setActiveTab('filters')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold tracking-wide border-b-2 transition-all ${
              activeTab === 'filters'
                ? 'border-ford-accent text-ford-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Filtri</span>
          </button>
        </div>

        {/* Tab 1: Stickers Content */}
        {activeTab === 'stickers' && (
          <div className="flex flex-col p-2 gap-2 overflow-hidden">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-ford-accent text-white shadow-md'
                      : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sticker Grid Items */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {filteredStickers.map(sticker => (
                <button
                  key={sticker.id}
                  onClick={() => handleAddSticker(sticker)}
                  className="flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-ford-accent transition-all active:scale-95 group w-20 h-20"
                >
                  <img
                    src={sticker.svgDataUri}
                    alt={sticker.name}
                    className="max-w-[50px] max-h-[50px] object-contain transition-transform group-hover:scale-110"
                  />
                  <span className="text-[9px] text-gray-300 truncate w-full text-center mt-1">
                    {sticker.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Frames Content */}
        {activeTab === 'frames' && (
          <div className="flex items-center gap-3 p-3 overflow-x-auto no-scrollbar">
            {FRAMES.map(frame => {
              const isSelected = frame.id === selectedFrameId;
              return (
                <button
                  key={frame.id}
                  onClick={() => handleSelectFrame(frame)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all w-28 h-24 ${
                    isSelected
                      ? 'bg-ford-blue/60 border-ford-accent ring-2 ring-ford-accent ring-offset-1 ring-offset-black text-white'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Frame className={`w-6 h-6 mb-1 ${isSelected ? 'text-ford-accent' : 'text-gray-400'}`} />
                  <span className="text-[11px] font-bold truncate w-full">{frame.name}</span>
                  <span className="text-[9px] text-gray-400 truncate w-full">{frame.styleName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 3: Backgrounds Content */}
        {activeTab === 'backgrounds' && (
          <div className="flex items-center gap-3 p-3 overflow-x-auto no-scrollbar">
            {/* Toggle Real Original Background */}
            <button
              onClick={handleToggleOriginalBg}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all w-32 h-24 ${
                showOriginalBg
                  ? 'bg-ford-accent/40 border-ford-accent ring-2 ring-ford-accent text-white'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-6 h-6 mb-1 text-emerald-400" />
              <span className="text-[11px] font-bold">Foto Reale</span>
              <span className="text-[9px] text-gray-400">Senza sfondo AI</span>
            </button>

            {/* 4x4 Scenarios */}
            {SCENARIOS.map(scen => {
              const isSelected = scen.id === currentScenario.id && !showOriginalBg;
              return (
                <button
                  key={scen.id}
                  onClick={() => handleSelectScenario(scen)}
                  className={`relative flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border text-left transition-all ${
                    isSelected
                      ? 'border-ford-accent ring-2 ring-ford-accent scale-105 shadow-xl'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={scen.thumbnailUrl}
                    alt={scen.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <div className="text-[10px] font-black text-white truncate">{scen.name}</div>
                    <div className="text-[8px] text-ford-accent font-bold uppercase">{scen.vehicle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 4: Filters Content */}
        {activeTab === 'filters' && (
          <div className="flex items-center gap-3 p-3 overflow-x-auto no-scrollbar">
            {FILTERS.map(filter => {
              const isSelected = filter.id === selectedFilterId;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleApplyFilter(filter)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all w-28 h-24 ${
                    isSelected
                      ? 'bg-ford-accent/30 border-ford-accent ring-2 ring-ford-accent text-white'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Sliders className={`w-5 h-5 mb-1 ${isSelected ? 'text-ford-accent' : 'text-gray-400'}`} />
                  <span className="text-[11px] font-bold truncate w-full">{filter.name}</span>
                  <span className="text-[9px] text-gray-400 truncate w-full">{filter.toneDescription}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
