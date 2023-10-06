export default class Particle {
    /**
     * Constructor for the Particle class.
     *
     * @param {number} x - The x-coordinate of the particle.
     * @param {number} y - The y-coordinate of the particle.
     * @param {number} scale - The scale of the particle.
     * @param {string} color - The color of the particle.
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

    /**
     * Update method for the Particle class.
     */
    Update() {
        this.x += this.speedX;
        this.radius += 0.2;
        if (this.radius > this.maxRadius) this.die = true;
    }

    /**
     * Draw method for the Particle class.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
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
