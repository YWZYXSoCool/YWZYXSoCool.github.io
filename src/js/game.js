import { Animation, DrawScore, DrawGameOver } from "./render.js";
import { RAVEN_BASE_INTERVAL } from "./const.js";
import { enemyManager } from "./enemyManager.js";
import { explosionManager } from "./explosionManager.js";
import { particleManager } from "./particleManager.js";

class Game {
    constructor() {
        this.lastTime = 0;
        this.ravenTimer = 0;

        this.score = 0;
        this.isGameOver = false;

        window.addEventListener("click", (e) => {
            const eventX = e.clientX,
                eventY = e.clientY;

            enemyManager.CheckHit(eventX, eventY);
        });
    }

    Update(timeStamp) {
        // Timer
        /** @type {number} */
        const dt = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.ravenTimer += dt;

        const RAVEN_INTERVAL =
            RAVEN_BASE_INTERVAL - Math.floor(this.score / 20) * 30;

        if (this.ravenTimer > (RAVEN_INTERVAL <= 100 ? 100 : RAVEN_INTERVAL)) {
            enemyManager.CallEnemy();
            this.ravenTimer = 0;
        }

        particleManager.Update();
        enemyManager.Update(dt);
        explosionManager.Update(dt);
        Animation();

        DrawScore(this.score);

        if (this.isGameOver) DrawGameOver();
        else requestAnimationFrame(this.Update.bind(this));
    }
}

/** @type {Game} */
export const game = new Game();
