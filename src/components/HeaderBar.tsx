import React from 'react';
import { Camera, QrCode, Timer, Zap, ZapOff, RefreshCw, Sparkles } from 'lucide-react';
import { CameraFacingMode } from '../types';

interface HeaderBarProps {
  timerSeconds: number;
  onToggleTimer: () => void;
  isTorchOn: boolean;
  onToggleTorch: () => void;
  facingMode: CameraFacingMode;
  onToggleFacingMode: () => void;
  onOpenStandModal: () => void;
  scenarioName?: string;
  isAiReady?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  timerSeconds,
  onToggleTimer,
  isTorchOn,
  onToggleTorch,
  facingMode,
  onToggleFacingMode,
  onOpenStandModal,
  scenarioName,
  isAiReady = true
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-3 pb-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
      {/* Left: Ford Oval & Scenario Name */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ford-blue/70 backdrop-blur-md border border-white/20 shadow-lg">
          <span className="font-display font-black text-sm tracking-wider text-white">FORD</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-ford-accent text-white">
            4X4
          </span>
        </div>

        {scenarioName && (
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-200">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="truncate max-w-[140px]">{scenarioName}</span>
          </div>
        )}
      </div>

      {/* Right Controls: Timer, Torch, Flip Camera, Stand Info */}
      <div className="flex items-center gap-2">
        {/* AI Ready Indicator */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border transition-all ${
            isAiReady
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-300 animate-pulse'
          }`}
          title={isAiReady ? 'AI Segmenter attivo' : 'Caricamento AI in corso...'}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAiReady ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="hidden xs:inline">{isAiReady ? 'AI Live' : 'AI Load'}</span>
        </div>

        {/* Timer Button */}
        <button
          onClick={onToggleTimer}
          className={`relative p-2 rounded-full backdrop-blur-md transition-all active:scale-90 border ${
            timerSeconds > 0
              ? 'bg-ford-accent text-white border-ford-accent shadow-lg shadow-ford-accent/40'
              : 'bg-black/40 text-white/90 hover:bg-black/60 border-white/10'
          }`}
          title="Imposta autoscatto"
        >
          <Timer className="w-5 h-5" />
          {timerSeconds > 0 && (
            <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
              {timerSeconds}s
            </span>
          )}
        </button>

        {/* Flash / Torch Button */}
        <button
          onClick={onToggleTorch}
          className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 border ${
            isTorchOn
              ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/40'
              : 'bg-black/40 text-white/90 hover:bg-black/60 border-white/10'
          }`}
          title="Torcia fotocamera"
        >
          {isTorchOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
        </button>

        {/* Switch Camera Button */}
        <button
          onClick={onToggleFacingMode}
          className="p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-md border border-white/10 transition-all active:scale-90"
          title={`Passa a fotocamera ${facingMode === 'user' ? 'posteriore' : 'frontale'}`}
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Stand QR Modal Button */}
        <button
          onClick={onOpenStandModal}
          className="p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-md border border-white/10 transition-all active:scale-90"
          title="Mostra QR Code dello stand"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
