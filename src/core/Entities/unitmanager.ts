import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../main";
import { boundingButton } from "../../renderer/inputs";
import { Earth } from "./earth";
import { IUnit } from "./entity";
import { PunkUnit } from "./unit";

export const PUNK_PRICE      = 1;
export const IDONTKNOW_PRICE = 2.5;
export const MONKEY_PRICE    = 5;

const ETH_START   = 0;
const RANGE_SPAWN = 300;


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
  units: IUnit[];
  earth: Earth;


  constructor(bounding: boundingButton, canvas: HTMLCanvasElement, earth: Earth) {
    this.canvas = canvas;
    this.canvas.addEventListener('mouseup', this.controler.bind(this));

    this.selected = typeSelect.NULL;	// TODO SELECTION
    this.etherum = ETH_START;
    this.bounding = bounding;
    this.earth = earth;
    this.units = [];
  }

  private spawnPunk(x: number, y: number): void {
    if (this.etherum >= PUNK_PRICE) {
      this.etherum -= PUNK_PRICE;
      const punk = new PunkUnit(x, y, this.earth.size / 2);
      this.units.push(punk);
      //console.log('spawned');
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


  private spawnNft(x: number, y: number): void {
    let distance_sqrt = Math.pow(this.earth.x - x, 2)
      + Math.pow(this.earth.y - y, 2);
    let distance_mid = Math.sqrt(distance_sqrt);
    if (distance_mid < RANGE_SPAWN)
      return ;
    switch (this.selected) {
      case typeSelect.PUNK:
        this.spawnPunk(x, y);
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
      if (y >= startButton && y <= endButton) {
        this.selected = i + 1;
        break;
      }
      startButton = endButton;
      endButton += this.bounding.btnSize;
    }
  }

  getUnits(): IUnit[] {
    return this.units;
  }

  controler(e: MouseEvent): void {
    let rect = this.canvas.getBoundingClientRect();
    const x = e.x - rect.left;
    const y = e.y - rect.top;

    if (x < 0 || x > CANVAS_WIDTH
      || y < 0 || y > CANVAS_HEIGHT)
      return;
    if (this.isSelection(x, y))
      this.setSelected(y);
    else
      this.spawnNft(x, y);
  }

}
