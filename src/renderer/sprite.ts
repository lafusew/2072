import { allState, allType, IEntity } from "../core/allEntities/entity";
import { AssetsManager } from "./assets";



export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  assets: AssetsManager;
  constructor(
    ctx: CanvasRenderingContext2D,
  ) {
    this.ctx = ctx;

    this.assets = AssetsManager.getInstance();
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {

      case allType.BTC:
        const btc = this.assets.getAnimatedSprites('btc');
        if (entity.state === allState.ATTACK) {
          this.renderAnimatedEntity(entity, btc, 100);
        } else {
          this.ctx.drawImage(
            btc[0],
            entity.x - (entity.size / 2),
            entity.y - (entity.size / 2),
            entity.size, entity.size
          );
        }
        break;

      case allType.PUNK:
        const punk = this.assets.getAnimatedSprites('punk');
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, punk, 100);
        } else {
          this.ctx.drawImage(punk[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.TANK:
        const tank = this.assets.getAnimatedSprites('tank');
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, tank, 100);
        } else {
          this.ctx.drawImage(tank[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.MONKEY:
        const monkey = this.assets.getAnimatedSprites('monkey');
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, monkey, 100);
        } else {
          this.ctx.drawImage(monkey[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.BANANA:
        const banana = this.assets.getAnimatedSprites('banana');
        this.renderAnimatedEntity(entity, banana, 200);
        // this.ctx.drawImage(this.bananaSprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;

      default:
        break;
    }
  }

  renderAnimatedEntity(entity: IEntity, sprites: CanvasImageSource[], speed = 500): void {
    this.drawAnimatedImage(sprites, {
      x: entity.x,
      y: entity.y,
      angle: 0,
      changespeed: speed,
      size: entity.size
    })
  }

  drawAnimatedImage(
    imgList: CanvasImageSource[],
    config: {
      x: number,
      y: number,
      angle: number,
      changespeed: number,
      size: number;
    }
  ) {
    this.ctx.save();
    this.ctx.rotate(config.angle * Math.PI / 180);
    const now = window.performance.now();

    if (!!imgList[Math.round(now / config.changespeed) % imgList.length]) {
      this.ctx.drawImage(
        imgList[Math.round(now / config.changespeed) % imgList.length],
        config.x - (config.size / 2), config.y - (config.size / 2),
        config.size, config.size
      )
    }
    this.ctx.restore();
  }
}
