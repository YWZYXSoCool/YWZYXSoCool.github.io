import { explosionManager } from "./explosionManager.js";

import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    RAVEN_BASE_SPEED,
    RAVEN_IMAGE,
} from "./const.js";
import { game } from "./game.js";
import { particleManager } from "./particleManager.js";

export default class Enemy {
    constructor() {
        // Calculate the raven's speed based on the game's score
        this.ravenSpeedUp = RAVEN_BASE_SPEED + Math.floor(game.score / 10) / 5;

        // Image properties
        this.image = RAVEN_IMAGE;
        this.SPRITE_WIDTH = 271;
        this.SPRITE_HEIGHT = 194;
        this.frame = 0;
        this.SCALE = Math.random() * 2 + 1.5;

        this.width = 100 * this.SCALE;
        this.height = 50 * this.SCALE;
        this.x = CANVAS_WIDTH;
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.dirX = Math.random() * 3 + 2 * this.ravenSpeedUp;
        this.dirY = Math.random() * 4 - 1 * this.ravenSpeedUp;
        this.die = false;

        this.FLIP_INTERVAL = Math.random() * 50 + 50;
        this.flipTimer = 0;

        this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    /**
     * Check if a point (x, y) is within the enemy's boundaries
     * @param {number} x
     * @param {number} y
     */
    CheckHitPoint(x, y) {
        if (
            x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height
        ) {
            // Increase the game score and mark the enemy as "dying"
            game.score++;
            this.die = true;

            // Create an explosion at the enemy's position
            explosionManager.CallExplosion(this.x, this.y, this.SCALE);
        }
    }

    /**
     * Update the enemy's position and behavior
     * @param {number} dt
     */
    Update(dt) {
        // Reverse the enemy's vertical direction if it reaches the canvas boundaries
        if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
            this.dirY *= -1;
        }

        // Update the enemy's position
        this.x -= this.dirX;
        this.y += this.dirY;

        // Mark the enemy as "dying" if it goes off the canvas
        if (this.x < 0 - this.width) {
            this.die = true;
            game.isGameOver = true;
        }

        this.flipTimer += dt;

        // Change the frame of the enemy's animation and create particles
        if (this.flipTimer > this.FLIP_INTERVAL) {
            if (this.frame > 4) this.frame = 0;
            else this.frame++;

            this.flipTimer = 0;

            for (let i = 0; i < 5; i++) {
                // Create particles at the center of the enemy
                particleManager.CallParticle(
                    this.x + this.width * 0.5,
                    this.y + this.height * 0.5,
                    this.SCALE,
                    this.color
                );
            }
        }
    }

    /**
     * Draw the enemy on the canvas
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
