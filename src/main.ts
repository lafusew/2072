import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!

const canvas = document.createElement('canvas');

canvas.width = window.innerWidth * 0.8
canvas.height = window.innerHeight * 0.8

app.appendChild(canvas);

function game() {
  // update

  // render

  requestAnimationFrame(game)
}