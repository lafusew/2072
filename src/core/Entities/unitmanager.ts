import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../main";
import { boundingButton } from "../../renderer/inputs";

export const PUNK_PRICE      = 10;
export const IDONTKNOW_PRICE = 25;
export const MONKEY_PRICE    = 50;

const ETH_START = 30;

export enum typeSelect {
	NULL,
	PUNK,
	IDONTKNOW,
	MONKEY,
}

export class UnitManager {
	selected: typeSelect;
	etherum: number;
	bounding: boundingButton;
	canvas: HTMLCanvasElement;

	constructor(bounding: boundingButton, canvas: HTMLCanvasElement) {
		this.selected = typeSelect.NULL;	// TODO SELECTION
		this.etherum = ETH_START;
		this.bounding = bounding;
		this.canvas = canvas;

		this.canvas.addEventListener('mouseup', this.controler.bind(this));
	}

	private spawnPunk(): void {
		if (this.etherum >= PUNK_PRICE)
		{
			this.etherum -= PUNK_PRICE;
			// TODO CREATE PUNK
		}
	}

	private isSelection(x: number, y: number): boolean {
		if (x >= this.bounding.startX
				&& x <= this.bounding.startX + this.bounding.btnSize
				&& y >= this.bounding.startY
				&& y <= this.bounding.startY + (this.bounding.btnSize * this.bounding.btnCount))
			return (true);
		return (false)
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
		let startButton = this.bounding.startY;
		let endButton = this.bounding.startY + this.bounding.btnSize;
		let i;

		for (i = 0; i < this.bounding.btnCount; ++i) {
			if (y >= startButton && y <= endButton)
			{
				this.selected = i + 1;
				break;
			}
			startButton = endButton;
			endButton += this.bounding.btnSize;
		}
	}

	controler(e: MouseEvent): void {
		let rect = this.canvas.getBoundingClientRect();
		const x = e.x - rect.left;
		const y = e.y - rect.top;

		if (x < 0 || x > CANVAS_WIDTH
				|| y < 0 || y > CANVAS_HEIGHT)
			return ;
		if (this.isSelection(x, y))
			this.setSelected(y);
		else
			this.spawnNft();
	}

}
