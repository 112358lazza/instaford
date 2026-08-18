import React, { useRef } from 'react';
import { SCENARIOS } from '../data/scenarios';
import { Scenario } from '../types';
import { Mountain, Compass, Sparkles, Flame, ShieldAlert } from 'lucide-react';

interface ScenarioCarouselProps {
  selectedScenarioId: string;
  onSelectScenario: (scenario: Scenario) => void;
}

export const ScenarioCarousel: React.FC<ScenarioCarouselProps> = ({
  selectedScenarioId,
  onSelectScenario
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case 'dawn':
        return <Compass className="w-3 h-3 text-amber-400" />;
      case 'sunset':
        return <Flame className="w-3 h-3 text-orange-400" />;
      case 'storm':
        return <ShieldAlert className="w-3 h-3 text-cyan-400" />;
      default:
        return <Mountain className="w-3 h-3 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full overflow-hidden py-2">
      <div className="flex items-center justify-between px-4 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-ford-accent" />
          Scegli Ambientazione 4x4
        </span>
        <span className="text-[10px] text-gray-400 font-mono">
          {SCENARIOS.findIndex(s => s.id === selectedScenarioId) + 1}/{SCENARIOS.length}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-3 px-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`relative flex-shrink-0 w-36 h-20 rounded-2xl overflow-hidden snap-center transition-all duration-200 text-left border ${
                isSelected
                  ? 'ring-2 ring-ford-accent ring-offset-2 ring-offset-black scale-105 border-transparent shadow-xl shadow-ford-accent/25'
                  : 'opacity-70 hover:opacity-100 border-white/15 scale-95'
              }`}
            >
              {/* Background Thumbnail */}
              <img
                src={scenario.thumbnailUrl}
                alt={scenario.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Vehicle Badge */}
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-bold text-white border border-white/10">
                {getToneIcon(scenario.lightingTone)}
                <span className="truncate">{scenario.vehicle}</span>
              </div>

              {/* Title & Location */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5">
                <div className="text-[11px] font-black text-white truncate leading-tight">
                  {scenario.name}
                </div>
                <div className="text-[9px] text-gray-300 truncate">
                  {scenario.location}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
