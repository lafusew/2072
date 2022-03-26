import { Renderer } from "../renderer/renderer";
import { Btc } from "./Entities/bitcoin";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: Renderer;
  btc: Btc

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.canvas, this.ctx);

    this.btc = new Btc(200, 200)
  }

  update(delta: number) {
    // console.log(`delta(elapsed time since last frame): ${delta}`)
    // Logic

    // Render
    this.renderer.renderBackground();
    this.renderer.renderBtc(this.btc)
  }
}