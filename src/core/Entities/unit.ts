import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_PUNK          = 50;
const DEFAULT_SPEED_PUNK = 1;
const RANGE_PUNK         = 5;

class PunkUnit implements IUnit {
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
		this.state = allState.MOOVE;
		this.type = allType.PUNK;
		this.lifeAmount = LIFE_PUNK;
		this.speed = DEFAULT_SPEED_PUNK;
		this.range = RANGE_PUNK;
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

	moove(x: number, y: number, delta: number): void {
		this.x += Math.sin(this.x - x) * delta * this.speed;
		this.y += Math.cos(this.y - y) * delta * this.speed;
	}

	attack(amount: number, target: IEntity): void {
		target.takeDamage(amount);
	}

	canAttack(target: IEntity): boolean {

	}
}
