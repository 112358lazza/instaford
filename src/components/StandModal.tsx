import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, ExternalLink, ShieldCheck, Compass } from 'lucide-react';

interface StandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandModal: React.FC<StandModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ford-adventure.app';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-ford-card border border-ford-metal p-6 text-center shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-white bg-black/40 backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ford Stand Header */}
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-ford-blue/60 text-ford-accent text-xs font-bold uppercase tracking-wider mb-4 border border-ford-blue">
          <Compass className="w-3.5 h-3.5" />
          Ford Stand Experience 2026
        </div>

        <h2 className="text-2xl font-black tracking-tight text-white mb-1 uppercase font-display">
          Benvenuto all'Avventura 4x4
        </h2>
        <p className="text-xs text-gray-300 mb-6">
          Condividi il QR Code con amici allo stand per far provare loro l'esperienza di Photo Booth interattivo.
        </p>

        {/* QR Code Container */}
        <div className="flex justify-center p-4 bg-white rounded-2xl shadow-inner mb-6 mx-auto w-fit">
          <QRCodeSVG
            value={currentUrl}
            size={180}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: '/favicon.svg',
              x: undefined,
              y: undefined,
              height: 36,
              width: 36,
              excavate: true
            }}
          />
        </div>

        {/* Stand Features List */}
        <div className="space-y-2 text-left text-xs text-gray-300 mb-6 bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Scontorno AI 100% sul tuo telefono (Privacy totale)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Scenari epici con Ford Bronco & Raptor</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Condivisione istantanea su Instagram Stories</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-ford-blue to-ford-lightBlue hover:from-ford-lightBlue hover:to-ford-accent text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-ford-blue/30 active:scale-95"
        >
          Torna al Photo Booth
        </button>
      </div>
    </div>
  );
};
