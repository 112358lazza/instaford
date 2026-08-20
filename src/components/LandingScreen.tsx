import React from 'react';
import { RefreshCw } from 'lucide-react';
import { CapturedPhoto } from '../types';

interface LandingScreenProps {
  onStart: () => void;
  onOpenStickers: () => void;
  onOpenGallery: () => void;
  lastPhoto?: CapturedPhoto | null;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  onOpenStickers,
  onOpenGallery,
  lastPhoto
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-gradient-to-b from-[#0032ff] via-[#0028db] to-[#001a9c] text-white overflow-hidden select-none px-6 py-8">
      {/* Top Status / Spacing */}
      <div className="w-full flex justify-between items-center pt-2">
        <span className="text-xs font-semibold tracking-wider text-white/80"></span>
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div>

      {/* Center Branding: InstaFord Logo + Slogan */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
        {/* InstaFord Official Logo */}
        <div className="w-64 max-w-[80vw] mb-3">
          <img
            src="/assets/branding/instaford.png"
            alt="InstaFord"
            className="w-full h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* Slogan: Take your official Ford selfie. */}
        <div className="w-48 max-w-[60vw]">
          <img
            src="/assets/branding/slogan_ford.png"
            alt="Take your official Ford selfie."
            className="w-full h-auto object-contain drop-shadow-md opacity-95"
          />
        </div>
      </div>

      {/* Bottom Controls Area matching Page 2 mockup */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-6">
        {/* Stickers Floating Pill Button */}
        <div className="flex justify-center">
          <button
            onClick={onOpenStickers}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full apple-glass apple-button text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          >
            <img
              src="/assets/branding/casco_simbolo.png"
              alt="Casco"
              className="w-5 h-5 object-contain"
            />
            <span className="font-bold text-xs uppercase tracking-wider">
              STICKERS
            </span>
          </button>
        </div>

        {/* Bottom Shutter & Gallery Bar */}
        <div className="w-full flex items-center justify-between px-6 max-w-xs">
          {/* Gallery Thumbnail Square */}
          <button
            onClick={onOpenGallery}
            className="flex flex-col items-center gap-1 group apple-button"
          >
            <div className="w-12 h-12 rounded-[14px] apple-glass flex items-center justify-center overflow-hidden border border-white/30 shadow-md">
              {lastPhoto ? (
                <img
                  src={lastPhoto.dataUrl}
                  alt="Ultima foto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white/70">
                  REC
                </div>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">
              GALLERY
            </span>
          </button>

          {/* Central Apple-style Shutter Button */}
          <button
            onClick={onStart}
            className="group relative flex items-center justify-center w-[76px] h-[76px] rounded-full apple-shutter-ring focus:outline-none"
            title="Scatta selfie"
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
            <div className="w-[62px] h-[62px] rounded-full bg-white group-active:scale-90 transition-transform duration-100 ease-out shadow-inner" />
          </button>

          {/* Flip Camera Icon Button */}
          <button
            onClick={onStart}
            className="p-3.5 rounded-full apple-glass apple-button text-white shadow-md"
            title="Avvia fotocamera"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
