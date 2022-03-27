import { allState, allType, IEntity, IUnit } from "../entity";

const LIFE_BANANA = 1;
const SPEED_BANANA = 500;
const SIZE_BANANA = 50;
const DAMAGE_BANANA = 6;
const DELAY_ATTACK = 0.5;


export class BananaUnit implements IUnit {
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
    this.size = SIZE_BANANA;
    this.x = x;
    this.y = y;
    this.state = allState.ATTACK;
    this.type = allType.BANANA;
    this.lifeAmount = LIFE_BANANA;
    this.speed = SPEED_BANANA;
    this.range = radiusEarth * 1.2;
    this.damage = DAMAGE_BANANA;
    this.lastAttack = 0;
    this.readyToDelete = false;
  }

  setState(state: allState): void {
    this.state = state;
  }

  takeDamage(amount: number): void {
    this.lifeAmount -= amount;
    if (this.lifeAmount < 1)
    {
      this.setState(allState.DEAD);
      this.readyToDelete = true;
    }
  }

  moove(x: number, y: number, delta: number): void {
    if (this.state == allState.DEAD)
      return;
    this.speed = SPEED_BANANA * delta;
    let dx = x - this.x;
    let dy = y - this.y;

    let dist = Math.sqrt((dx * dx) + (dy * dy));
    let step = (this.speed / dist);

    this.x += step * dx;
    this.y += step * dy;
  }

  updateAttack(delta: number): void {
    this.lastAttack += delta;
  }

  attack(target: IEntity): void {
    if (this.state == allState.DEAD || target.state == allState.DEAD)
      return;
    if (this.lastAttack > DELAY_ATTACK) {
      target.takeDamage(this.damage);
      this.state = allState.DEAD;
      this.lifeAmount = 0;
      this.lastAttack = 0;
      this.readyToDelete = true;
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
