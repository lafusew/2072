import { allState, allType, IEntity } from "./entity";

const LIFE_EARTH = 50;
const SIZE_EARTH = 300;


export class Earth implements IEntity {
  x: number;
  y: number;
  size: number;
  state: allState;
  type: allType;
  lifeAmount: number;

  constructor(x: number, y: number) {
    this.size = SIZE_EARTH;
    this.x = x;
    this.y = y;
    console.log(this.x);
    console.log(this.y);
    this.state = allState.NOMOOVE;
    this.type = allType.EARTH;
    this.lifeAmount = LIFE_EARTH;
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

  getSize(): number {
    return this.size
  }
}
