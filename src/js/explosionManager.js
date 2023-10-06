import Explosion from "./explosion.js";

class ExplosionManager {
    constructor() {
        /** @type {Explosion[]} */
        this.explosions = [];
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     */
    CallExplosion(x, y, scale) {
        this.explosions.push(new Explosion(x, y, scale));
    }

    Update(dt) {
        this.explosions.forEach((explosion) => {
            explosion.Update(dt);
            if (explosion.die) {
                this.explosions.splice(this.explosions.indexOf(explosion), 1);
            }
        });
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {
        this.explosions.forEach((explosion) => {
            explosion.Draw(ctx);
        });
    }
}

export const explosionManager = new ExplosionManager();
