import {
    Animation, // Import animation module
    DrawScore, // Import score drawing module
    DrawGameOver, // Import game over drawing module
    DrawPauseButton, // Import pause button drawing module
    DrawPauseMenu, // Import pause menu drawing module
} from "./render.js";

import { BTN_PADDING, RAVEN_BASE_INTERVAL } from "./const.js"; // Import constants

import { enemyManager } from "./enemyManager.js"; // Import enemy management module
import { explosionManager } from "./explosionManager.js"; // Import explosion effect management module
import { particleManager } from "./particleManager.js"; // Import particle effect management module

import { BTN_X_1, BTN_X_2, BTN_Y, BTN_WIDTH, BTN_HEIGHT } from "./const.js"; // Import constants

class Game {
    constructor() {
        this.lastTime = 0; // Last update timestamp
        this.ravenTimer = 0; // Raven timer

        this.score = 0; // Score
        this.isGameOver = false; // Is the game over
        this.isPause = false; // Is the game paused

        window.addEventListener("click", (e) => {
            const eventX = e.clientX,
                eventY = e.clientY;

            if (!this.isPause) enemyManager.CheckHit(eventX, eventY);

            if (
                eventX >= BTN_X_1 &&
                eventX <= BTN_X_2 + BTN_WIDTH + BTN_PADDING &&
                eventY >= BTN_Y - BTN_PADDING &&
                eventY <= BTN_Y + BTN_HEIGHT
            ) {
                this.isPause = !this.isPause;
            }
        });
    }

    /**
     * Update game state
     * @param {number} timeStamp - Timestamp
     */
    Update(timeStamp) {
        const RAVEN_INTERVAL =
            RAVEN_BASE_INTERVAL - Math.floor(this.score / 20) * 30;

        if (!this.isPause) {
            // Calculate time interval
            const dt = timeStamp - this.lastTime;
            this.lastTime = timeStamp;
            this.ravenTimer += dt;

            if (
                this.ravenTimer > (RAVEN_INTERVAL <= 100 ? 100 : RAVEN_INTERVAL)
            ) {
                enemyManager.CallEnemy(); // Call enemy generation function
                this.ravenTimer = 0;
            }

            particleManager.Update(); // Update particle effects
            enemyManager.Update(dt); // Update enemy state
            explosionManager.Update(dt); // Update explosion effects

            Animation(); // Execute animation logic
        } else {
            DrawPauseMenu(); // Draw pause menu
        }

        DrawScore(this.score); // Draw score
        DrawPauseButton(); // Draw pause button

        if (this.isGameOver) DrawGameOver(); // Draw game over screen
        else requestAnimationFrame(this.Update.bind(this)); // Continue requesting the next frame update
    }
}

/** @type {Game} */
export const game = new Game(); // Export game instance
