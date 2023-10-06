export default class Particle {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     * @param {string} color
     */
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
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
