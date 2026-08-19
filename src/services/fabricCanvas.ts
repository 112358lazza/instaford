import * as fabric from 'fabric';
import { FilterPreset } from '../types';
import { OFFICIAL_FRAME } from '../data/frames';

export class FabricCanvasManager {
  private canvas: fabric.Canvas | null = null;
  private photoObject: fabric.FabricImage | null = null;
  private frameObject: fabric.FabricImage | null = null;
  private history: string[] = [];
  private historyIndex = -1;
  private isStateLocked = false;
  private containerElement: HTMLElement | null = null;

  // Touch gesture tracking for 2-finger Instagram pinch & rotate
  private initialTouchDistance = 0;
  private initialTouchAngle = 0;
  private initialObjectScale = 1;
  private initialObjectAngle = 0;
  private isPinching = false;

  async init(
    canvasElement: HTMLCanvasElement,
    containerElement: HTMLElement,
    width = 1080,
    height = 1920
  ): Promise<void> {
    if (this.canvas) {
      this.canvas.dispose();
      this.canvas = null;
    }

    this.containerElement = containerElement;

    // Initialize Fabric Canvas with 1080x1920 logical resolution
    this.canvas = new fabric.Canvas(canvasElement, {
      width,
      height,
      backgroundColor: '#000000',
      preserveObjectStacking: true,
      selection: true,
      allowTouchScrolling: false,
      stopContextMenu: true,
      fireRightClick: false
    });

    // Global defaults: NO ugly square handles, clean minimal border
    fabric.FabricObject.ownDefaults = {
      ...fabric.FabricObject.ownDefaults,
      hasControls: false, // NO SQUARE CONTROL BOXES!
      hasBorders: true,
      borderColor: '#0062FF',
      borderDashArray: [6, 6],
      borderScaleFactor: 2.5,
      padding: 6,
      transparentCorners: true
    };

    // Update coordinate offsets on touch
    this.updateCanvasDimensions();

    this.canvas.on('object:modified', () => {
      this.saveState();
    });

    this.canvas.on('object:added', (e) => {
      if (!this.isStateLocked && e.target !== this.photoObject && e.target !== this.frameObject) {
        this.saveState();
      }
    });

    this.canvas.on('object:removed', () => {
      if (!this.isStateLocked) {
        this.saveState();
      }
    });

    // Attach Instagram-style Multi-Touch Pinch & Rotate Listeners
    this.setupInstagramTouchGestures();
  }

