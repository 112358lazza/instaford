export type AppStep = 'landing' | 'camera' | 'editor' | 'export';

export type CameraFacingMode = 'user' | 'environment';

export interface StickerItem {
  id: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  defaultScale?: number;
  width: number;
  height: number;
}

export interface FrameItem {
  id: string;
  name: string;
  subtitle: string;
  imageSrc: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  subtitle: string;
  cssFilter: string;
  fabricFilterParams?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    grayscale?: boolean;
    sepia?: boolean;
  };
}

export interface CapturedPhoto {
  dataUrl: string;
  width: number;
  height: number;
  facingMode: CameraFacingMode;
  timestamp: number;
}
