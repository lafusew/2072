import { typeSelect } from "../core/entities/unitmanager";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../main";

const BTN_PADDING = 20;

export interface boundingButton {
  startX: number,
  startY: number,
  btnSize: number,
  btnCount: number
}

export class BtnRenderer {
  ctx: CanvasRenderingContext2D;

  UNIT_BTN_SIZE: number;
  UNIT_BTN_START_X: number;
  UNIT_BTN_START_Y: number;
  BTN_COUNT: number;

  frameSelected: CanvasImageSource;
  frameUnselected: CanvasImageSource;
  punk: CanvasImageSource;
  tank: CanvasImageSource;
  monkey: CanvasImageSource;

  constructor(ctx: CanvasRenderingContext2D, punk: CanvasImageSource, tank: CanvasImageSource, monkey: CanvasImageSource) {
    this.ctx = ctx;
    this.punk = punk;
    this.tank = tank;
    this.monkey = monkey;

    this.UNIT_BTN_SIZE = 100;
    this.BTN_COUNT = 3;
    this.UNIT_BTN_START_X = CANVAS_WIDTH - this.UNIT_BTN_SIZE;
    this.UNIT_BTN_START_Y = (CANVAS_HEIGHT / 2) - (this.UNIT_BTN_SIZE * this.BTN_COUNT) / 2;

    this.frameSelected = new Image();
    this.frameSelected.src = 'src/assets/empty_frame_selected.png';

    this.frameUnselected = new Image();
    this.frameUnselected.src = 'src/assets/empty_frame_unselected.png'
  }

  unitSelectionDisplay(selected: typeSelect): void {
    this.ctx.drawImage(
      selected == typeSelect.PUNK ? this.frameSelected : this.frameUnselected,
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    );
    this.ctx.drawImage(
      this.punk,
      this.UNIT_BTN_START_X + BTN_PADDING,
      this.UNIT_BTN_START_Y + BTN_PADDING,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2
    );



    this.ctx.drawImage(
      selected == typeSelect.TANK ? this.frameSelected : this.frameUnselected,
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y + this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    );
    this.ctx.drawImage(
      this.tank,
      this.UNIT_BTN_START_X + BTN_PADDING,
      this.UNIT_BTN_START_Y + this.UNIT_BTN_SIZE + BTN_PADDING,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2
    );

    this.ctx.drawImage(
      selected == typeSelect.MONKEY ? this.frameSelected : this.frameUnselected,
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y + 2 * this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    );
    this.ctx.drawImage(
      this.monkey,
      this.UNIT_BTN_START_X + BTN_PADDING,
      this.UNIT_BTN_START_Y + (2 * this.UNIT_BTN_SIZE) + BTN_PADDING,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2,
      this.UNIT_BTN_SIZE - BTN_PADDING * 2
    );
  };

  getUnitsBtnsBounding(): boundingButton {
    return { startX: this.UNIT_BTN_START_X, startY: this.UNIT_BTN_START_Y, btnSize: this.UNIT_BTN_SIZE, btnCount: this.BTN_COUNT }
  }
}
