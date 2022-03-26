
import { Renderer } from "../renderer/renderer";
import { Btc } from "./Entities/bitcoin";
import { Earth } from "./Entities/earth";
import { UnitManager } from "./Entities/unitmanager";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: Renderer;
  btc: Btc;
  unitManager: UnitManager;
  earth: Earth

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.canvas, this.ctx);
    this.earth = new Earth((canvas.width / 2) - 200, (canvas.height / 2) - 200)
    this.btc = new Btc(200, 200)
    this.unitManager = new UnitManager(this.renderer.btnRenderer.getUnitsBtnsBounding(), this.canvas);
  }

  update(delta: number) {
    // console.log(`delta(elapsed time since last frame): ${delta}`)
    // Logic
    this.btc.update();
    // Render
    this.renderer.renderBackground();
    this.renderer.renderEarth(this.earth);
    this.renderer.renderUnitBtn();
    this.renderer.renderNfts(this.unitManager.getUnits());
    this.renderer.renderBtc(this.btc)
  }
}
