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
let then = window.performance.now();
let fps = MAX_FPS;
let interval = 1000 / fps;

const game = new Game(canvas);

game.init().then(() => {
  run();
})


function run() {
  requestAnimationFrame(run);

  now = window.performance.now();
  delta = now - then;
  // How it works here:
  // https://gist.github.com/elundmark/38d3596a883521cb24f5
  if (delta > interval) {
    //console.log('delta = ' +  delta)
    then = now - (delta % interval);
    game.update(delta / 1000);
    if (game.end)
      return ;
  }
}
