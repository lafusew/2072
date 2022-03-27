import { Earth } from "./earth";
import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_PUNK   = 50;
const SPEED_PUNK  = 100;
const SIZE_PUNK   = 50;
const DAMAGE_PUNK = 50;

export class PunkUnit implements IUnit {
  x: number;
  y: number;
  state: allState;
  type: allType;
  lifeAmount: number;
  size: number;
  speed: number;
  range: number;
  damage: number;

  constructor(x: number, y: number, radiusEarth: number) {
    this.size = SIZE_PUNK;
    this.x = x;
    this.y = y;
    this.state = allState.MOOVE;
    this.type = allType.PUNK;
    this.lifeAmount = LIFE_PUNK;
    this.speed = SPEED_PUNK;
    this.range = radiusEarth * 1.2;
    this.damage = DAMAGE_PUNK;
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
    this.speed = SPEED_PUNK * delta;
    let dx = x - this.x;
    let dy = y - this.y;

    let dist = Math.sqrt((dx*dx) + (dy*dy));
    let step = (this.speed / dist);

    this.x += step * dx;
    this.y += step * dy;
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
