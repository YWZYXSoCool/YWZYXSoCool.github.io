import { EXPLOSION_IMAGE } from "./const.js";

export default class Explosion {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     */
    constructor(x, y, scale) {
        this.image = EXPLOSION_IMAGE;
        this.frame = 0;
        this.SCALE = scale;
        this.SPRITE_WIDTH = 200;
        this.SPRITE_HEIGHT = 179;

        this.sound = new Audio();
        this.sound.src = "src/sound/boom.wav";

        this.x = x;
        this.y = y;
        this.width = 200 * (this.SCALE * 0.5);
        this.height = 179 * (this.SCALE * 0.5);
        this.timeSinceLastFrame = 0;
        this.FRAME_INTERVAL = 70;

        this.die = false;
    }
    /**
     *
     * @param {number} dt
     */
    Update(dt) {
        if (this.frame == 0) this.sound.play();
        this.timeSinceLastFrame += dt;
        if (this.timeSinceLastFrame > this.FRAME_INTERVAL) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame >= 5) this.die = true;
        }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {
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
