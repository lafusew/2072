export enum allState {
	DEAD,
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

export interface IEntity {
	x: number;
	y: number;
	size: number;
	state: allState;
	type: allType;
	lifeAmount: number;

	setState:(state: allState) => void;
	takeDamage:(amount: number) => void;
}

export interface IUnit extends IEntity {
	speed: number;
	range: number;
	damage: number;

	moove:(x: number, y: number, delta: number) => void;
	attack:(target: IEntity) => void;
	canAttack:(target: IEntity) => boolean;
}
