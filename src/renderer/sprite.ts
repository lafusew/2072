import { allType, IEntity } from "../core/Entities/entity";

export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  btc: CanvasImageSource;
  punk: CanvasImageSource;
  constructor(
    ctx: CanvasRenderingContext2D,
    // to do for each sprites
    punk: CanvasImageSource,
  ) {
    this.ctx = ctx;
    this.btc = new Image();
    this.btc.src = 'src/assets/btc.png';

    this.punk = punk
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {
      case allType.BTC:
        this.ctx.drawImage(this.btc, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      case allType.PUNK:
        this.ctx.drawImage(this.punk, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      default:
        break;
    }
  }

  loadAnimationSprites(filenames: string[]): CanvasImageSource[] {
    const sprites: CanvasImageSource[] = [];
    for (let i = 0; i < filenames.length; i++) {
      const img = new Image();
      img.src = filenames[i]
      sprites.push(img);
    }
    return sprites
  }

  drawAnimatedImage(
    imgList: CanvasImageSource[],
    config: {
      x: number,
      y: number,
      angle: number,
      factor: number,
      changespeed: number
    }
  ) {
    this.ctx.save();
    this.ctx.translate(config.x, config.y);
    this.ctx.rotate(config.angle * Math.PI / 180);
    if (!!imgList[Math.round(Date.now() / config.changespeed) % imgList.length]) {
      this.ctx.drawImage(
        imgList[Math.round(Date.now() / config.changespeed) % imgList.length],
        -(imgList[Math.round(Date.now() / config.changespeed) % imgList.length].width as number * config.factor / 2),
        -(imgList[Math.round(Date.now() / config.changespeed) % imgList.length].height as number * config.factor / 2),
        imgList[Math.round(Date.now() / config.changespeed) % imgList.length].width as number * config.factor,
        imgList[Math.round(Date.now() / config.changespeed) % imgList.length].height as number * config.factor);
    }
    this.ctx.restore();
  }
}
