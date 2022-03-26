import { Game } from './core/game';
import './style.css';

// HTML Canvas Element setup
const app = document.querySelector<HTMLDivElement>('#app')!
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
app.appendChild(canvas);

let now: number;
let delta: number;
let then = window.performance.now();
let fps = 6x0;
let interval = 1000 / fps;

const game = new Game(canvas);

function run() {
  requestAnimationFrame(run);

  now = window.performance.now();
  delta = now - then;
  // How it works here:
  // https://gist.github.com/elundmark/38d3596a883521cb24f5
  if (delta > interval) {
    then = now - (delta % interval);
    game.update(delta)
  }
}

run();