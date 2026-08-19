import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, ShieldCheck } from 'lucide-react';

interface StandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandModal: React.FC<StandModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ford-racing.app';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-apple-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] apple-glass-heavy p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/15">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/60 hover:text-white apple-glass apple-button"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Pill */}
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] text-white/80 text-[11px] font-medium tracking-[-0.01em] mb-4 border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
          <span>Ford Stand Experience 2026</span>
        </div>

        <h2 className="text-xl font-bold tracking-[-0.02em] text-white mb-1">
          Ford Racing Photo Booth
        </h2>
        <p className="text-xs text-white/60 mb-5 leading-relaxed">
          Inquadra il QR Code per aprire l'esperienza sul tuo smartphone.
        </p>

        {/* QR Code Card */}
        <div className="flex justify-center p-3.5 bg-white rounded-[20px] shadow-lg mb-5 mx-auto w-fit">
          <QRCodeSVG
            value={currentUrl}
            size={170}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Feature List */}
        <div className="space-y-2 text-left text-xs text-white/70 mb-5 bg-white/[0.03] p-3.5 rounded-[16px] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#388bfd] shrink-0" />
            <span>Cornice ufficiale Ford Racing in alta definizione</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#388bfd] shrink-0" />
            <span>Caschi esclusivi Miami e Verstappen</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#388bfd] shrink-0" />
            <span>Condivisione immediata su Instagram Stories</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-[14px] bg-white text-black font-semibold text-xs tracking-[-0.01em] shadow-md apple-button"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};
