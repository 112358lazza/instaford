import React from 'react';
import { Timer, Zap, ZapOff, RefreshCw } from 'lucide-react';
import { CameraFacingMode } from '../types';

interface HeaderBarProps {
  timerSeconds: number;
  onToggleTimer: () => void;
  isTorchOn: boolean;
  onToggleTorch: () => void;
  facingMode: CameraFacingMode;
  onToggleFacingMode: () => void;
  onOpenStickers: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  timerSeconds,
  onToggleTimer,
  isTorchOn,
  onToggleTorch,
  facingMode,
  onToggleFacingMode,
  onOpenStickers
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-3 pointer-events-auto">
      {/* Left: InstaFord Brand Logo */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full apple-glass shadow-lg">
        <div className="w-2 h-2 rounded-full bg-[#0032ff] shadow-[0_0_6px_#0032ff]" />
        <span className="font-bold text-xs text-white tracking-[-0.01em]">
          InstaFord
        </span>
      </div>

      {/* Right: Floating Controls Capsule */}
      <div className="flex items-center gap-1.5 p-1 rounded-full apple-glass shadow-lg">
        {/* Stickers Quick Button */}
        <button
          onClick={onOpenStickers}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full apple-button text-white/90 hover:text-white"
          title="Stickers"
        >
          <img
            src="/assets/branding/casco_simbolo.png"
            alt="Stickers"
            className="w-4 h-4 object-contain"
          />
          <span className="text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
            Stickers
          </span>
        </button>

        <div className="w-px h-3.5 bg-white/15 mx-0.5" />

        {/* Timer Button */}
        <button
          onClick={onToggleTimer}
          className={`relative p-2 rounded-full apple-button ${
            timerSeconds > 0
              ? 'bg-[#0032ff] text-white shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
          title="Autoscatto"
        >
          <Timer className="w-4 h-4" />
          {timerSeconds > 0 && (
            <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold bg-white text-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {timerSeconds}
            </span>
          )}
        </button>

        {/* Torch Button */}
        <button
          onClick={onToggleTorch}
          className={`p-2 rounded-full apple-button ${
            isTorchOn
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
          title="Torcia"
        >
          {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
        </button>

        {/* Switch Camera Button */}
        <button
          onClick={onToggleFacingMode}
          className="p-2 rounded-full apple-button text-white/80 hover:text-white"
          title={`Passa a fotocamera ${facingMode === 'user' ? 'posteriore' : 'frontale'}`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
