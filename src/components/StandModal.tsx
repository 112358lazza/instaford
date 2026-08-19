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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#0b101d] border border-[#0050d8]/40 p-6 text-center shadow-[0_15px_50px_rgba(0,44,108,0.5)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ford Stand Header */}
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#002C6C]/60 text-[#4d88ff] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#0050d8]/40">
          Ford Stand Experience 2026
        </div>

        <h2 className="text-xl font-black tracking-tight text-white mb-1 uppercase font-sans">
          Ford Racing Photo Booth
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Inquadra il QR Code per aprire il Photo Booth sul tuo smartphone.
        </p>

        {/* QR Code Container */}
        <div className="flex justify-center p-4 bg-white rounded-2xl shadow-inner mb-6 mx-auto w-fit">
          <QRCodeSVG
            value={currentUrl}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Stand Features List */}
        <div className="space-y-2 text-left text-xs text-gray-300 mb-6 bg-black/40 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0050d8] shrink-0" />
            <span>Cornice ufficiale Ford Racing in alta definizione</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0050d8] shrink-0" />
            <span>Caschi esclusivi Miami e Verstappen</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0050d8] shrink-0" />
            <span>Condivisione immediata su Instagram Stories</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#002C6C] to-[#0050d8] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};
