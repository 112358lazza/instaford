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
    <div className="relative w-full h-full flex flex-col justify-between bg-black text-white overflow-y-auto select-none px-6 py-8">
      {/* Apple-style subtle ambient background glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-gradient-to-b from-[#0062FF]/25 via-[#002C6C]/15 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between">
        {/* Ford Racing Apple-grade pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full apple-glass">
          <div className="w-2 h-2 rounded-full bg-[#0062FF] shadow-[0_0_8px_#0062FF]" />
          <span className="font-semibold text-xs tracking-[-0.01em] text-white">
            Ford Racing
          </span>
          <span className="text-[10px] font-medium text-white/50 px-1 border-l border-white/10">
            Stand 2026
          </span>
        </div>

        {/* QR Code Stand Button */}
        <button
          onClick={onOpenStandModal}
          className="p-2.5 rounded-full apple-glass apple-button text-white/90 hover:text-white"
          title="Mostra QR Code Stand"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Showcase Center */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] font-medium text-white/70 tracking-[-0.01em] mb-4">
          <Sparkles className="w-3 h-3 text-[#388bfd]" />
          <span>Official Stand Photo Booth</span>
        </div>

        {/* Apple-style Display Typography */}
        <h1 className="text-[2.2rem] sm:text-4xl font-bold tracking-[-0.035em] text-white mb-2.5 leading-[1.08]">
          In Griglia di Partenza <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#8ec0ff] to-[#0062FF]">
            Con Ford Racing
          </span>
        </h1>

        <p className="text-[13px] text-white/60 max-w-[280px] mb-7 leading-relaxed font-normal tracking-[-0.01em]">
          Scatta la tua foto in alta definizione, inseriscila nella cornice ufficiale e indossa i caschi della scuderia.
        </p>

        {/* Interactive Preview Card */}
        <div className="relative w-44 aspect-story rounded-[22px] overflow-hidden apple-glass-card border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-7 flex items-center justify-center group">
          {/* Frame Graphic */}
          <img
            src={OFFICIAL_FRAME.imageSrc}
            alt="Ford Racing Frame"
            className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
          />

          {/* Helmet Preview inside Frame */}
          <div className="relative z-10 flex items-center justify-center p-3">
            <img
              src={STICKERS[0].imageSrc}
              alt="Casco Ford Racing"
              className="w-24 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* 2 Helmets Selector Pills */}
        <div className="flex items-center gap-2.5">
          {STICKERS.map((sticker) => (
            <div
              key={sticker.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/80"
            >
              <img src={sticker.imageSrc} alt={sticker.name} className="w-4 h-4 object-contain" />
              <span className="font-medium tracking-[-0.01em]">{sticker.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <footer className="relative z-10 flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="w-full py-4 px-8 rounded-[18px] bg-white text-black hover:bg-white/90 font-semibold text-sm tracking-[-0.01em] flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(255,255,255,0.15)] apple-button"
        >
          <Camera className="w-4 h-4" />
          <span>Avvia Photo Booth</span>
          <ArrowRight className="w-4 h-4 text-black/60" />
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-normal">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Esperienza istantanea • Formato 9:16 per Instagram Stories</span>
        </div>
      </footer>
    </div>
  );
};
