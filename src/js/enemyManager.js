import Enemy from "./enemy.js";

class EnemyManager {
    constructor() {
        /** @type {Enemy[]} */
        this.enemies = []; // Array to store enemy objects
    }

    // Function to add a new enemy to the enemies array
    CallEnemy() {
        this.enemies.push(new Enemy());
    }

    /**
     * Function to update all enemies in the enemies array
     * @param {number} dt
     */
    Update(dt) {
        this.enemies.forEach((enemy) => {
            enemy.Update(dt);
            if (enemy.die) {
                // If an enemy is marked as 'die', remove it from the array
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });
    }

    /**
     * Function to draw all enemies on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    Draw(ctx) {
        this.enemies.forEach((enemy) => {
            enemy.Draw(ctx);
        });
    }

    /**
     * Function to check if a point (x, y) hits any of the enemies
     * @param {number} x - The x-coordinate of the point
     * @param {number} y - The y-coordinate of the point
     */
    CheckHit(x, y) {
        this.enemies.forEach((enemy) => {
            enemy.CheckHitPoint(x, y);
        });
    }
}

// Export a singleton instance of the EnemyManager
export const enemyManager = new EnemyManager();
