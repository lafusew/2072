import { allState, allType, IEntity, IUnit } from "../entity";

const LIFE_TANK = 380;
const SPEED_TANK = 30; // speed punk / 2 ?
const SIZE_TANK = 80;
const DAMAGE_TANK = 250;
const DELAY_ATTACK = 2; // 0.5 punk

export class TankUnit implements IUnit {
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
  readyToDelete: boolean;

  constructor(x: number, y: number, radiusEarth: number) {
    this.size = SIZE_TANK;
    this.x = x;
    this.y = y;
    this.state = allState.MOOVE;
    this.type = allType.TANK;
    this.lifeAmount = LIFE_TANK;
    this.speed = SPEED_TANK;
    this.range = radiusEarth * 1.2;
    this.damage = DAMAGE_TANK;
    this.lastAttack = 0;
    this.readyToDelete = false;
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
      return;
    this.speed = SPEED_TANK * delta;
    let dx = x - this.x;
    let dy = y - this.y;

    let dist = Math.sqrt((dx * dx) + (dy * dy));
    let step = (this.speed / dist);

    this.x += step * dx;
    this.y += step * dy;
  }

  updateAttack(delta: number): void {
    if (this.state == allState.DEAD)
    {
      if (this.size < 5)
        this.readyToDelete = true;
      this.size--;
      return;
    }
    this.lastAttack += delta;
  }

  attack(target: IEntity): void {
    if (this.state == allState.DEAD || target.state == allState.DEAD)
      return;
    if (this.lastAttack > DELAY_ATTACK) {
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
