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

  async init(canvasElement: HTMLCanvasElement, width = 1080, height = 1920): Promise<void> {
    if (this.canvas) {
      this.canvas.dispose();
      this.canvas = null;
    }

    // Initialize Fabric Canvas
    this.canvas = new fabric.Canvas(canvasElement, {
      width,
      height,
      backgroundColor: '#080b11',
      preserveObjectStacking: true,
      selection: true
    });

    // Configure luxury touch and interaction controls
    fabric.FabricObject.ownDefaults = {
      ...fabric.FabricObject.ownDefaults,
      cornerColor: '#0050d8',
      cornerStrokeColor: '#ffffff',
      borderColor: '#0050d8',
      cornerSize: 28,
      cornerStyle: 'circle',
      transparentCorners: false,
      borderScaleFactor: 2.5,
      padding: 12
    };

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
  }

  getCanvas(): fabric.Canvas | null {
    return this.canvas;
  }

  /**
   * Sets Layer 1: Full-Frame Real Captured Photo (fitted/centered in 9:16)
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
   * Sets Layer 3: Official Ford Racing Frame Overlay
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
        evented: false,
        hasControls: false,
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
   * Adds an interactive helmet sticker
   */
  async addHelmetSticker(imageSrc: string, initialScale = 0.35): Promise<void> {
    if (!this.canvas) return;

    try {
      const img = await fabric.FabricImage.fromURL(imageSrc, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      // Position around upper-center area (where head usually is in portrait photo)
      img.set({
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight * 0.4,
        scaleX: initialScale,
        scaleY: initialScale,
        selectable: true,
        hasControls: true,
        cornerColor: '#0050d8',
        cornerStrokeColor: '#ffffff',
        borderColor: '#0050d8',
        cornerSize: 28,
        padding: 10
      });

      this.canvas.add(img);

      // Keep official frame on top of all stickers
      if (this.frameObject) {
        this.canvas.bringObjectToFront(this.frameObject);
      }

      this.canvas.setActiveObject(img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error adding helmet sticker to Fabric:', err);
    }
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
      stroke: '#080b11',
      strokeWidth: 2,
      textAlign: 'center',
      cornerColor: '#0050d8',
      borderColor: '#0050d8',
      padding: 10
    });

    this.canvas.add(iText);
    if (this.frameObject) {
      this.canvas.bringObjectToFront(this.frameObject);
    }
    this.canvas.setActiveObject(iText);
    this.canvas.requestRenderAll();
  }

  /**
   * Deletes the currently selected object
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
    if (active) {
      active.set('flipX', !active.flipX);
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Layering: Forward / Backward
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

    // Deselect active object
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
    this.history = [];
    this.historyIndex = -1;
  }
}

export const fabricCanvasManager = new FabricCanvasManager();
