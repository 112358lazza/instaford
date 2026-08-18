import React, { useState } from 'react';
import { sharingService, ShareResult } from '../services/sharing';
import { StandModal } from './StandModal';
import {
  Share2,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  QrCode,
  CheckCircle2,
  Heart,
  Compass
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
        'Ford Adventure Photo Booth 2026',
        'La mia esperienza 4x4 allo Stand Ford! 🚙🌲 #FordAdventure #FordBronco #FordRaptor #BuiltWild'
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
      `Ford_Adventure_Stand_${Date.now()}.jpg`
    );
    showToast('Foto salvata nella galleria del dispositivo!');
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
    <div className="relative w-full h-full flex flex-col bg-ford-dark overflow-y-auto overflow-x-hidden select-none pb-6">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-ford-blue text-white shadow-md">
            <Compass className="w-4 h-4 text-ford-accent" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider text-white font-display">
              La Tua Foto 4x4
            </h1>
            <span className="text-[10px] text-emerald-400 font-bold tracking-wide">
              Pronta in Alta Risoluzione 9:16
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsStandModalOpen(true)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
          title="Info Stand & QR Code"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-4 max-w-md mx-auto w-full gap-4">
        {/* 9:16 High-Res Rendered Image Preview */}
        <div className="relative w-full max-w-[340px] aspect-story rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black group">
          <img
            src={compositeDataUrl}
            alt="Ford Adventure Photo"
            className="w-full h-full object-cover"
          />

          {/* Instagram Story Gradient Watermark Tag */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-lg">
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>Story 9:16</span>
          </div>
        </div>

        {/* Pro Tip Box for Instagram Stories */}
        <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-orange-950/40 border border-pink-500/20 backdrop-blur-sm flex items-start gap-2.5 shadow-lg">
          <InstagramIcon className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
          <div className="text-left text-xs">
            <span className="font-bold text-pink-300">Suggerimento Instagram:</span>
            <p className="text-gray-300 text-[11px] mt-0.5">
              Tocca <strong>Condividi</strong> e seleziona <strong>Storie di Instagram</strong> per pubblicare il tuo scatto 4x4 e taggare lo stand con gli sticker!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          {/* Primary Button: Share to Instagram (Web Share API) */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/20 active:scale-98 transition-all"
          >
            <InstagramIcon className="w-5 h-5" />
            <span>{isSharing ? 'Apertura Condivisione...' : 'Condividi su Instagram'}</span>
          </button>

          {/* Secondary Button: Download JPG */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-ford-blue to-ford-lightBlue hover:from-ford-lightBlue hover:to-ford-accent text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-ford-blue/30 active:scale-98 transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Salva Foto in Galleria</span>
          </button>

          {/* Tertiary Row: Copy + Retake */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copia Immagine</span>
            </button>

            <button
              onClick={onRetake}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-ford-accent" />
              <span>Nuovo Scatto</span>
            </button>
          </div>
        </div>

        {/* Footer Brand Info */}
        <div className="mt-2 text-center text-[10px] text-gray-500 font-mono">
          FORD ADVENTURE 4X4 • STAND EXPERIENCE 2026
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/90 text-white text-xs font-bold border border-ford-accent shadow-2xl backdrop-blur-md animate-bounce">
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
