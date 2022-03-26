import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../main";

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

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.UNIT_BTN_SIZE = 100;
    this.BTN_COUNT = 3;
    this.UNIT_BTN_START_X = CANVAS_WIDTH - this.UNIT_BTN_SIZE;
    this.UNIT_BTN_START_Y = (CANVAS_HEIGHT / 2) - (this.UNIT_BTN_SIZE * this.BTN_COUNT) / 2;
  }

  unitSelectionDisplay(): void {
    this.ctx.fillStyle = "blue"
    this.ctx.fillRect(
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    )

    this.ctx.fillStyle = "red"
    this.ctx.fillRect(
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y + this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    )

    this.ctx.fillStyle = "purple"
    this.ctx.fillRect(
      this.UNIT_BTN_START_X,
      this.UNIT_BTN_START_Y + 2 * this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE,
      this.UNIT_BTN_SIZE
    )
  }

  getUnitsBtnsBounding(): boundingButton {
    return { startX: this.UNIT_BTN_START_X, startY: this.UNIT_BTN_START_Y, btnSize: this.UNIT_BTN_SIZE, btnCount: this.BTN_COUNT }
  }
}
