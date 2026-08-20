import React from 'react';
import { CapturedPhoto } from '../types';
import { X, Trash2, Download, Share2, Eye } from 'lucide-react';
import { sharingService } from '../services/sharing';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: CapturedPhoto[];
  onSelectPhoto: (photo: CapturedPhoto) => void;
  onDeletePhoto: (timestamp: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSelectPhoto,
  onDeletePhoto
}) => {
  if (!isOpen) return null;

  const handleShare = async (dataUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await sharingService.sharePhoto(
      dataUrl,
      'Ford Racing Photo Booth',
      'La mia foto ufficiale allo Stand Ford Racing! 🏎️💨 #FordRacing #InstaFord'
    );
  };

  const handleDownload = (dataUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sharingService.downloadPhoto(dataUrl, `InstaFord_${Date.now()}.jpg`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-apple-fade-in">
      <div className="relative w-full max-w-sm max-h-[85vh] flex flex-col rounded-[26px] apple-glass-heavy border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white tracking-[-0.01em]">
              Galleria Sessione
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60 font-medium">
              {photos.length} {photos.length === 1 ? 'foto' : 'foto'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white apple-glass apple-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photos Grid */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-white/50">
              <p className="text-xs">Nessuna foto scattata in questa sessione.</p>
              <p className="text-[10px] text-white/30 mt-1">
                Le foto scattate appariranno qui e si resetteranno all'uscita dall'app.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.timestamp}
                  onClick={() => {
                    onSelectPhoto(photo);
                    onClose();
                  }}
                  className="relative aspect-story rounded-[18px] overflow-hidden border border-white/15 bg-black group cursor-pointer apple-button shadow-md"
                >
                  <img
                    src={photo.dataUrl}
                    alt="Foto scattata"
                    className="w-full h-full object-cover"
                  />

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePhoto(photo.timestamp);
                        }}
                        className="p-1 rounded-full bg-black/60 hover:bg-red-500/80 text-white"
                        title="Elimina"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => handleShare(photo.dataUrl, e)}
                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white"
                        title="Condividi"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleDownload(photo.dataUrl, e)}
                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white"
                        title="Scarica"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
