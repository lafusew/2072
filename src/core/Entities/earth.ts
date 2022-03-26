import { allState, allType, IEntity } from "./entity";

const LIFE_EARTH = 50;

class Earth implements IEntity {
  x: number;
  y: number;
  state: allState;
  type: allType;
  lifeAmount: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
}
