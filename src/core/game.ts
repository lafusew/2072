import { Renderer } from "../renderer/renderer";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: Renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.canvas, this.ctx);
  }

  update(delta: number) {
    // console.log(`delta(elapsed time since last frame): ${delta}`)
    // Logic

    // Render
    this.renderer.renderBackground();
  }
}