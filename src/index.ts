const mouse = { x: 0, y: 0 };
const canvas = document.getElementsByTagName('canvas')[0];
canvas.onmousemove = (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
};
const context = canvas.getContext('2d')!;

const player = {
  color: 'red',
  pos: {
    x: 0,
    y: 0, 
  },
};
const puppy = {
  color: 'brown',
  pos: {
    x: 5,
    y: 5,
  },
  vel: {
    x: 0,
    y: 0,
  },
}

function draw() {
  [player, puppy].forEach(entity => {
    context.beginPath();
    context.arc(entity.pos.x, entity.pos.y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = entity.color;
    context.fill();
  });
}

const playerVelocity = 3;
function updatePlayer() {
  const deltaX = mouse.x - player.pos.x;
  const deltaY = mouse.y - player.pos.y;
  const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  if (distance < playerVelocity) {
    player.pos = { ...mouse };
  } else {
    const unitX = deltaX/distance;
    const unitY = deltaY/distance;
    player.pos.x += playerVelocity * unitX;
    player.pos.y += playerVelocity * unitY;
  }
}

let tick = Date.now();
function updatePuppy() {
  const accel = Math.floor((Date.now()-tick)/1000) * .001 + 0.3;
  puppy.vel.x += Math.sign(player.pos.x - puppy.pos.x) * accel;
  puppy.vel.y += Math.sign(player.pos.y - puppy.pos.y) * accel;

  if (Math.abs(puppy.vel.x) > 10) {
    puppy.vel.x = 10 * Math.sign(puppy.vel.x);
  }
  if (Math.abs(puppy.vel.y) > 10) {
    puppy.vel.y = 10 * Math.sign(puppy.vel.y);
  }
  
  puppy.pos.x += puppy.vel.x;
  puppy.pos.y += puppy.vel.y;
}

function main() {
  updatePlayer();
  updatePuppy();
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  main();
  draw();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
