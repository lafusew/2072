import { allState, allType, IEntity } from "../core/entities/entity";

const EARTH_SPRITES = ['earth_0.gif', 'earth_1.gif', 'earth_2.gif', 'earth_3.gif', 'earth_4.gif', 'earth_5.gif', 'earth_6.gif', 'earth_7.gif', 'earth_8.gif', 'earth_9.gif', 'earth_10.gif', 'earth_11.gif'];
const BTC_SPRITES = ['btc_attack_0.gif', 'btc_attack_1.gif', 'btc_attack_2.gif', 'btc_attack_3.gif', 'btc_attack_4.gif'];

export class SpriteRenderer {
  ctx: CanvasRenderingContext2D;

  btc: CanvasImageSource[];
  punk: CanvasImageSource;
  tank: CanvasImageSource;
  monkey: CanvasImageSource;
  banana: CanvasImageSource;
  earth: CanvasImageSource[];
  constructor(
    ctx: CanvasRenderingContext2D,
    // to do for each sprites
    punk: CanvasImageSource,
    tank: CanvasImageSource,
    monkey: CanvasImageSource,
    banana: CanvasImageSource,
  ) {
    this.ctx = ctx;
    this.btc = this.loadAnimationSprites(BTC_SPRITES, 'animated_btc/')

    this.punk = punk;
    this.tank = tank;
    this.monkey = monkey;
    this.banana = banana;
    this.earth = this.loadAnimationSprites(EARTH_SPRITES, 'animated_earth/');
  }

  renderEntity(entity: IEntity) {
    switch (entity.type) {
      case allType.BTC:
        if (entity.state === allState.ATTACK) {
          this.renderAnimatedEntity(entity, this.btc, 100);
        } else {
          this.ctx.drawImage(this.btc[0], entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        }
        break;

      case allType.PUNK:
        this.ctx.drawImage(this.punk, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
        break;
      case allType.TANK:
        this.ctx.drawImage(this.tank, entity.x - (entity.size / 2), entity.y - (entity.size / 2), entity.size, entity.size);
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
