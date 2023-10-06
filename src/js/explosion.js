import { BOOM_PATH, EXPLOSION_IMAGE } from "./const.js";

export default class Explosion {
    /**
     * Represents an explosion in the game.
     *
     * @param {number} x - The X-coordinate of the explosion.
     * @param {number} y - The Y-coordinate of the explosion.
     * @param {number} scale - The scale factor for the explosion.
     */
    constructor(x, y, scale) {
        // Load the explosion image.
        this.image = EXPLOSION_IMAGE;

        // Initialize frame and scale properties.
        this.frame = 0;
        this.SCALE = scale;

        // Define sprite dimensions.
        this.SPRITE_WIDTH = 200;
        this.SPRITE_HEIGHT = 179;

        // Load explosion sound.
        this.BOOM = new Audio(BOOM_PATH);

        // Set initial position and dimensions.
        this.x = x;
        this.y = y;
        this.width = 200 * (this.SCALE * 0.5);
        this.height = 179 * (this.SCALE * 0.5);
        this.timeSinceLastFrame = 0;
        this.FRAME_INTERVAL = 70;

        // Flag to indicate if the explosion should be removed.
        this.die = false;
    }

    /**
     * Update the explosion animation frame.
     *
     * @param {number} dt - The time elapsed since the last frame.
     */
    Update(dt) {
        if (this.frame == 0) this.BOOM.play();
        this.timeSinceLastFrame += dt;
        if (this.timeSinceLastFrame > this.FRAME_INTERVAL) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame >= 5) this.die = true;
        }
    }

    /**
     * Draw the explosion on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
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
