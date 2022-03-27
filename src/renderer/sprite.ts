import { allState, allType, IEntity } from "../core/entities/entity";

const EARTH_SPRITES = ['earth_0.gif', 'earth_1.gif', 'earth_2.gif', 'earth_3.gif', 'earth_4.gif', 'earth_5.gif', 'earth_6.gif', 'earth_7.gif', 'earth_8.gif', 'earth_9.gif', 'earth_10.gif', 'earth_11.gif'];
const BTC_SPRITES = ['btc_attack_0.gif', 'btc_attack_1.gif', 'btc_attack_2.gif', 'btc_attack_3.gif', 'btc_attack_4.gif'];
const MONKEY_SPRITES = ['monkey_0.gif', 'monkey_1.gif'];
const PUNK_SPRITES = ['punk_0.gif', 'punk_1.gif'];
const BANANA_SPRITES = ['banana.png'];
const TANK_SPRITES = ['tank_0.gif', 'tank_1.gif'];

export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  btcSprites: CanvasImageSource[];
  punkSprites: CanvasImageSource[];
  tankSprites: CanvasImageSource[];
  monkeySprites: CanvasImageSource[];
  bananaSprites: CanvasImageSource[];
  earthSprites: CanvasImageSource[];
  constructor(
    ctx: CanvasRenderingContext2D,
    // to do for each sprites
  ) {
    this.ctx = ctx;
    this.punkSprites = this.loadAnimationSprites(PUNK_SPRITES, 'animated_punk/')
    this.btcSprites = this.loadAnimationSprites(BTC_SPRITES, 'animated_btc/')
    this.monkeySprites = this.loadAnimationSprites(MONKEY_SPRITES, 'animated_monkey/');
    this.earthSprites = this.loadAnimationSprites(EARTH_SPRITES, 'animated_earth/');
    this.bananaSprites = this.loadAnimationSprites(BANANA_SPRITES, 'animated_banana/');
    this.tankSprites = this.loadAnimationSprites(TANK_SPRITES, 'animated_tank/')
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {

      case allType.BTC:
        if (entity.state === allState.ATTACK) {
          this.renderAnimatedEntity(entity, this.btcSprites, 100);
        } else {
          this.ctx.drawImage(this.btcSprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.PUNK:
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, this.punkSprites, 100);
        } else {
          this.ctx.drawImage(this.punkSprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.TANK:
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, this.tankSprites, 100);
        } else {
          this.ctx.drawImage(this.tankSprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.MONKEY:
        if (entity.state === allState.TAKEDAMAGE) {
          this.renderAnimatedEntity(entity, this.monkeySprites, 100);
        } else {
          this.ctx.drawImage(this.monkeySprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.BANANA:
        this.ctx.drawImage(this.bananaSprites[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
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

  loadAnimationSprites(
    filenames: string[],
    namePath = ''
  ): CanvasImageSource[] {
    const sprites: CanvasImageSource[] = [];
    for (let i = 0; i < filenames.length; i++) {
      const img = new Image();
      img.src = "src/assets/" + namePath + filenames[i]
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
