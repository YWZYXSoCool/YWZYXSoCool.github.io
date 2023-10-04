/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("main");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = innerWidth);
const CANVAS_HEIGHT = (canvas.height = innerHeight);

const RAVEN_BASE_INTERVAL = 400;
let ravenInterval = RAVEN_BASE_INTERVAL;
let ravenTimer = 0;
const RAVEN_BASE_SPEED = 0.7;
let ravenSpeedUp = RAVEN_BASE_SPEED;

let score = 0;
let isGameOver = false;

let enemies = [];
class Enemy {
    constructor() {
        // Image
        this.image = new Image();
        this.image.src = "../src/image/enemy.png";
        this.SPRITE_WIDTH = 271;
        this.SPRITE_HEIGHT = 194;
        this.frame = 0;
        this.SCALE = Math.random() * 2 + 1.5;

        this.width = 100 * this.SCALE;
        this.height = 50 * this.SCALE;
        this.x = CANVAS_WIDTH;
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.dirX = Math.random() * 3 + 2 * ravenSpeedUp;
        this.dirY = Math.random() * 4 - 1 * ravenSpeedUp;
        this.die = false;

        this.FLIP_INTERVAL = Math.random() * 50 + 50;
        this.flipTimer = 0;

        this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    CheckHitPoint(x, y) {
        if (
            x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height
        ) {
            score++;
            this.die = true;

            explosions.push(new Explosion(this.x, this.y, this.SCALE));
        }
    }
    Update(dt) {
        if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
            this.dirY *= -1;
        }
        this.x -= this.dirX;
        this.y += this.dirY;
        if (this.x < 0 - this.width) {
            this.die = true;
            isGameOver = true;
        }

        this.flipTimer += dt;
        if (this.flipTimer > this.FLIP_INTERVAL) {
            if (this.frame > 4) this.frame = 0;
            else this.frame++;
            this.flipTimer = 0;
            for (let i = 0; i < 5; i++) {
                particles.push(
                    new Particle(
                        this.x + this.width * 0.5,
                        this.y + this.height * 0.5,
                        this.SCALE,
                        this.color
                    )
                );
            }
        }
    }
    Draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.SPRITE_WIDTH * this.frame,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let particles = [];
class Particle {
    constructor(x, y, scale, color) {
        this.SCALE = scale;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * this.SCALE * 0.1;
        this.maxRadius = Math.random() * 10 + 15;
        this.die = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }
    Update() {
        this.x += this.speedX;
        this.radius += 0.2;
        if (this.radius > this.maxRadius) this.die = true;
    }
    Draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, scale) {
        this.image = new Image();
        this.image.src = "../src/image/boom.png";
        this.frame = 0;
        this.SCALE = scale;
        this.SPRITE_WIDTH = 200;
        this.SPRITE_HEIGHT = 179;

        this.sound = new Audio();
        this.sound.src = "../src/sound/boom.wav";

        this.x = x;
        this.y = y;
        this.width = 200 * (this.SCALE * 0.5);
        this.height = 179 * (this.SCALE * 0.5);
        this.timeSinceLastFrame = 0;
        this.FRAME_INTERVAL = 70;

        this.die = false;
    }
    Update(dt) {
        if (this.frame == 0) this.sound.play();
        this.timeSinceLastFrame += dt;
        if (this.timeSinceLastFrame > this.FRAME_INTERVAL) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame >= 5) this.die = true;
        }
    }
    Draw() {
        ctx.drawImage(
            this.image,
            this.SPRITE_WIDTH * this.frame,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let lastTime = 0;

function DrawScore() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 8, 47);
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 10, 45);
}

function DrawGameOver() {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
    ctx.fillStyle = "#000000";
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5 + 5, CANVAS_HEIGHT * 0.5 - 5);
}

window.addEventListener("click", (e) => {
    const eventX = e.clientX,
        eventY = e.clientY;

    [...enemies].forEach((object) => object.CheckHitPoint(eventX, eventY));
});

function Animation(timeStamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Timer
    const dt = timeStamp - lastTime;
    lastTime = timeStamp;
    ravenTimer += dt;

    const RAVEN_INTERVAL = RAVEN_BASE_INTERVAL - Math.floor(score / 20) * 30;
    ravenSpeedUp = RAVEN_BASE_SPEED + Math.floor(score / 10) / 10;

    if (ravenTimer > (RAVEN_INTERVAL <= 100 ? 100 : RAVEN_INTERVAL)) {
        enemies.push(new Enemy());
        ravenTimer = 0;
    }

    [...particles, ...enemies, ...explosions].forEach((object) =>
        object.Update(dt)
    );
    [...particles, ...enemies, ...explosions].forEach((object) =>
        object.Draw()
    );

    enemies.sort((a, b) => a.y - b.y);

    enemies = enemies.filter((object) => !object.die);
    explosions = explosions.filter((object) => !object.die);
    particles = particles.filter((object) => !object.die);

    DrawScore();

    if (!isGameOver) requestAnimationFrame(Animation);
    else DrawGameOver();
}

Animation(0);