  /**
   * Recalculates canvas bounding rect and touch offsets so touches map 1:1 anywhere across the screen
   */
  updateCanvasDimensions(): void {
    if (!this.canvas || !this.containerElement) return;

    const rect = this.containerElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      this.canvas.setDimensions(
        {
          width: '100%',
          height: '100%'
        },
        { cssOnly: true }
      );
      this.canvas.calcOffset();
    }
  }

  getCanvas(): fabric.Canvas | null {
    return this.canvas;
  }

  /**
   * Sets Layer 1: Full-Frame Real Captured Photo (fills 1080x1920 9:16 frame)
   */
  async setPhoto(photoDataUrl: string): Promise<void> {
    if (!this.canvas) return;

    if (this.photoObject) {
      this.canvas.remove(this.photoObject);
      this.photoObject = null;
    }

    try {
      const img = await fabric.FabricImage.fromURL(photoDataUrl, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      const imgW = img.width || canvasWidth;
      const imgH = img.height || canvasHeight;

      // Cover scaling for 9:16
      const scale = Math.max(canvasWidth / imgW, canvasHeight / imgH);

      img.set({
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true
      });

      this.photoObject = img;
      this.canvas.insertAt(0, img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error loading photo in Fabric:', err);
    }
  }

  /**
   * Sets Layer 3: Official Ford Racing Frame Overlay (Locked on top)
   */
  async loadOfficialFrame(): Promise<void> {
    if (!this.canvas) return;

    if (this.frameObject) {
      this.canvas.remove(this.frameObject);
      this.frameObject = null;
    }

    try {
      const img = await fabric.FabricImage.fromURL(OFFICIAL_FRAME.imageSrc, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      img.set({
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        scaleX: canvasWidth / (img.width || canvasWidth),
        scaleY: canvasHeight / (img.height || canvasHeight),
        selectable: false,
        evented: false, // DOES NOT BLOCK TOUCH EVENTS!
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true
      });

      this.frameObject = img;
      this.canvas.add(img);
      this.canvas.bringObjectToFront(img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error loading frame in Fabric:', err);
    }
  }

  /**
   * Adds an interactive helmet sticker with Instagram Stories gesture controls (NO SQUARE BOXES!)
   */
  async addHelmetSticker(imageSrc: string, initialScale = 0.4): Promise<void> {
    if (!this.canvas) return;

    try {
      const img = await fabric.FabricImage.fromURL(imageSrc, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      // Position in upper-center area with unrestricted freedom of movement
      img.set({
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight * 0.38,
        scaleX: initialScale,
        scaleY: initialScale,
        selectable: true,
        evented: true,
        hasControls: false, // NO SQUARE HANDLES!
        hasBorders: true, // Subtle minimal outline
        borderColor: '#0062FF',
        borderDashArray: [6, 6],
        borderScaleFactor: 2.5,
        padding: 8,
        lockUniScaling: true
      });

      this.canvas.add(img);

      // Keep official frame on top
      if (this.frameObject) {
        this.canvas.bringObjectToFront(this.frameObject);
      }

      this.canvas.setActiveObject(img);
      this.canvas.calcOffset();
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error adding helmet sticker to Fabric:', err);
    }
  }

  /**
   * Multi-Touch Gesture Handling (Instagram Stories Style Pinch-to-Zoom & Rotate)
   */
  private setupInstagramTouchGestures(): void {
    if (!this.containerElement) return;

    const el = this.containerElement;

    const getTouchDistance = (t1: Touch, t2: Touch): number => {
      return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    };

    const getTouchAngle = (t1: Touch, t2: Touch): number => {
      return Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX);
    };

    el.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        if (!this.canvas) return;
        this.canvas.calcOffset();

        if (e.touches.length === 2) {
          const active = this.canvas.getActiveObject();
          if (active && active !== this.photoObject && active !== this.frameObject) {
            this.isPinching = true;
            this.initialTouchDistance = getTouchDistance(e.touches[0], e.touches[1]);
            this.initialTouchAngle = getTouchAngle(e.touches[0], e.touches[1]);
            this.initialObjectScale = active.scaleX || 1;
            this.initialObjectAngle = active.angle || 0;
            e.preventDefault();
          }
        }
      },
      { passive: false }
    );

    el.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        if (!this.canvas) return;

        if (e.touches.length === 2 && this.isPinching) {
          const active = this.canvas.getActiveObject();
          if (active && active !== this.photoObject && active !== this.frameObject) {
            e.preventDefault();

            const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
            const currentAngle = getTouchAngle(e.touches[0], e.touches[1]);

            if (this.initialTouchDistance > 0) {
              // 1. Pinch to Scale
              const scaleRatio = currentDistance / this.initialTouchDistance;
              const newScale = Math.max(0.15, Math.min(2.5, this.initialObjectScale * scaleRatio));
              active.set({
                scaleX: newScale,
                scaleY: newScale
              });

              // 2. 2-Finger Rotation
              const angleDiff = (currentAngle - this.initialTouchAngle) * (180 / Math.PI);
              active.set({
                angle: (this.initialObjectAngle + angleDiff) % 360
              });

              this.canvas.requestRenderAll();
            }
          }
        }
      },
      { passive: false }
    );

    const endPinch = () => {
      if (this.isPinching) {
        this.isPinching = false;
        this.saveState();
      }
    };

    el.addEventListener('touchend', endPinch);
    el.addEventListener('touchcancel', endPinch);
  }

  /**
   * Adds custom text caption
   */
  addText(text = 'FORD RACING'): void {
    if (!this.canvas) return;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    const iText = new fabric.IText(text, {
      left: canvasWidth / 2,
      top: canvasHeight * 0.78,
      originX: 'center',
      originY: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 'bold',
      fontSize: 44,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      textAlign: 'center',
      hasControls: false, // NO SQUARE HANDLES!
      hasBorders: true,
      borderColor: '#0062FF',
      borderDashArray: [6, 6],
      borderScaleFactor: 2.5,
      padding: 8
    });

    this.canvas.add(iText);
    if (this.frameObject) {
      this.canvas.bringObjectToFront(this.frameObject);
    }
    this.canvas.setActiveObject(iText);
    this.canvas.requestRenderAll();
  }

  /**
   * Deletes currently selected object
   */
  deleteActiveObject(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.photoObject && active !== this.frameObject) {
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Flips active helmet horizontally
   */
  flipActiveObject(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.photoObject && active !== this.frameObject) {
      active.set('flipX', !active.flipX);
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Layering
   */
  bringActiveForward(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.photoObject && active !== this.frameObject) {
      this.canvas.bringObjectForward(active);
      if (this.frameObject) {
        this.canvas.bringObjectToFront(this.frameObject);
      }
      this.canvas.requestRenderAll();
    }
  }

  sendActiveBackward(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.photoObject && active !== this.frameObject) {
      this.canvas.sendObjectBackwards(active);
      if (this.photoObject) {
        this.canvas.sendObjectToBack(this.photoObject);
      }
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Applies photography filters to the photo object
   */
  applyFilter(preset: FilterPreset): void {
    if (!this.canvas || !this.photoObject) return;

    this.photoObject.filters = [];

    if (preset.fabricFilterParams) {
      if (preset.fabricFilterParams.grayscale) {
        this.photoObject.filters.push(new fabric.filters.Grayscale());
      }
      if (preset.fabricFilterParams.brightness) {
        this.photoObject.filters.push(new fabric.filters.Brightness({ brightness: preset.fabricFilterParams.brightness }));
      }
      if (preset.fabricFilterParams.contrast) {
        this.photoObject.filters.push(new fabric.filters.Contrast({ contrast: preset.fabricFilterParams.contrast }));
      }
      if (preset.fabricFilterParams.saturation) {
        this.photoObject.filters.push(new fabric.filters.Saturation({ saturation: preset.fabricFilterParams.saturation }));
      }
    }

    this.photoObject.applyFilters();
    this.canvas.requestRenderAll();
  }

  /**
   * History Undo / Redo
   */
  private saveState(): void {
    if (!this.canvas || this.isStateLocked) return;
    const json = JSON.stringify(this.canvas.toJSON());
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(json);
    this.historyIndex = this.history.length - 1;
  }

  undo(): void {
    if (!this.canvas || this.historyIndex <= 0) return;
    this.historyIndex--;
    this.loadState(this.history[this.historyIndex]);
  }

  redo(): void {
    if (!this.canvas || this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    this.loadState(this.history[this.historyIndex]);
  }

  private async loadState(jsonString: string): Promise<void> {
    if (!this.canvas) return;
    this.isStateLocked = true;
    try {
      await this.canvas.loadFromJSON(JSON.parse(jsonString));
      this.canvas.requestRenderAll();
    } finally {
      this.isStateLocked = false;
    }
  }

  /**
   * Exports full high-resolution 1080x1920 9:16 Composite Image
   */
  exportComposite(format: 'jpeg' | 'png' = 'jpeg', quality = 0.96): string {
    if (!this.canvas) return '';

    // Deselect active object before rendering
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    const currentWidth = this.canvas.getWidth();
    const multiplier = 1080 / currentWidth;

    return this.canvas.toDataURL({
      format,
      quality,
      multiplier,
      enableRetinaScaling: true
    });
  }

  dispose(): void {
    if (this.canvas) {
      this.canvas.dispose();
      this.canvas = null;
    }
    this.photoObject = null;
    this.frameObject = null;
    this.containerElement = null;
    this.history = [];
    this.historyIndex = -1;
  }
}

export const fabricCanvasManager = new FabricCanvasManager();
