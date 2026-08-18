export type AppStep = 'landing' | 'camera' | 'editor' | 'export';

export type CameraFacingMode = 'user' | 'environment';

export interface Scenario {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  vehicle: 'Ford Bronco' | 'Ford Raptor' | 'Ford Ranger' | 'Ford 4x4';
  location: string;
  bgUrl: string; // High res artwork or SVG Data URI
  thumbnailUrl: string;
  lightingTone: 'dawn' | 'sunset' | 'storm' | 'daylight';
  themeColor: string;
  suggestedStickers: string[];
}

export type StickerCategory = 'ford' | 'adventure' | 'wildlife' | 'mud' | 'badges' | 'emoji';

export interface StickerItem {
  id: string;
  name: string;
  category: StickerCategory;
  svgDataUri: string;
  defaultScale?: number;
  width: number;
  height: number;
}

export interface FrameItem {
  id: string;
  name: string;
  description: string;
  overlaySvg: string; // 9:16 SVG overlay
  styleName: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  cssFilter: string;
  toneDescription: string;
  fabricFilterParams?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    tint?: string;
  };
}

export interface CapturedPhoto {
  rawImage: string; // Data URL of raw photo
  segmentedPersonImage: string; // Data URL of segmented person with alpha mask
  originalWidth: number;
  originalHeight: number;
  scenarioId: string;
  facingMode: CameraFacingMode;
  timestamp: number;
}

export interface EditorSettings {
  selectedScenarioId: string;
  selectedFrameId: string | null;
  selectedFilterId: string;
  showOriginalBg: boolean; // toggle between AI background replacement and real background
  brightness: number;
  contrast: number;
  saturation: number;
}
