import React from 'react';
import { STICKERS } from '../data/stickers';
import { StickerItem } from '../types';
import { X } from 'lucide-react';

interface StickersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSticker: (sticker: StickerItem) => void;
}

export const StickersModal: React.FC<StickersModalProps> = ({
  isOpen,
  onClose,
  onSelectSticker
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-apple-fade-in">
      <div className="relative w-full max-w-sm max-h-[85vh] flex flex-col rounded-[26px] apple-glass-heavy border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Header with Ford Racing & F1 logos + Close X button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            {/* Ford Racing Logo */}
            <div className="px-2.5 py-1 rounded bg-[#002C6C] border border-[#0050d8]/50">
              <span className="font-sans font-black text-xs tracking-widest text-white uppercase">
                FORD RACING
              </span>
            </div>
            {/* F1 Logo Badge */}
            <div className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] tracking-wider italic">
              F1
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white apple-glass apple-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sticker Grid Items */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 no-scrollbar">
          {STICKERS.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => {
                onSelectSticker(sticker);
                onClose();
              }}
              className="flex flex-col items-center justify-center p-3 rounded-[18px] apple-glass-card hover:bg-white/[0.08] apple-button group transition-all"
            >
              <div className="relative w-full h-20 flex items-center justify-center mb-2">
                <img
                  src={sticker.imageSrc}
                  alt={sticker.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-150"
                />
              </div>
              <span className="text-[11px] font-semibold text-white tracking-[-0.01em] truncate w-full text-center">
                {sticker.name}
              </span>
              <span className="text-[9px] text-white/50 tracking-[-0.01em] truncate w-full text-center">
                {sticker.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
