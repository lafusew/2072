export enum allState {
	NOMOOVE,
	MOOVE,
	ATTACK,
	TAKEDAMAGE
}
export enum allType {
	NULL,
	PUNK,
	BTC,
	EARTH
}

interface IEntity {
	x: number;
	y: number;
	state: allState;
	type: allType;
	lifeAmount: number;

	updateState:() => void;
	takeDamage:(amount: number) => void;
	die:() => void;
}

export interface IUnit extends IEntity {
	moove:(x: number, y: number) => void;
	attack:(amount: number, target: IEntity) => void;
}

/*	constructor() {
		this.x = 0;
		this.y = 0;
		this.lifeAmount = 0;
		this.type = entitityType.NULL;
		this.state = allState.NOMOOVE;
	}*/

