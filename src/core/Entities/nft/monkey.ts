import { allState, allType, IEntity, IUnit } from "../entity";
import { UnitManager } from "../unitmanager";
import { BananaUnit } from "./banana";

const LIFE_MONKEY = 10;
const SPEED_MONKEY = 1;
const SIZE_MONKEY = 100;
const DAMAGE_MONKEY = 0;
const DELAY_ATTACK = 0.3;


export class MonkeyUnit implements IUnit {
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
  radiusEarth: number;
  readyToDelete: boolean;

  constructor(x: number, y: number, radiusEarth: number) {
    this.size = SIZE_MONKEY;
    this.x = x;
    this.y = y;
    this.state = allState.ATTACK;
    this.type = allType.MONKEY;
    this.lifeAmount = LIFE_MONKEY;
    this.speed = SPEED_MONKEY;
    this.range = 100000;
    this.radiusEarth = radiusEarth;
    this.damage = DAMAGE_MONKEY;
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
    this.speed = SPEED_MONKEY * delta;
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
      this.lastAttack = 0;
    }
  }

  attackBanana(units: UnitManager): void {
    if (this.state == allState.DEAD)
      return;
    if (this.lastAttack > DELAY_ATTACK) {
        units.spawnBanana(this.x, this.y);
        console.log('NEW BANANA')
        this.lastAttack = 0;
   }
  }

  canAttack(target: IEntity): boolean {
    if (this.state == allState.DEAD || target.state == allState.DEAD)
      return (false);
    return (true);
  }

}
