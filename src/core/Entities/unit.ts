import { Earth } from "./earth";
import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_PUNK    = 50;
const SPEED_PUNK   = 50;
const SIZE_PUNK    = 50;
const DAMAGE_PUNK  = 50;
const DELAY_ATTACK = 0.5;


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
  lastAttack: number;

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
    this.lastAttack = 0;
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
    if (this.state == allState.DEAD)
      return ;
    this.speed = SPEED_PUNK * delta;
    let dx = x - this.x;
    let dy = y - this.y;

    let dist = Math.sqrt((dx*dx) + (dy*dy));
    let step = (this.speed / dist);

    this.x += step * dx;
    this.y += step * dy;
  }

  updateAttack(delta: number): void {
    this.lastAttack += delta;
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

}
