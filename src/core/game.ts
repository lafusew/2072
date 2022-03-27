
import { Renderer } from "../renderer/renderer";
import { Btc } from "./allEntities/bitcoin";
import { Earth } from "./allEntities/earth";
import { allState, allType } from "./allEntities/entity";
import { UnitManager } from "./allEntities/unitmanager";
import { AudioManager } from "./sound/soundManager";


const SPAWN_BTC_X = 200;
const SPAWN_BTC_Y = 200;
const FIRST_YEAR = 2009;
const FIRST_UP = 2012;
const LAST_YEAR = 2020;

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
  give_upgrade: boolean;
  up_year: number;
  clock: number;
  winner!: 'NFT' | 'BTC';

  constructor(canvas: HTMLCanvasElement) {
    this.give_upgrade = false;
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

  async init(addEventListen: () => void, config: { x: number, y: number, size: number }) {
    await this.audio.init();

    let font = new FontFace('Minimal', 'url(src/assets/fonts/Minimal.ttf)');
    await font.load();
    // @ts-ignore: Unreachable code error. fonts.add does exist
    document.fonts.add(font);
    this.renderer.renderMenu(addEventListen, config);
  }

  private updateYear(delta: number): void {
    this.clock += delta;
    if (this.clock > 2) {
      this.give_upgrade = false;
      ++this.year;
      this.clock -= 2;
    }
  }

  private upgradeYear(): void {
    this.give_upgrade = true;
    if (this.year >= 2015) {
      //this.unitManager.max_wallet += 1;
      this.unitManager.addEtherum(Math.floor(((this.year - 2000) / 10)));
    }
    this.btc.speed += 0.2;
    this.btc.size += 2;
    this.btc.range += 1;
  }

  private halvingYear(): void {
    this.up_year += 4;
    this.unitManager.addEtherum(Math.floor(this.unitManager.getEtherum() * 0.3));
  }


  update(delta: number) {
    let btc_atck = false;
    // Logic
    if (this.year == LAST_YEAR) {
      this.winner = 'BTC'
      this.end = true;
      return
    }

    if (this.earth.state == allState.DEAD) {
      this.winner = 'NFT'
      this.end = true;
      return;
    }
    this.updateYear(delta)

    if (!this.give_upgrade) {
      this.upgradeYear();
      if (this.year == this.up_year)
        this.halvingYear();
    }

    this.btc.update(this.earth, delta);

    this.unitManager.getUnits().forEach(element => {
      if (!btc_atck && this.btc.canAttack(element)) {
        this.btc.attack(element);
        btc_atck = true;
      }
      if (!element.canAttack(this.earth) && element.state != allState.DEAD) {
        element.moove(this.earth.x, this.earth.y, delta);
      }
      else {
        if (element.updateAttack) {
          ; element.updateAttack(delta);
        }
        if (element.type == allType.MONKEY) {
          if (element.attackBanana)
            element.attackBanana(this.unitManager);
        }
        else {
          element.attack(this.earth);
        }
      }
    });
    0
    this.unitManager.units = this.unitManager.getUnits().filter((val) => !val.readyToDelete)



    // Render
    this.renderer.renderBackground();
    this.renderer.renderEarth(this.earth);
    this.renderer.renderUnitBtn(this.unitManager.getSelected());
    this.renderer.renderNfts(this.unitManager.getUnits());
    this.renderer.renderEthCount(this.unitManager.getEtherum(), this.unitManager.max_wallet);
    this.renderer.renderYear(this.year);
    this.renderer.renderBtc(this.btc);
  }
}
