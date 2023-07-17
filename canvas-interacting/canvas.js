const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let mouse = {
  x: undefined,
  y: undefined,
};

const enums = Object.freeze({
  CIRCLES_COUNT: 500,
  DEFAULT_RADIUS: 10,
  MAXIMUM_RADIUS: 40,
  PROXIMITY_DISTANCE: 150,
  COLORS: ['#151F30', '#103778', '#0593A2', '#FF7A48', '#E3371E'],
});

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, circleRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.circleRadius = circleRadius;
  this.minCircleRadius = circleRadius;
  this.color = enums.COLORS[Math.floor(Math.random() * enums.COLORS.length)];

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    if (
      this.x + this.circleRadius > innerWidth ||
      this.x - this.circleRadius < 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.circleRadius > innerHeight ||
      this.y - this.circleRadius < 0
    ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (
      Math.abs(mouse.x - this.x) < enums.PROXIMITY_DISTANCE &&
      Math.abs(mouse.y - this.y) < enums.PROXIMITY_DISTANCE
    ) {
      if (this.circleRadius < enums.MAXIMUM_RADIUS) {
        this.circleRadius += 1;
      }
    } else if (this.circleRadius > this.minCircleRadius) {
      this.circleRadius -= 1;
    }
  };
}

let circleArr = [];
function init() {
  circleArr = [];
  for (let i = 0; i < enums.CIRCLES_COUNT; i++) {
    const circleRadius = Math.random() * enums.DEFAULT_RADIUS + 1;
    const x = Math.random() * (innerWidth - 2 * circleRadius) + circleRadius;
    const y = Math.random() * (innerHeight - 2 * circleRadius) + circleRadius;
    const dx =
      (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 1 + 1);
    const dy =
      (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 1 + 1);

    circleArr.push(new Circle(x, y, dx, dy, circleRadius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((circle) => {
    circle.update();
    circle.draw();
  });
}

init();
animate();
