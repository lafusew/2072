import { Earth, LIFE_EARTH } from "../core/allEntities/earth";
import { IUnit } from "../core/allEntities/entity";
import { typeSelect } from "../core/allEntities/unitmanager";
import { AssetsManager } from "./assets";
import { BtnRenderer } from "./inputs";
import { SpriteRenderer } from "./sprite";
import { ANIMATED_SPRITES, STATIC_SPRITES } from "./SPRITES_CONFIG";


export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  assets: AssetsManager;
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

    this.assets = AssetsManager.getInstance();


    Object.values(STATIC_SPRITES).forEach(sprite => this.assets.loadSprite(sprite));
    Object.values(ANIMATED_SPRITES).forEach(sprites => this.assets.loadSprites(sprites));

    this.spriteRenderer = new SpriteRenderer(ctx);
    this.btnRenderer = new BtnRenderer(
      this.ctx,
      this.assets.getAnimatedSprites('punk')[0],
      this.assets.getAnimatedSprites('tank')[0],
      this.assets.getAnimatedSprites('monkey')[0],
    );
  }

  renderBackground(): void {
    const bg = this.assets.getStaticSprite('bg');
    this.ctx.drawImage(bg, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  renderMenu(addEventListen: () => void, playBtnConfig: { x: number, y: number, size: number }): void {
    // to be removed
    addEventListen();

    const bgClear = this.assets.getStaticSprite('bg_clear');
    const playBtn = this.assets.getAnimatedSprites('playBtn');

    console.log(1)

    this.ctx.drawImage(bgClear, 0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.font = "300px Minimal";
    this.ctx.fillStyle = '#c0ffa3';
    this.ctx.textAlign = 'center'
    this.ctx.fillText('2072', this.canvasWidth / 2, this.canvasHeight / 2);
    this.ctx.font = "40px Minimal";

    this.spriteRenderer.drawAnimatedImage(playBtn, {
      x: playBtnConfig.x,
      y: playBtnConfig.y,
      size: 300,
      angle: 10,
      changespeed: 100
    })


  }

  renderUnits(units: IUnit[]): void {
    units.forEach(unit => {
      this.spriteRenderer.renderEntity(unit);
    });
  }

  renderUnitBtn(type: typeSelect): void {
    this.btnRenderer.unitSelectionDisplay(type);
  }

  renderEarth(earth: Earth): void {
    this.spriteRenderer.renderAnimatedEntity(
      earth,
      this.assets.getAnimatedSprites('earth'),
      earth.getSize()
    );
    this.renderEarthLife(earth);
  }

  renderEarthLife(earth: Earth): void {
    const lifeFrame = this.assets.getStaticSprite('life_frame')
    const x = (this.canvasWidth / 2) - (lifeFrame.width as number / 2);
    const y = 0;
    const lifePercentagePixel = earth.lifeAmount * (lifeFrame.width as number) / LIFE_EARTH;

    this.ctx.fillStyle = '#23bd16';

    if (earth.lifeAmount < LIFE_EARTH * .66) {
      this.ctx.fillStyle = '#e77018';
    }

    if (earth.lifeAmount < LIFE_EARTH * .33) {
      this.ctx.fillStyle = '#fb2020';
    }


    this.ctx.fillRect(x, y, lifePercentagePixel, lifeFrame.height as number);

    this.ctx.drawImage(lifeFrame, x, y);
  }

  renderEthCount(eth: number, maxWallet: number) {
    const ethLogo = this.assets.getStaticSprite('eth_logo');
    this.ctx.drawImage(ethLogo, this.canvasWidth - 90, 20);
    this.ctx.textAlign = "right";
    if (eth == maxWallet)
      this.ctx.fillStyle = '#faf663';
    else
      this.ctx.fillStyle = '#ca42fb';

    this.ctx.fillText(String(eth), this.canvasWidth - 10, 60 + (ethLogo.height as number))
  }

  renderYear(year: number) {
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "center";
    this.ctx.fillText(String(year), this.canvasWidth / 2, 80);
  }
}
