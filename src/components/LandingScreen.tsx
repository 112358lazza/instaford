import React from 'react';
import { Camera, QrCode, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { STICKERS } from '../data/stickers';
import { OFFICIAL_FRAME } from '../data/frames';

interface LandingScreenProps {
  onStart: () => void;
  onOpenStandModal: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  onOpenStandModal
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#080b11] text-white overflow-y-auto select-none px-6 py-8">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-[#002C6C]/40 via-[#0050d8]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between">
        {/* Ford Racing Badge */}
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1 rounded-md bg-[#002C6C] border border-[#0050d8]/50 shadow-[0_0_15px_rgba(0,80,216,0.4)]">
            <span className="font-sans font-black tracking-widest text-sm text-white uppercase">
              FORD
            </span>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-[#4d88ff] uppercase">
            RACING
          </span>
        </div>

        {/* QR Code Stand Button */}
        <button
          onClick={onOpenStandModal}
          className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-gray-200 transition-all active:scale-95 shadow-md"
          title="Mostra QR Code Stand"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </header>

      {/* Hero Showcase Center */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-6">
        {/* Event Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-gray-300 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0050d8] animate-pulse" />
          STAND EXPERIENCE • PHOTO BOOTH
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 uppercase leading-tight font-sans">
          Mettiti In Griglia <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#80b3ff] to-[#0050d8]">
            Con Ford Racing
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 max-w-xs mb-8 leading-relaxed">
          Scatta la tua foto ufficiale, incorniciala nella livrea <strong>Ford Racing</strong> e indossa i caschi esclusivi della scuderia.
        </p>

        {/* Preview Frame & Helmets Visual */}
        <div className="relative w-48 aspect-story rounded-2xl overflow-hidden border border-[#0050d8]/40 shadow-[0_10px_35px_rgba(0,44,108,0.45)] mb-8 bg-[#0b101d] flex items-center justify-center">
          {/* Frame Graphic */}
          <img
            src={OFFICIAL_FRAME.imageSrc}
            alt="Ford Racing Frame"
            className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
          />

          {/* Helmet Preview inside Frame */}
          <div className="relative z-10 flex items-center justify-center p-4">
            <img
              src={STICKERS[0].imageSrc}
              alt="Casco Ford Racing"
              className="w-28 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] animate-pulse-subtle"
            />
          </div>
        </div>

        {/* 2 Helmets Selector Preview */}
        <div className="flex items-center gap-3 mb-2">
          {STICKERS.map((sticker) => (
            <div
              key={sticker.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[10px] text-gray-300"
            >
              <img src={sticker.imageSrc} alt={sticker.name} className="w-5 h-5 object-contain" />
              <span className="font-semibold">{sticker.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <footer className="relative z-10 flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#002C6C] via-[#0050d8] to-[#1a6eff] hover:brightness-110 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(0,80,216,0.4)] active:scale-98 transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>Avvia Photo Booth</span>
          <ArrowRight className="w-4 h-4 text-blue-200" />
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Esperienza istantanea • Salvataggio e condivisione 9:16</span>
        </div>
      </footer>
    </div>
  );
};
