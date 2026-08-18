import confetti from 'canvas-confetti';
import { soundService } from './soundEffects';

export interface ShareResult {
  success: boolean;
  method: 'web-share-files' | 'web-share-text' | 'download' | 'clipboard' | 'failed';
  message: string;
}

export class SharingService {
  /**
   * Converts a Data URL (base64) to a standard Blob
   */
  dataUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /**
   * Native Web Share API with image file support (opens iOS / Android system sheet with Instagram option)
   */
  async sharePhoto(
    dataUrl: string,
    title = 'Ford Adventure Photo Booth',
    text = 'La mia avventura 4x4 allo Stand Ford! #FordAdventure #FordBronco #FordRaptor #BuiltWild'
  ): Promise<ShareResult> {
    try {
      const blob = this.dataUrlToBlob(dataUrl);
      const isPng = dataUrl.startsWith('data:image/png');
      const filename = `Ford_Adventure_${Date.now()}.${isPng ? 'png' : 'jpg'}`;
      const file = new File([blob], filename, { type: blob.type });

      // Check if navigator.share with files is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text
        });

        this.fireConfetti();
        soundService.playSuccess();
        return {
          success: true,
          method: 'web-share-files',
          message: 'Condivisione completata con successo!'
        };
      }

      // Fallback: Web share without files if available
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: window.location.href
        });
        // Also download photo automatically
        this.downloadPhoto(dataUrl, filename);
        this.fireConfetti();
        soundService.playSuccess();
        return {
          success: true,
          method: 'web-share-text',
          message: 'Link condiviso e foto salvata nei download!'
        };
      }

      // Fallback: Direct download
      this.downloadPhoto(dataUrl, filename);
      this.fireConfetti();
      soundService.playSuccess();
      return {
        success: true,
        method: 'download',
        message: 'Foto scaricata sul dispositivo!'
      };
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        // User cancelled share dialog
        return {
          success: false,
          method: 'failed',
          message: 'Condivisione annullata.'
        };
      }
      console.warn('Share error, falling back to download:', err);
      this.downloadPhoto(dataUrl, `Ford_Adventure_${Date.now()}.jpg`);
      return {
        success: true,
        method: 'download',
        message: 'Foto salvata nei download del dispositivo.'
      };
    }
  }

  /**
   * Direct download fallback
   */
  downloadPhoto(dataUrl: string, filename = 'Ford_Adventure_Photo.jpg'): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Copy high-res image to clipboard
   */
  async copyToClipboard(dataUrl: string): Promise<boolean> {
    try {
      const blob = this.dataUrlToBlob(dataUrl);
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
        this.fireConfetti();
        soundService.playSuccess();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Clipboard copy error:', err);
      return false;
    }
  }

  /**
   * Confetti celebration burst
   */
  fireConfetti(): void {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#002C6C', '#FF4A00', '#00d2d3', '#ffffff', '#ffd32a']
      });
    } catch {
      // Ignore
    }
  }
}

export const sharingService = new SharingService();
