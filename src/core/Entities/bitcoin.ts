import { allState, allType, IEntity, IUnit } from "./entity";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../main";
import { BTC_HEIGHT, BTC_WIDTH } from "../../renderer/sprite";

const LIFE_BTC = 100;
const SPEED_BTC = 1000;
const RANGE_BTC = 10;

export class Btc implements IUnit {
  x: number;
  y: number;
  state: allState;
  type: allType;
  lifeAmount: number;
  speed: number;
  range: number;
  velX: number;
  velY: number;
  keys: Record<string, boolean>;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.state = allState.NOMOOVE;
    this.type = allType.BTC;
    this.lifeAmount = LIFE_BTC;
    this.speed = SPEED_BTC;
    this.range = RANGE_BTC;
    this.keys = {}

    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  collision(): void {
	if (this.x >= CANVAS_WIDTH - BTC_WIDTH) {
        this.x = CANVAS_WIDTH - BTC_WIDTH;
    } else if (this.x <= 0) {
        this.x = 0;
    }

    if (this.y > CANVAS_HEIGHT - BTC_HEIGHT) {
        this.y = CANVAS_HEIGHT - BTC_HEIGHT;
    } else if (this.y <= 0) {
        this.y = 0;
    }
  }

  update(): void {

    let friction = 0.9;

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

	this.collision();

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
  attack(amount: number, target: IEntity): void {
    target.takeDamage(amount);
  }

  canAttack(target: IEntity): boolean {
    let distance_sqrt = Math.pow(target.x - this.x, 2)
      + Math.pow(target.y - this.y, 2);
    let distance = Math.sqrt(distance_sqrt);
    if (distance <= this.range)
      return (true);
    return (false);
  }
  moove(): void {}

}
