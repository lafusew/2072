import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_BTC = 100;
const SPEED_DEFAULT_BTC = 1;
const RANGE_BTC = 10;

class Btc implements IUnit{
	x: number;
	y: number;
	range: number;
	speed: number;
	state: allState;
	type: allType;
	lifeAmount: number;

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
		this.range = RANGE_BTC;
		this.speed = SPEED_DEFAULT_BTC;
		this.state = allState.NOMOOVE;
		this.type = allType.BTC;
		this.lifeAmount = LIFE_BTC;
	}
	setState(state: allState){
		this.state = state;
	}
	takeDamage(amount: number){
		this.lifeAmount -= amount;
		if (this.lifeAmount < 1)
			this.setState(allState.DEAD);
	}
	moove(x: number, y: number, delta: number){
		this.x += Math.sin(this.x - x) * delta * this.speed;
	}
	attack(amount: number, target: IEntity){
		target.takeDamage(amount);
	}
	canAttack(target: IEntity) {
		let distance_sqrt = Math.pow(target.x - this.x, 2)
			+ Math.pow(target.y - this.y, 2);
		let distance = Math.sqrt(distance_sqrt);
		if (distance <= this.range)
			return (true);
		return (false);
	}

}
