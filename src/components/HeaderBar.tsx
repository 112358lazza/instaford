import React from 'react';
import { QrCode, Timer, Zap, ZapOff, RefreshCw } from 'lucide-react';
import { CameraFacingMode } from '../types';

interface HeaderBarProps {
  timerSeconds: number;
  onToggleTimer: () => void;
  isTorchOn: boolean;
  onToggleTorch: () => void;
  facingMode: CameraFacingMode;
  onToggleFacingMode: () => void;
  onOpenStandModal: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  timerSeconds,
  onToggleTimer,
  isTorchOn,
  onToggleTorch,
  facingMode,
  onToggleFacingMode,
  onOpenStandModal
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
      {/* Left: Ford Racing Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="px-2.5 py-1 rounded bg-[#002C6C] border border-[#0050d8]/50 shadow-md">
          <span className="font-sans font-black text-xs tracking-widest text-white uppercase">
            FORD
          </span>
        </div>
        <span className="text-[11px] font-bold tracking-[0.18em] text-[#4d88ff] uppercase drop-shadow">
          RACING
        </span>
      </div>

      {/* Right: Premium Camera Controls */}
      <div className="flex items-center gap-2">
        {/* Timer Button */}
        <button
          onClick={onToggleTimer}
          className={`relative p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 border ${
            timerSeconds > 0
              ? 'bg-[#0050d8] text-white border-[#0050d8] shadow-[0_0_12px_rgba(0,80,216,0.5)]'
              : 'bg-black/40 text-white/90 hover:bg-black/60 border-white/10'
          }`}
          title="Autoscatto"
        >
          <Timer className="w-4 h-4" />
          {timerSeconds > 0 && (
            <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-white text-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {timerSeconds}
            </span>
          )}
        </button>

        {/* Torch Button */}
        <button
          onClick={onToggleTorch}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 border ${
            isTorchOn
              ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
              : 'bg-black/40 text-white/90 hover:bg-black/60 border-white/10'
          }`}
          title="Torcia"
        >
          {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
        </button>

        {/* Switch Camera Button */}
        <button
          onClick={onToggleFacingMode}
          className="p-2.5 rounded-full bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-md border border-white/10 transition-all active:scale-90 shadow-md"
          title={`Passa a fotocamera ${facingMode === 'user' ? 'posteriore' : 'frontale'}`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Stand QR Modal Button */}
        <button
          onClick={onOpenStandModal}
          className="p-2.5 rounded-full bg-white/[0.08] text-white hover:bg-white/[0.15] backdrop-blur-md border border-white/15 transition-all active:scale-90 shadow-md"
          title="Info Stand"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
