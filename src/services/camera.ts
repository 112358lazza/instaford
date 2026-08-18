import { CameraFacingMode } from '../types';

export class CameraService {
  private stream: MediaStream | null = null;
  private currentFacingMode: CameraFacingMode = 'user';
  private hasTorch = false;
  private torchOn = false;

  async startCamera(
    videoElement: HTMLVideoElement,
    facingMode: CameraFacingMode = 'user'
  ): Promise<MediaStream> {
    this.stopCamera();
    this.currentFacingMode = facingMode;

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30, max: 60 }
      }
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = this.stream;
      
      // Ensure video plays smoothly on iOS Safari
      videoElement.setAttribute('playsinline', 'true');
      videoElement.setAttribute('autoplay', 'true');
      videoElement.muted = true;
      
      await videoElement.play();

      // Check for torch capability on mobile environment camera
      const track = this.stream.getVideoTracks()[0];
      if (track) {
        const capabilities = track.getCapabilities ? (track.getCapabilities() as { torch?: boolean }) : {};
        this.hasTorch = !!capabilities.torch;
      }

      return this.stream;
    } catch (err) {
      console.warn('getUserMedia error:', err);
      throw err;
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.torchOn = false;
  }

  async toggleFacingMode(videoElement: HTMLVideoElement): Promise<CameraFacingMode> {
    const nextMode: CameraFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
    await this.startCamera(videoElement, nextMode);
    return nextMode;
  }

  async toggleTorch(): Promise<boolean> {
    if (!this.stream || !this.hasTorch) return false;
    const track = this.stream.getVideoTracks()[0];
    if (!track) return false;

    try {
      this.torchOn = !this.torchOn;
      // @ts-expect-error Torch is a mobile-specific constraint
      await track.applyConstraints({ advanced: [{ torch: this.torchOn }] });
      return this.torchOn;
    } catch (e) {
      console.warn('Torch not supported:', e);
      this.torchOn = false;
      return false;
    }
  }

  getFacingMode(): CameraFacingMode {
    return this.currentFacingMode;
  }

  getTorchState(): boolean {
    return this.torchOn;
  }

  captureFrame(videoElement: HTMLVideoElement, mirror = false): { dataUrl: string; width: number; height: number } {
    const canvas = document.createElement('canvas');
    const width = videoElement.videoWidth || 1080;
    const height = videoElement.videoHeight || 1920;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (mirror) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(videoElement, 0, 0, width, height);
    }

    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.95),
      width,
      height
    };
  }
}

export const cameraService = new CameraService();
