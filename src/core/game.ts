
import { Renderer } from "../renderer/renderer";
import { Btc } from "./Entities/bitcoin";
import { Earth } from "./Entities/earth";
import { allState } from "./Entities/entity";
import { UnitManager } from "./Entities/unitmanager";
import { AudioManager } from "./sound/soundManager";


const SPAWN_BTC_X = 200;
const SPAWN_BTC_Y = 200;
const FIRST_YEAR  = 2009;
const FIRST_UP    = 2012;
const LAST_YEAR   = 2072;

export const SOUNDS_MAP = {
  tk1: 'tk1.mp3',
  tk2: 'tk2.mp3',
}

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: Renderer;
  btc: Btc;
  unitManager: UnitManager;
  earth: Earth
  audio: AudioManager;
  end: boolean;
  year: number;
  up_year: number;
  clock: number;

  constructor(canvas: HTMLCanvasElement) {
    this.end = false;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false
    this.renderer = new Renderer(this.canvas, this.ctx);
    this.earth = new Earth((canvas.width / 2), (canvas.height / 2));
    this.btc = new Btc(SPAWN_BTC_X, SPAWN_BTC_Y);
    this.unitManager = new UnitManager(this.renderer.btnRenderer.getUnitsBtnsBounding(), this.canvas, this.earth);
    this.audio = new AudioManager(SOUNDS_MAP);
    this.year = FIRST_YEAR;
    this.up_year = FIRST_UP;
    this.clock = 0;
  }

  async init() {
    await this.audio.init();
  }

  private updateYear(delta: number): void {
    this.clock += delta;
    if (this.clock > 2)
    {
      ++this.year;
      this.clock -= 2;
    }
  }

  private upgradeYear(): void {
    if (this.year >= 2015)
      this.unitManager.addEtherum(Math.floor(((this.year - 2000) / 3)));
    //console.log('eth = ' + this.unitManager.etherum);
  }

  private halvingYear(): void {
    this.up_year += 4;
    this.unitManager.addEtherum( this.unitManager.getEtherum() * 0.5 );
    //console.log('eth = ' + this.unitManager.etherum);
  }


  update(delta: number) {
    let btc_atck = false;
    // Logic
    this.updateYear(delta)

    this.upgradeYear();
    if (this.year == this.up_year)
      this.halvingYear();

    this.btc.update(this.earth, delta);

    this.unitManager.getUnits().forEach(element => {
      if (!btc_atck && this.btc.canAttack(element)) {
        this.btc.attack(element);
        btc_atck = true;
      }
      if (!element.canAttack(this.earth)) {
        element.moove(this.earth.x, this.earth.y, delta);
      }
      else {
        if (element.updateAttack) {
          element.updateAttack(delta);
        }
        element.attack(this.earth);
      }
    });

    if (this.year == LAST_YEAR || this.earth.state == allState.DEAD)
    {
      this.end = true;
      return;
    }
    // Render
    this.renderer.renderBackground();
    this.renderer.renderEarth(this.earth);
    this.renderer.renderUnitBtn(this.unitManager.getSelected());
    this.renderer.renderNfts(this.unitManager.getUnits());
    this.renderer.renderBtc(this.btc)
  }
}
