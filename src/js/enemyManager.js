import Enemy from "./enemy.js";

class EnemyManager {
    constructor() {
        /** @type {Enemy[]} */
        this.enemies = [];
    }

    CallEnemy() {
        this.enemies.push(new Enemy());
    }

    Update(dt) {
        this.enemies.forEach((enemy) => {
            enemy.Update(dt);
            if (enemy.die) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {
        this.enemies.forEach((enemy) => {
            enemy.Draw(ctx);
        });
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    CheckHit(x, y) {
        this.enemies.forEach((enemy) => {
            enemy.CheckHitPoint(x, y);
        });
    }
}

export const enemyManager = new EnemyManager();
