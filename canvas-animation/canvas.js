const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function Circle(x, y, dx, dy, circleRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.circleRadius = circleRadius;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'green';
    ctx.stroke();
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
  };
}

const circleArr = [];
for (let i = 0; i < 100; i++) {
  const circleRadius = 30;
  const x = Math.random() * (innerWidth - 2 * circleRadius) + circleRadius;
  const y = Math.random() * (innerHeight - 2 * circleRadius) + circleRadius;
  const dx = (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
  const dy = (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);

  circleArr.push(new Circle(x, y, dx, dy, circleRadius));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((circle) => {
    circle.update();
    circle.draw();
  });
}

animate();
