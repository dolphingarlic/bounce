var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function init() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.font = '15px sans-serif';
}

init();
window.onresize = init;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update velocity x
  if (startX > canvas.width || startX < 0) dx = -dx;
  // Update x
  startX += dx / 100;

  // Update velocity y
  dy += 9.8;
  if (startY > canvas.height - 10 || startY < 0) dy = -0.99 * dy;
  // Update y
  startY += dy / 100;

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.strokeText(
    'Velocity x: ' +
      Math.abs(Math.round(dx / 10) / 10) +
      'm/s ' +
      (dx > 0 ? 'right' : 'left') +
      '; Velocity y: ' +
      Math.abs(Math.round(dy / 10) / 10) +
      'm/s ' +
      (dy > 0 ? 'down' : 'up'),
    5,
    canvas.height - 5
  );

  ctx.arc(startX, startY, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

var startX;
var startY;
var dx;
var dy;

var mousedown = false;
var itv;

canvas.onmousedown = function(event) {
  mousedown = true;
  clearInterval(itv);

  startX = event.clientX;
  startY = event.clientY;
  (dx = 0), (dy = 0);
};

canvas.onmouseup = function() {
  mousedown = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  itv = setInterval(update, 10);
};

canvas.onmousemove = function(event) {
  if (!mousedown) return;

  dx = event.clientX - startX;
  dy = event.clientY - startY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = Math.log(Math.sqrt(dx * dx + dy * dy));
  ctx.lineCap = 'round';

  ctx.moveTo(startX, startY);
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(startX, startY, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'blue';
  ctx.fill();
};
