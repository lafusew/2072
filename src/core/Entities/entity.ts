import { UnitManager } from "./unitmanager";

export enum allState {
	DEAD,
	MOOVE,
	ATTACK,
	TAKEDAMAGE
}
export enum allType {
	NULL,
	PUNK,
	TANK,
	MONKEY,
	BANANA,
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
	lastAttack: number;
	readyToDelete: boolean;

	moove:(x: number, y: number, delta: number) => void;
	attack:(target: IEntity) => void;
	canAttack:(target: IEntity) => boolean;
	updateAttack?:(delta: number) => void;
	attackBanana?:(units: UnitManager) => void;
}
