import { allState, allType, IEntity, IUnit } from "./entity";

const LIFE_BTC = 100;

class Btc implements IUnit{
	x: number;
	y: number;
	state: allState;
	type: allType;
	lifeAmount: number;

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
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
	moove(x: number, y: number){
		
	}
	attack(amount: number, target: IEntity){
		target.takeDamage(amount);
	}

}
