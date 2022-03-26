import { IEntity } from "../core/Entities/entity";

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
    this.ctx.drawImage(this.btcSprites, entity.x, entity.y, 80, 80);
  }
}

