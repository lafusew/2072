import { allType, IEntity } from "../core/entities/entity";

export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  btc: CanvasImageSource;
  punk: CanvasImageSource;
  monkey: CanvasImageSource;
  banana: CanvasImageSource;
  constructor(
    ctx: CanvasRenderingContext2D,
    // to do for each sprites
    punk: CanvasImageSource,
    monkey: CanvasImageSource,
    banana: CanvasImageSource,
  ) {
    this.ctx = ctx;
    this.btc = new Image();
    this.btc.src = 'src/assets/btc.png';

    this.punk = punk;
    this.monkey = monkey;
    this.banana = banana;
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {
      case allType.BTC:
        this.ctx.drawImage(this.btc, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      case allType.PUNK:
        this.ctx.drawImage(this.punk, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      case allType.MONKEY:
        this.ctx.drawImage(this.monkey, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      case allType.BANANA:
        this.ctx.drawImage(this.banana, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      default:
        break;
    }
  }
}
