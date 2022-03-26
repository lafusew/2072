import { Btc } from "../core/Entities/bitcoin";
import { SpriteRenderer } from "./sprite";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  spriteRenderer: SpriteRenderer;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.spriteRenderer = new SpriteRenderer(ctx)
  }

  renderBackground(): void {
    let img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
    }
    img.src = 'src/assets/background.png'
  }

  renderBtc(btc: Btc) {
    this.spriteRenderer.renderEntity(btc)
  }

  renderNfts() {

  }
}