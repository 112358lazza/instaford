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
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-3 pointer-events-auto">
      {/* Left: Ford Racing Apple Glass Pill */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full apple-glass shadow-lg">
        <div className="w-2 h-2 rounded-full bg-[#0062FF] shadow-[0_0_6px_#0062FF]" />
        <span className="font-semibold text-xs text-white tracking-[-0.01em]">
          Ford Racing
        </span>
      </div>

      {/* Right: Floating Controls Capsule */}
      <div className="flex items-center gap-1.5 p-1 rounded-full apple-glass shadow-lg">
        {/* Timer Button */}
        <button
          onClick={onToggleTimer}
          className={`relative p-2 rounded-full apple-button ${
            timerSeconds > 0
              ? 'bg-[#0062FF] text-white shadow-sm'
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

        {/* Stand QR Modal Button */}
        <button
          onClick={onOpenStandModal}
          className="p-2 rounded-full apple-button text-white/80 hover:text-white"
          title="Info Stand"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
