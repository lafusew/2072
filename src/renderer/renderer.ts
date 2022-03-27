import { Btc } from "../core/allEntities/bitcoin";
import { Earth, LIFE_EARTH } from "../core/allEntities/earth";
import { IUnit } from "../core/allEntities/entity";
import { typeSelect } from "../core/allEntities/unitmanager";
import { BtnRenderer } from "./inputs";
import { SpriteRenderer } from "./sprite";


export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  backgroundImage: CanvasImageSource;
  punkImage: CanvasImageSource;
  tankImage: CanvasImageSource;
  monkeyImage: CanvasImageSource;
  bananaImage: CanvasImageSource;
  lifeFrameImage: CanvasImageSource;
  ethImage: CanvasImageSource;

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

    this.punkImage = new Image();
    this.punkImage.src = 'src/assets/cryptopunk.png';
    this.tankImage = new Image();
    this.tankImage.src = 'src/assets/tank.png';
    this.monkeyImage = new Image();
    this.monkeyImage.src = 'src/assets/monkey.png';
    this.bananaImage = new Image();
    this.bananaImage.src = 'src/assets/banana.png';
    this.lifeFrameImage = new Image();
    this.lifeFrameImage.src = 'src/assets/life_frame.png';
    this.ethImage = new Image();
    this.ethImage.src = 'src/assets/eth.png'

    this.spriteRenderer = new SpriteRenderer(ctx, this.punkImage, this.tankImage, this.monkeyImage, this.bananaImage);
    this.btnRenderer = new BtnRenderer(this.ctx, this.punkImage, this.tankImage, this.monkeyImage);
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
    this.spriteRenderer.renderAnimatedEntity(earth, this.spriteRenderer.earth, earth.getSize());
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

  renderEthCount(eth: number, maxWallet: number) {
    this.ctx.drawImage(this.ethImage, this.canvasWidth - 90, 20);
    this.ctx.textAlign = "right";
    if (eth == maxWallet)
      this.ctx.fillStyle = '#faf663';
    else
      this.ctx.fillStyle = '#ca42fb';

    this.ctx.fillText(String(eth), this.canvasWidth - 10, 60 + (this.ethImage.height as number))
  }

  renderYear(year: number) {
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "center";
    this.ctx.fillText(String(year), this.canvasWidth / 2, 80);
  }
}
