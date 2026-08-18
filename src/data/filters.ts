import { FilterPreset } from '../types';

export const FILTERS: FilterPreset[] = [
  {
    id: 'normal',
    name: 'Normale',
    toneDescription: 'Colori naturali senza alterazioni',
    cssFilter: 'none',
    fabricFilterParams: { brightness: 0, contrast: 0, saturation: 0 }
  },
  {
    id: 'adventure-warm',
    name: 'Adventure Gold',
    toneDescription: 'Tonalità calde, dorate ed avventurose',
    cssFilter: 'contrast(1.1) saturate(1.25) sepia(0.2) brightness(1.03)',
    fabricFilterParams: { brightness: 0.03, contrast: 0.1, saturation: 0.25 }
  },
  {
    id: 'moab-sunset',
    name: 'Moab Red',
    toneDescription: 'Contrasto intenso e calore del deserto roccioso',
    cssFilter: 'contrast(1.2) saturate(1.35) hue-rotate(-10deg)',
    fabricFilterParams: { brightness: 0, contrast: 0.2, saturation: 0.35 }
  },
  {
    id: 'alpine-cool',
    name: 'Alpine Mist',
    toneDescription: 'Aria fresca d\'alta quota e cieli cristallini',
    cssFilter: 'contrast(1.15) saturate(1.1) hue-rotate(15deg) brightness(1.02)',
    fabricFilterParams: { brightness: 0.02, contrast: 0.15, saturation: 0.1 }
  },
  {
    id: 'storm-dramatic',
    name: 'Storm Moody',
    toneDescription: 'Cielo drammatico desaturato con neri profondi',
    cssFilter: 'contrast(1.35) saturate(0.7) brightness(0.95)',
    fabricFilterParams: { brightness: -0.05, contrast: 0.35, saturation: -0.3 }
  },
  {
    id: 'cyber-raptor',
    name: 'Raptor Vivid',
    toneDescription: 'Saturazione aggressiva e dettagli ultra-nitidi',
    cssFilter: 'contrast(1.25) saturate(1.5) brightness(1.05)',
    fabricFilterParams: { brightness: 0.05, contrast: 0.25, saturation: 0.5 }
  },
  {
    id: 'noir-expedition',
    name: 'Noir 4x4',
    toneDescription: 'Bianco e nero ad alto contrasto per reportage',
    cssFilter: 'grayscale(1) contrast(1.4) brightness(0.98)',
    fabricFilterParams: { brightness: -0.02, contrast: 0.4, saturation: -1 }
  }
];
