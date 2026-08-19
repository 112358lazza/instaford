import React, { useState } from 'react';
import { sharingService, ShareResult } from '../services/sharing';
import { StandModal } from './StandModal';
import {
  Download,
  Copy,
  RotateCcw,
  QrCode,
  CheckCircle2,
  Share2
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
  const [isStandModalOpen, setIsStandModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Trigger Web Share API (native share sheet with Instagram)
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const result: ShareResult = await sharingService.sharePhoto(
        compositeDataUrl,
        'Ford Racing Photo Booth',
        'La mia foto ufficiale allo Stand Ford Racing! 🏎️💨 #FordRacing #FordPerformance #StandExperience'
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
      `Ford_Racing_Photo_${Date.now()}.jpg`
    );
    showToast('Foto salvata nella galleria!');
  };

  // Copy to Clipboard
  const handleCopy = async () => {
    const success = await sharingService.copyToClipboard(compositeDataUrl);
    if (success) {
      showToast('Immagine copiata negli appunti!');
    } else {
      showToast('Impossibile copiare negli appunti, usa Scarica Foto.');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#080b11] overflow-y-auto overflow-x-hidden select-none pb-6">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-[#002C6C] border border-[#0050d8]/50 shadow-md">
            <span className="font-sans font-black text-xs tracking-widest text-white uppercase">
              FORD
            </span>
          </div>
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#4d88ff] uppercase">
            RACING
          </span>
        </div>

        <button
          onClick={() => setIsStandModalOpen(true)}
          className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition-all active:scale-95 shadow-md"
          title="Info Stand & QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-4 max-w-md mx-auto w-full gap-4">
        {/* 9:16 High-Res Rendered Image Preview */}
        <div className="relative w-full max-w-[320px] aspect-story rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,44,108,0.35)] border border-[#0050d8]/40 bg-black group">
          <img
            src={compositeDataUrl}
            alt="Ford Racing Photo"
            className="w-full h-full object-cover"
          />

          {/* Instagram Story Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white shadow-lg">
            <InstagramIcon className="w-3 h-3 text-pink-400" />
            <span>Story 9:16</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3 max-w-[340px]">
          {/* Primary Button: Share to Instagram (Web Share API) */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(253,29,29,0.3)] active:scale-98 transition-all"
          >
            <InstagramIcon className="w-5 h-5" />
            <span>{isSharing ? 'Apertura Condivisione...' : 'Condividi su Instagram'}</span>
          </button>

          {/* Secondary Button: Download JPG */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#002C6C] via-[#0050d8] to-[#1a6eff] hover:brightness-110 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,80,216,0.35)] active:scale-98 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Salva Foto in Galleria</span>
          </button>

          {/* Tertiary Row: Copy + Retake */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-blue-400" />
              <span>Copia</span>
            </button>

            <button
              onClick={onRetake}
              className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-300" />
              <span>Nuovo Scatto</span>
            </button>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-2 text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase">
          FORD RACING • STAND EXPERIENCE 2026
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/90 text-white text-xs font-bold border border-[#0050d8] shadow-[0_0_20px_rgba(0,80,216,0.6)] backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Stand QR Modal */}
      <StandModal
        isOpen={isStandModalOpen}
        onClose={() => setIsStandModalOpen(false)}
      />
    </div>
  );
};
