import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_BTC = 100;
const SPEED_BTC = 1;
const RANGE_BTC = 10;

export class Btc implements IUnit {
  x: number;
  y: number;
  state: allState;
  type: allType;
  lifeAmount: number;
  speed: number;
  range: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.state = allState.NOMOOVE;
    this.type = allType.BTC;
    this.lifeAmount = LIFE_BTC;
    this.speed = SPEED_BTC;
    this.range = RANGE_BTC;
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

  moove(x: number, y: number, delta: number): void {
    this.x += Math.sin(this.x - x) * delta * this.speed;
    this.y += Math.cos(this.y - y) * delta * this.speed;
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
}
