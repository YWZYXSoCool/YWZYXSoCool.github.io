import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } from "./const.js";
import { enemyManager } from "./enemyManager.js";
import { explosionManager } from "./explosionManager.js";
import { particleManager } from "./particleManager.js";

export function DrawScore(score) {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 8, 47);
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 10, 45);
}

export function DrawGameOver() {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
    ctx.fillStyle = "#000000";
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5 + 5, CANVAS_HEIGHT * 0.5 - 5);
}

export function Animation() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    particleManager.Draw(ctx);
    enemyManager.Draw(ctx);
    explosionManager.Draw(ctx);
}
