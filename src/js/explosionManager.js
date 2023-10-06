import Explosion from "./explosion.js";

class ExplosionManager {
    constructor() {
        /** @type {Explosion[]} */
        this.explosions = []; // An array to store explosion objects.
    }

    /**
     * Create and add a new explosion to the manager.
     * @param {number} x - The x-coordinate of the explosion.
     * @param {number} y - The y-coordinate of the explosion.
     * @param {number} scale - The scale of the explosion.
     */
    CallExplosion(x, y, scale) {
        this.explosions.push(new Explosion(x, y, scale));
    }

    /**
     * Update all explosions in the manager.
     * @param {number} dt - The delta time for updating.
     */
    Update(dt) {
        this.explosions.forEach((explosion) => {
            explosion.Update(dt);
            if (explosion.die) {
                this.explosions.splice(this.explosions.indexOf(explosion), 1);
            }
        });
    }

    /**
     * Draw all explosions on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    Draw(ctx) {
        this.explosions.forEach((explosion) => {
            explosion.Draw(ctx);
        });
    }
}

export const explosionManager = new ExplosionManager(); // Export an instance of ExplosionManager.
