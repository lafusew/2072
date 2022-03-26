import { allState, allType, IUnit } from "./entity";

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
}
