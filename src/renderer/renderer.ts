import { Btc } from "../core/Entities/bitcoin";
import { Earth, LIFE_EARTH } from "../core/Entities/earth";
import { IUnit } from "../core/Entities/entity";
import { typeSelect } from "../core/Entities/unitmanager";
import { BtnRenderer } from "./inputs";
import { SpriteRenderer } from "./sprite";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  backgroundImage: CanvasImageSource;
  earthImage: CanvasImageSource;
  punkImage: CanvasImageSource;
  lifeFrameImage: CanvasImageSource;

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

    this.backgroundImage = new Image();
    this.backgroundImage.src = 'src/assets/background.png'
    this.earthImage = new Image();
    this.earthImage.src = 'src/assets/earth.gif';
    this.punkImage = new Image();
    this.punkImage.src = 'src/assets/cryptopunk.png';
    this.lifeFrameImage = new Image();
    this.lifeFrameImage.src = 'src/assets/life_frame.png';

    this.spriteRenderer = new SpriteRenderer(ctx, this.punkImage);

    this.btnRenderer = new BtnRenderer(this.ctx, this.punkImage);
  }

  renderBackground(): void {
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  renderBtc(btc: Btc): void {
    this.spriteRenderer.renderEntity(btc)
  }

  renderNfts(units: IUnit[]): void {
    units.forEach(unit => {
      this.spriteRenderer.renderEntity(unit);
    });
  }

  renderUnitBtn(type: typeSelect): void {
    this.btnRenderer.unitSelectionDisplay(type);
  }

  renderEarth(earth: Earth): void {
    this.ctx.drawImage(this.earthImage, earth.x - (earth.size / 2), earth.y - (earth.size / 2), earth.size, earth.size)
    this.renderEarthLife(earth);
  }

  renderEarthLife(earth: Earth): void {
    const x = (this.canvasWidth / 2) - (this.lifeFrameImage.width as number / 2);
    const y = 0;
    const lifePercentagePixel = earth.lifeAmount * (this.lifeFrameImage.width as number) / LIFE_EARTH;

    this.ctx.fillStyle = '#23bd16';

    if (earth.lifeAmount < LIFE_EARTH * .66) {
      this.ctx.fillStyle = '#e77018';
    }

    if (earth.lifeAmount < LIFE_EARTH * .33) {
      this.ctx.fillStyle = '#fb2020';
    }


    this.ctx.fillRect(x, y, lifePercentagePixel, this.lifeFrameImage.height as number);

    this.ctx.drawImage(this.lifeFrameImage, x, y);
  }
}
