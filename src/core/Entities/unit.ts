import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_PUNK = 50;

class punkUnit implements IUnit {
	x: number;
	y: number;
	state: allState;
	type: allType;
	lifeAmount: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.state = allState.MOOVE;
		this.type = allType.PUNK;
		this.lifeAmount = LIFE_PUNK;
	}

	setState(state: allState): void {
		this.state = state;
	}

	takeDamage(amount: number): void {
		this.lifeAmount -= amount;
		if (this.lifeAmount < 1)
			this.setState(allState.DEAD);
		else
			this.setState(allState.TAKEDAMAGE)
	}

	moove(x: number, y: number): void {

	}

	attack(amount: number, target: IEntity): void {
		target.takeDamage(amount);
	}

}
