import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../main";
import { Earth } from "./earth";
import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_BTC     = 100;
const SPEED_BTC    = 0.2;
const DAMAGE_BTC   = 40;
const RANGE_BTC    = 60;
const SIZE_BTC     = 20;
const DELAY_ATTACK = 0.3;

export class Btc implements IUnit {
  x: number;
  y: number;
  size: number;
  state: allState;
  type: allType;
  lifeAmount: number;
  speed: number;
  range: number;
  damage: number;
  velX: number;
  velY: number;
  keys: Record<string, boolean>;
  lastAttack: number;

  constructor(x: number, y: number) {
    this.size = SIZE_BTC;
    this.x = x + this.size / 2;
    this.y = y + this.size / 2;
    this.velX = 0;
    this.velY = 0;
    this.state = allState.MOOVE;
    this.type = allType.BTC;
    this.lifeAmount = LIFE_BTC;
    this.speed = SPEED_BTC;
    this.range = RANGE_BTC;
    this.damage = DAMAGE_BTC;
    this.keys = {}
    this.lastAttack = 0;

    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  wall_collision(): void {
    if (this.x >= CANVAS_WIDTH - this.size / 2) {
      this.x = CANVAS_WIDTH - this.size / 2;
    } else if (this.x <= this.size / 2) {
      this.x = this.size / 2;
    }

    if (this.y > CANVAS_HEIGHT - this.size / 2) {
      this.y = CANVAS_HEIGHT - this.size / 2;
    } else if (this.y <= this.size / 2) {
      this.y = this.size / 2;
    }
  }

  earth_collision(earth: Earth): void {
    const dx = this.x - CANVAS_WIDTH / 2;
    const dy = this.y - CANVAS_HEIGHT / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (earth.size / 2 + this.size / 2 >= dist) {
      const nx = dx / dist;
      const ny = dy / dist;

      this.x = CANVAS_WIDTH / 2 + nx * (this.size / 2 + earth.size / 2);
      this.y = CANVAS_HEIGHT / 2 + ny * (this.size / 2 + earth.size / 2);
    }
  }

  update(earth: Earth, delta: number): void {
    let friction = 0.9;
    this.lastAttack += delta;

    if (this.keys['ArrowUp']) {
      if (this.velY > -this.speed) {
        this.velY--;
        this.velY--;
      }
    }

    if (this.keys['ArrowDown']) {
      if (this.velY < this.speed) {
        this.velY++;
        this.velY++;
      }
    }
    if (this.keys['ArrowRight']) {
      if (this.velX < this.speed) {
        this.velX++;
        this.velX++;
      }
    }
    if (this.keys['ArrowLeft']) {
      if (this.velX > -this.speed) {
        this.velX--;
        this.velX--;
      }
    }

    this.velY *= friction;
    this.y += this.velY;
    this.velX *= friction;
    this.x += this.velX;

    this.wall_collision();
    this.earth_collision(earth);

  }

  setState(state: allState): void {
    this.state = state;
  }

  takeDamage(amount: number): void {
    this.lifeAmount -= amount;
    if (this.lifeAmount < 1)
      this.setState(allState.DEAD);
    else
      this.setState(allState.TAKEDAMAGE);
  }

  attack(target: IEntity): void {
    if (this.state == allState.DEAD || target.state == allState.DEAD)
      return ;
    if (this.lastAttack > DELAY_ATTACK)
    {
      target.takeDamage(this.damage);
      this.lastAttack = 0;
    }
  }

  canAttack(target: IEntity): boolean {
    if (this.state == allState.DEAD || target.state == allState.DEAD)
       return (false);
    let distance_sqrt = Math.pow(target.x - this.x, 2)
      + Math.pow(target.y - this.y, 2);
    let distance = Math.sqrt(distance_sqrt);
    if (distance <= this.range)
      return (true);
    return (false);
  }

  moove(): void {}

}
