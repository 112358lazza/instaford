import * as fabric from 'fabric';
import { FilterPreset } from '../types';

export class FabricCanvasManager {
  private canvas: fabric.Canvas | null = null;
  private bgObject: fabric.FabricImage | null = null;
  private personObject: fabric.FabricImage | null = null;
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
      backgroundColor: '#0b0f19',
      preserveObjectStacking: true,
      selection: true
    });

    // Configure touch and interaction defaults for mobile
    fabric.FabricObject.ownDefaults = {
      ...fabric.FabricObject.ownDefaults,
      cornerColor: '#FF4A00',
      cornerStrokeColor: '#ffffff',
      borderColor: '#002C6C',
      cornerSize: 24,
      cornerStyle: 'circle',
      transparentCorners: false,
      borderScaleFactor: 2.5,
      padding: 10
    };

    this.canvas.on('object:modified', () => {
      this.saveState();
    });

    this.canvas.on('object:added', (e) => {
      if (!this.isStateLocked && e.target !== this.bgObject && e.target !== this.frameObject) {
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
   * Sets or updates Layer 1: Background Scene Image
   */
  async setBackground(bgDataUri: string): Promise<void> {
    if (!this.canvas) return;

    if (this.bgObject) {
      this.canvas.remove(this.bgObject);
      this.bgObject = null;
    }

    try {
      const img = await fabric.FabricImage.fromURL(bgDataUri, {
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

      this.bgObject = img;
      this.canvas.insertAt(0, img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error loading background in Fabric:', err);
    }
  }

  /**
   * Sets Layer 2: Person Segmented Cutout
   */
  async setPersonImage(personDataUri: string): Promise<void> {
    if (!this.canvas) return;

    if (this.personObject) {
      this.canvas.remove(this.personObject);
      this.personObject = null;
    }

    try {
      const img = await fabric.FabricImage.fromURL(personDataUri, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      // Position person near bottom center of the 9:16 frame
      const imgW = img.width || canvasWidth;
      const imgH = img.height || canvasHeight;
      const scale = Math.min((canvasWidth * 0.95) / imgW, (canvasHeight * 0.85) / imgH);

      img.set({
        originX: 'center',
        originY: 'bottom',
        left: canvasWidth / 2,
        top: canvasHeight - 20,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
        hasControls: true,
        cornerColor: '#00d2d3',
        borderColor: '#00d2d3'
      });

      this.personObject = img;
      
      // Person goes above background (index 1)
      const targetIndex = this.bgObject ? 1 : 0;
      this.canvas.insertAt(targetIndex, img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error loading person image in Fabric:', err);
    }
  }

  /**
   * Adds an interactive sticker on Layer 3
   */
  async addSticker(svgDataUri: string, initialScale = 0.5): Promise<void> {
    if (!this.canvas) return;

    try {
      const img = await fabric.FabricImage.fromURL(svgDataUri, {
        crossOrigin: 'anonymous'
      });

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      // Random slight offset around upper-mid frame
      const offsetX = (Math.random() - 0.5) * 120;
      const offsetY = (Math.random() - 0.5) * 120;

      img.set({
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2 + offsetX,
        top: canvasHeight * 0.35 + offsetY,
        scaleX: initialScale,
        scaleY: initialScale,
        selectable: true,
        hasControls: true,
        cornerColor: '#FF4A00',
        cornerStrokeColor: '#ffffff',
        borderColor: '#FF4A00',
        cornerSize: 26,
        padding: 8
      });

      this.canvas.add(img);

      // Make sure frame overlay stays above stickers
      if (this.frameObject) {
        this.canvas.bringObjectToFront(this.frameObject);
      }

      this.canvas.setActiveObject(img);
      this.canvas.requestRenderAll();
    } catch (err) {
      console.warn('Error adding sticker to Fabric:', err);
    }
  }

  /**
   * Sets Layer 4: Foreground Frame Overlay
   */
  async setFrame(overlaySvgDataUri: string): Promise<void> {
    if (!this.canvas) return;

    if (this.frameObject) {
      this.canvas.remove(this.frameObject);
      this.frameObject = null;
    }

    if (!overlaySvgDataUri) {
      this.canvas.requestRenderAll();
      return;
    }

    try {
      const img = await fabric.FabricImage.fromURL(overlaySvgDataUri, {
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
   * Adds custom text caption
   */
  addText(text = 'FORD ADVENTURE 4X4'): void {
    if (!this.canvas) return;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    const iText = new fabric.IText(text, {
      left: canvasWidth / 2,
      top: canvasHeight * 0.75,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Impact, sans-serif',
      fontSize: 48,
      fill: '#ffffff',
      stroke: '#002C6C',
      strokeWidth: 3,
      textAlign: 'center',
      cornerColor: '#FF4A00',
      borderColor: '#FF4A00',
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
    if (active && active !== this.bgObject && active !== this.frameObject) {
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Flips the currently active object horizontally
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
   * Moves active object up one layer
   */
  bringActiveForward(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.bgObject && active !== this.frameObject) {
      this.canvas.bringObjectForward(active);
      if (this.frameObject) {
        this.canvas.bringObjectToFront(this.frameObject);
      }
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Moves active object down one layer
   */
  sendActiveBackward(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active !== this.bgObject && active !== this.frameObject) {
      this.canvas.sendObjectBackwards(active);
      // Ensure background stays at very bottom
      if (this.bgObject) {
        this.canvas.sendObjectToBack(this.bgObject);
      }
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Applies color adjustments & filters across canvas
   */
  applyFilter(preset: FilterPreset): void {
    if (!this.canvas) return;
    // We can apply filter adjustments to person and background images
    const objects = [this.bgObject, this.personObject].filter(Boolean) as fabric.FabricImage[];
    
    objects.forEach(obj => {
      obj.filters = [];
      if (preset.id === 'noir-expedition') {
        obj.filters.push(new fabric.filters.Grayscale());
      }
      if (preset.fabricFilterParams) {
        if (preset.fabricFilterParams.brightness) {
          obj.filters.push(new fabric.filters.Brightness({ brightness: preset.fabricFilterParams.brightness }));
        }
        if (preset.fabricFilterParams.contrast) {
          obj.filters.push(new fabric.filters.Contrast({ contrast: preset.fabricFilterParams.contrast }));
        }
        if (preset.fabricFilterParams.saturation) {
          obj.filters.push(new fabric.filters.Saturation({ saturation: preset.fabricFilterParams.saturation }));
        }
      }
      obj.applyFilters();
    });

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
  exportComposite(format: 'jpeg' | 'png' = 'jpeg', quality = 0.95): string {
    if (!this.canvas) return '';

    // Deselect active object before exporting
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    // Export with high multiplier to guarantee 1080x1920 crispness
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
    this.bgObject = null;
    this.personObject = null;
    this.frameObject = null;
    this.history = [];
    this.historyIndex = -1;
  }
}

export const fabricCanvasManager = new FabricCanvasManager();
