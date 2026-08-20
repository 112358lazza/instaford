import React, { useState } from 'react';
import { sharingService, ShareResult } from '../services/sharing';
import {
  Download,
  Copy,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ExportViewProps {
  compositeDataUrl: string;
  onRetake: () => void;
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const ExportView: React.FC<ExportViewProps> = ({
  compositeDataUrl,
  onRetake
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Trigger Web Share API (native share sheet with Instagram)
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const result: ShareResult = await sharingService.sharePhoto(
        compositeDataUrl,
        'InstaFord Photo Booth',
        'Il mio selfie ufficiale con Ford Racing! 🏎️💨 #InstaFord #FordRacing #FordPerformance'
      );
      showToast(result.message);
    } catch {
      showToast('Condivisione completata o foto scaricata.');
    } finally {
      setIsSharing(false);
    }
  };

  // Direct Download
  const handleDownload = () => {
    sharingService.downloadPhoto(
      compositeDataUrl,
      `InstaFord_${Date.now()}.jpg`
    );
    showToast('Foto salvata nella galleria!');
  };

  // Copy to Clipboard
  const handleCopy = async () => {
    const success = await sharingService.copyToClipboard(compositeDataUrl);
    if (success) {
      showToast('Immagine copiata negli appunti!');
    } else {
      showToast('Impossibile copiare negli appunti, usa Salva Foto.');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-y-auto overflow-x-hidden select-none px-4 py-6">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full gap-5">
        {/* Clean 9:16 High-Res Rendered Image Preview Card (No top badges) */}
        <div className="relative w-full max-w-[320px] aspect-story rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 bg-black">
          <img
            src={compositeDataUrl}
            alt="InstaFord Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons Area matching media_1787259751202.png */}
        <div className="w-full flex flex-col gap-2.5 max-w-[320px]">
          {/* Primary Button: Share to Instagram (Gradient Button) */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full py-4 px-6 rounded-[18px] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-semibold text-sm tracking-[-0.01em] flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(253,29,29,0.3)] apple-button"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>{isSharing ? 'Apertura Condivisione...' : 'Condividi su Instagram'}</span>
          </button>

          {/* Secondary Button: Download to Gallery (Solid White Button) */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 rounded-[18px] bg-white text-black hover:bg-white/90 font-semibold text-xs tracking-[-0.01em] flex items-center justify-center gap-2 shadow-md apple-button"
          >
            <Download className="w-4 h-4" />
            <span>Salva Foto in Galleria</span>
          </button>

          {/* Tertiary Row: Copia + Rifai */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-[16px] apple-glass text-white/90 font-medium text-xs flex items-center justify-center gap-1.5 apple-button"
            >
              <Copy className="w-3.5 h-3.5 text-[#388bfd]" />
              <span>Copia</span>
            </button>

            <button
              onClick={onRetake}
              className="py-3 px-4 rounded-[16px] apple-glass text-white/90 font-medium text-xs flex items-center justify-center gap-1.5 apple-button"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white/60" />
              <span>Rifai</span>
            </button>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-1 text-center text-[10px] text-white/30 font-medium tracking-wide">
          INSTAFORD • OFFICIAL FORD SELFIE EXPERIENCE
        </div>
      </div>

      {/* Dynamic Island Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full apple-glass-heavy text-white text-xs font-medium border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-apple-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
