export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  renderBackground(canvasImgSrc: CanvasImageSource): void {
    this.ctx.moveTo(0, 0);
    this.ctx.drawImage(canvasImgSrc, this.canvasWidth, this.canvasHeight)
  }

  renderBtc() {

  }

  renderNfts() {

  }
}