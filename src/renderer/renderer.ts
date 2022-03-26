import { Btc } from "../core/Entities/bitcoin";
import { BtnRenderer } from "./inputs";
import { SpriteRenderer } from "./sprite";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  backgroundImage: CanvasImageSource;

  spriteRenderer: SpriteRenderer;
  btnRenderer: BtnRenderer;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.spriteRenderer = new SpriteRenderer(ctx)
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'src/assets/background.png'
    this.btnRenderer = new BtnRenderer(this.ctx);
  }

  renderBackground(): void {
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight)
  }

  renderBtc(btc: Btc) {
    this.spriteRenderer.renderEntity(btc)
  }

  renderNfts() {

  }

  renderUnitBtn() {
    this.btnRenderer.unitSelectionDisplay();
  }
}