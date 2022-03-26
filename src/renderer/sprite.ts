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

  btcSprites: SpriteSheet;
  cryptoPunkSprites: SpriteSheet;
  boredApesSprites: SpriteSheet;
  earthSprites: SpriteSheet;

  constructor(
    spriteSheets: SpriteSheets,
    ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
    this.btcSprites = spriteSheets.btc;
    this.cryptoPunkSprites = spriteSheets.cryptoPunk;
    this.boredApesSprites = spriteSheets.boredApes;
    this.earthSprites = spriteSheets.earth;
  }

  renderEntity(entity: any) {
    switch (entity.state) {
      case 'iddle':

        break;

      case 'moove':

        break;

      case 'attack':
        break;
    }
  }
}

