
import { Renderer } from "../renderer/renderer";
import { Btc } from "./Entities/bitcoin";
import { UnitManager } from "./Entities/unitmanager";
import { AudioManager } from "./sound/soundManager";


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
  audio: AudioManager;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.canvas, this.ctx);
    this.audio = new AudioManager(SOUNDS_MAP);

    this.btc = new Btc(200, 200)
    this.unitManager = new UnitManager(this.renderer.btnRenderer.getUnitsBtnsBounding(), this.canvas);
  }

  async init() {
    await this.audio.init();
  }

  update(delta: number) {
    // console.log(`delta(elapsed time since last frame): ${delta}`)
    // Logic
    this.btc.update();
    // Render
    this.renderer.renderBackground();
    this.renderer.renderUnitBtn();
    this.renderer.renderBtc(this.btc)
  }
}
