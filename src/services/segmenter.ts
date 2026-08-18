import { FilesetResolver, ImageSegmenter } from '@mediapipe/tasks-vision';

export class SegmentationService {
  private segmenter: ImageSegmenter | null = null;
  private isInitializing = false;
  private isReady = false;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D | null;
  private maskCanvas: HTMLCanvasElement;
  private maskCtx: CanvasRenderingContext2D | null;
  private lastSegmentationTime = 0;

  constructor() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d');
  }

  async initialize(): Promise<boolean> {
    if (this.isReady) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
      );

      this.segmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        outputCategoryMask: false,
        outputConfidenceMasks: true
      });

      this.isReady = true;
      this.isInitializing = false;
      return true;
    } catch (err) {
      console.warn('MediaPipe GPU/WASM Segmenter initialization warning, fallback to CPU/direct mode:', err);
      try {
        // Fallback to CPU delegate if GPU is not available
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
        );
        this.segmenter = await ImageSegmenter.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          outputCategoryMask: false,
          outputConfidenceMasks: true
        });
        this.isReady = true;
        this.isInitializing = false;
        return true;
      } catch (cpuErr) {
        console.warn('Segmenter fallback failed:', cpuErr);
        this.isInitializing = false;
        return false;
      }
    }
  }

  getReadyState(): boolean {
    return this.isReady;
  }

  /**
   * Renders the live video feed with AI background replacement onto the target canvas (9:16)
   */
  renderLiveComposite(
    video: HTMLVideoElement,
    bgImage: HTMLImageElement | null,
    targetCanvas: HTMLCanvasElement,
    mirror = false
  ): void {
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    const targetWidth = targetCanvas.width;
    const targetHeight = targetCanvas.height;
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    // Draw Background First (Layer 1)
    if (bgImage && bgImage.complete) {
      ctx.drawImage(bgImage, 0, 0, targetWidth, targetHeight);
    } else {
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    // If AI Segmenter is ready, apply real-time segmentation
    if (this.isReady && this.segmenter) {
      try {
        const now = performance.now();
        if (now <= this.lastSegmentationTime) return;
        this.lastSegmentationTime = now;

        const result = this.segmenter.segmentForVideo(video, now);
        if (result && result.confidenceMasks && result.confidenceMasks.length > 0) {
          const mask = result.confidenceMasks[0];
          const maskWidth = mask.width;
          const maskHeight = mask.height;

          // Prepare mask canvas
          this.maskCanvas.width = maskWidth;
          this.maskCanvas.height = maskHeight;
          if (this.maskCtx) {
            const maskData = mask.getAsFloat32Array();
            const imgData = this.maskCtx.createImageData(maskWidth, maskHeight);
            const data = imgData.data;

            for (let i = 0; i < maskData.length; i++) {
              const confidence = maskData[i];
              const idx = i * 4;
              // Smooth step edge
              const alpha = confidence > 0.4 ? Math.min(255, Math.floor(((confidence - 0.4) / 0.6) * 255)) : 0;
              data[idx] = 255;
              data[idx + 1] = 255;
              data[idx + 2] = 255;
              data[idx + 3] = alpha;
            }
            this.maskCtx.putImageData(imgData, 0, 0);

            // Offscreen person canvas with alpha mask
            this.offscreenCanvas.width = targetWidth;
            this.offscreenCanvas.height = targetHeight;
            if (this.offscreenCtx) {
              this.offscreenCtx.clearRect(0, 0, targetWidth, targetHeight);
              this.offscreenCtx.save();

              // Calculate aspect ratio crop to 9:16
              const videoRatio = video.videoWidth / video.videoHeight;
              const targetRatio = targetWidth / targetHeight;
              let sWidth = video.videoWidth;
              let sHeight = video.videoHeight;
              let sx = 0;
              let sy = 0;

              if (videoRatio > targetRatio) {
                sWidth = video.videoHeight * targetRatio;
                sx = (video.videoWidth - sWidth) / 2;
              } else {
                sHeight = video.videoWidth / targetRatio;
                sy = (video.videoHeight - sHeight) / 2;
              }

              if (mirror) {
                this.offscreenCtx.translate(targetWidth, 0);
                this.offscreenCtx.scale(-1, 1);
              }

              // Draw video frame
              this.offscreenCtx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

              // Apply mask using destination-in
              this.offscreenCtx.globalCompositeOperation = 'destination-in';
              this.offscreenCtx.drawImage(this.maskCanvas, 0, 0, targetWidth, targetHeight);
              this.offscreenCtx.restore();

              // Draw segmented person onto target canvas (Layer 2)
              ctx.drawImage(this.offscreenCanvas, 0, 0);
            }
          }
          mask.close();
          return;
        }
      } catch (segErr) {
        console.warn('Realtime segmentation error:', segErr);
      }
    }

    // Direct video fallback if segmenter is still loading or unavailable
    ctx.save();
    if (mirror) {
      ctx.translate(targetWidth, 0);
      ctx.scale(-1, 1);
    }
    const videoRatio = video.videoWidth / video.videoHeight;
    const targetRatio = targetWidth / targetHeight;
    let sWidth = video.videoWidth;
    let sHeight = video.videoHeight;
    let sx = 0;
    let sy = 0;
    if (videoRatio > targetRatio) {
      sWidth = video.videoHeight * targetRatio;
      sx = (video.videoWidth - sWidth) / 2;
    } else {
      sHeight = video.videoWidth / targetRatio;
      sy = (video.videoHeight - sHeight) / 2;
    }
    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
    ctx.restore();
  }

  /**
   * Generates a high-resolution transparent PNG cutout of the segmented person from a captured video frame
   */
  async extractSegmentedPerson(
    videoOrImage: HTMLVideoElement | HTMLImageElement,
    width: number,
    height: number,
    mirror = false
  ): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    if (this.isReady && this.segmenter) {
      try {
        const now = performance.now();
        const result = this.segmenter.segmentForVideo(videoOrImage as HTMLVideoElement, now);
        if (result && result.confidenceMasks && result.confidenceMasks.length > 0) {
          const mask = result.confidenceMasks[0];
          const maskCanvas = document.createElement('canvas');
          maskCanvas.width = mask.width;
          maskCanvas.height = mask.height;
          const mCtx = maskCanvas.getContext('2d');

          if (mCtx) {
            const maskData = mask.getAsFloat32Array();
            const imgData = mCtx.createImageData(mask.width, mask.height);
            const data = imgData.data;

            for (let i = 0; i < maskData.length; i++) {
              const confidence = maskData[i];
              const idx = i * 4;
              const alpha = confidence > 0.45 ? Math.min(255, Math.floor(((confidence - 0.45) / 0.55) * 255)) : 0;
              data[idx] = 255;
              data[idx + 1] = 255;
              data[idx + 2] = 255;
              data[idx + 3] = alpha;
            }
            mCtx.putImageData(imgData, 0, 0);

            ctx.save();
            if (mirror) {
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
            }
            ctx.drawImage(videoOrImage, 0, 0, width, height);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(maskCanvas, 0, 0, width, height);
            ctx.restore();

            mask.close();
            return canvas.toDataURL('image/png');
          }
          mask.close();
        }
      } catch (err) {
        console.warn('Error extracting high-res mask:', err);
      }
    }

    // Fallback: full image
    ctx.save();
    if (mirror) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(videoOrImage, 0, 0, width, height);
    ctx.restore();
    return canvas.toDataURL('image/png');
  }
}

export const segmentationService = new SegmentationService();
