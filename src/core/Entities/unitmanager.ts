export const PUNK_PRICE      = 10;
export const IDONTKNOW_PRICE = 25;
export const MONKEY_PRICE    = 50;

const ETH_START = 30;


export enum typeSelect {
	NULL,
	PUNK,
	NYANCAT,
	MONKEY,
}

export class UnitManager {
	selected: typeSelect;
	etherum: number;

	constructor() {
		this.selected = typeSelect.NULL;	// TODO SELECTION
		this.etherum = ETH_START;


		document.addEventListener('mouseup', this.controler.bind(this)); //
	}

	private spawnPunk(): void {
		if (this.etherum >= PUNK_PRICE)
		{
			this.etherum -= PUNK_PRICE;
			// TODO CREATE PUNK
		}
	}

	private isSelection(x: number, y: number): boolean {
		//if (x >= SIZE_X && x <= )
			return (true);
		return (false);
	}


	private spawnNft(): void {
		switch (this.selected) {
			case typeSelect.PUNK:
				this.spawnPunk();
				break;
			}
		}

	addEtherum(nb: number): void {
		this.etherum += nb;
	}

	getEtherum(): number {
		return (this.etherum);
	}

	getSelected(): typeSelect {
		return (this.selected);
	}

	private setSelected(y: number): void {
		// TODO SWITCH
	}

	controler(e: MouseEvent): void {
		if (this.isSelection(e.x, e.y))
			this.setSelected(e.y);
		else
			this.spawnNft();
	}

}
