import { FilterPreset } from '../types';

export const FILTERS: FilterPreset[] = [
  {
    id: 'natural',
    name: 'Naturale',
    subtitle: 'Colori autentici',
    cssFilter: 'none',
    fabricFilterParams: { brightness: 0, contrast: 0, saturation: 0 }
  },
  {
    id: 'motorsport-vivid',
    name: 'Motorsport',
    subtitle: 'Contrasto e nitidezza',
    cssFilter: 'contrast(1.15) saturate(1.25) brightness(1.02)',
    fabricFilterParams: { brightness: 0.02, contrast: 0.15, saturation: 0.25 }
  },
  {
    id: 'studio-bw',
    name: 'Monochrome Studio',
    subtitle: 'B&W ad alto impatto',
    cssFilter: 'grayscale(1) contrast(1.3) brightness(0.98)',
    fabricFilterParams: { grayscale: true, contrast: 0.3 }
  },
  {
    id: 'warm-amber',
    name: 'Warm Luxury',
    subtitle: 'Tonalità calda dorata',
    cssFilter: 'contrast(1.08) saturate(1.15) sepia(0.15)',
    fabricFilterParams: { brightness: 0.01, contrast: 0.08, saturation: 0.15, sepia: true }
  },
  {
    id: 'titanium-cool',
    name: 'Titanium Cool',
    subtitle: 'Toni freddi metallici',
    cssFilter: 'contrast(1.12) saturate(1.05) hue-rotate(10deg)',
    fabricFilterParams: { contrast: 0.12, saturation: 0.05 }
  }
];
