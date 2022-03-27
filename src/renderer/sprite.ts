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
}
