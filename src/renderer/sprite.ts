import { allType, IEntity } from "../core/Entities/entity";
const BTC_WIDTH = 80;
const BTC_HEIGHT = 80;
interface SpriteSheets {
  btc: SpriteSheet;
  cryptoPunk: SpriteSheet;
  boredApes: SpriteSheet;
  earth: SpriteSheet;
}

interface SpriteSheet {
  iddle: string[],
  moove: string[],
  attack: string[],
  die: string[]
}

export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  btcSprites: CanvasImageSource;

  constructor(
    ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
    this.btcSprites = new Image()
    this.btcSprites.src = 'src/assets/btc.png'
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {
      case allType.BTC:
        this.ctx.drawImage(this.btcSprites, entity.x, entity.y, BTC_WIDTH, BTC_HEIGHT);
        break;

      default:
        break;
    }
  }
}