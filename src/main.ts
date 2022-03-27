import { Game } from './core/game';
import './style.css';

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 960;

// HTML Canvas Element setup
const MAX_FPS = 1000;
const app = document.querySelector<HTMLDivElement>('#app')!
const canvas = document.createElement('canvas');
app.appendChild(canvas);
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let now: number;
let delta: number;
let then = 0;
let fps = MAX_FPS;
let interval = 1000 / fps;
const game = new Game(canvas);

const playBtnPos = {
  x: canvas.width / 2 + 100,
  y: canvas.height / 2 + 50,
  size: 300
}

function startGame(e: MouseEvent): void {
  let rect = canvas.getBoundingClientRect();
  const x = e.x - rect.left;
  const y = e.y - rect.top;
  if (
    x >= playBtnPos.x - playBtnPos.size * .5
    && x <= playBtnPos.x + playBtnPos.size * .5
    && y >= playBtnPos.y - playBtnPos.size * .5
    && y <= playBtnPos.y + playBtnPos.size * .5
  ) {
    game.reset();
    run(then);
    canvas.removeEventListener('mouseup', startGame)
  }
}

function addEventListen() {
  canvas.addEventListener('mouseup', startGame)
}

game.init(addEventListen, playBtnPos);


function run(then: number) {
  requestAnimationFrame(run);

  now = window.performance.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    game.update(delta / 1000);
    if (game.end) {
      game.renderer.renderMenu(addEventListen, playBtnPos)
      game.ctx.textAlign = 'center';
      game.ctx.fillText(game.winner + ' wins the game!!', canvas.width / 2, 80);
      return
    }
  }
}

