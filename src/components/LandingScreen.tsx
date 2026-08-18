import React from 'react';
import { Scenario } from '../types';
import { SCENARIOS } from '../data/scenarios';
import { Camera, Sparkles, ShieldCheck, Compass, ArrowRight, QrCode } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
  onOpenStandModal: () => void;
  selectedScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  onOpenStandModal,
  selectedScenario,
  onSelectScenario
}) => {
  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-ford-dark via-black to-ford-dark overflow-y-auto overflow-x-hidden select-none">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-ford-blue/30 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-ford-blue/80 border border-white/20 shadow-lg">
            <span className="font-display font-black text-base tracking-wider text-white">FORD</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-ford-accent">
            ADVENTURE 4X4
          </span>
        </div>

        <button
          onClick={onOpenStandModal}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all active:scale-95 shadow-md"
          title="Mostra QR Stand"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 text-center max-w-md mx-auto w-full">
        {/* Stand Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ford-card border border-ford-metal text-[11px] font-bold text-gray-300 mb-4 shadow-inner">
          <Compass className="w-3.5 h-3.5 text-ford-accent" />
          <span>STAND EXPERIENCE 2026</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-display leading-none mb-3">
          Entra Nel Cuore <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ford-accent via-orange-400 to-amber-300">
            Dell'Avventura 4x4
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 mb-6 max-w-xs leading-relaxed">
          Scatta il tuo selfie con <strong>scontorno AI in tempo reale</strong>, entra negli scenari estremi con Ford Bronco e Raptor e condividi subito la tua Storia su Instagram.
        </p>

        {/* Scenario Carousel Selector */}
        <div className="w-full mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-ford-accent" />
              Scegli la tua avventura
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            {SCENARIOS.map((scen) => {
              const isSelected = scen.id === selectedScenario.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => onSelectScenario(scen)}
                  className={`relative h-28 rounded-2xl overflow-hidden border text-left transition-all p-2 flex flex-col justify-end ${
                    isSelected
                      ? 'border-ford-accent ring-2 ring-ford-accent scale-[1.02] shadow-xl shadow-ford-accent/25'
                      : 'border-white/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={scen.thumbnailUrl}
                    alt={scen.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative z-10">
                    <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-ford-accent text-white uppercase mb-0.5">
                      {scen.vehicle}
                    </span>
                    <div className="text-[11px] font-black text-white leading-tight truncate">
                      {scen.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ford-accent to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-ford-accent/35 active:scale-98 transition-all mb-4"
        >
          <Camera className="w-6 h-6" />
          <span>Avvia Photo Booth</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Security / Privacy Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Zero installazione • Elaborazione 100% sul tuo telefono</span>
        </div>
      </div>
    </div>
  );
};
