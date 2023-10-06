import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT, BTN_PADDING } from "./const.js";
import { BTN_X_1, BTN_X_2, BTN_Y, BTN_WIDTH, BTN_HEIGHT } from "./const.js";
import { enemyManager } from "./enemyManager.js";
import { explosionManager } from "./explosionManager.js";
import { particleManager } from "./particleManager.js";

// Function to draw the player's score on the canvas
export function DrawScore(score) {
    ctx.font = "50px Arial"; // Set the font style and size
    ctx.fillStyle = "#ffffff"; // Set the text color to white
    ctx.textAlign = "left"; // Align text to the left
    ctx.fillText("Score: " + score, 8, 47); // Display the score on the canvas
    ctx.fillStyle = "#000000"; // Set the text color to black for a shadow effect
    ctx.fillText("Score: " + score, 10, 45); // Display a shadow for the score
}

// Function to draw "Game Over" message on the canvas
export function DrawGameOver() {
    ctx.font = "100px Arial"; // Set the font style and size
    ctx.fillStyle = "#ffffff"; // Set the text color to white
    ctx.textAlign = "center"; // Align text to the center
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5); // Display "Game Over" in the center
    ctx.fillStyle = "#000000"; // Set the text color to black for a shadow effect
    ctx.fillText("Game Over", CANVAS_WIDTH * 0.5 + 5, CANVAS_HEIGHT * 0.5 - 5); // Display a shadow for the text
}

// Function to draw the pause button on the canvas
export function DrawPauseButton() {
    ctx.fillStyle = "#ffffff"; // Set the button color to white
    ctx.fillRect(BTN_X_1, BTN_Y, BTN_WIDTH, BTN_HEIGHT); // Draw the first pause button
    ctx.fillStyle = "#000000"; // Set the button color to black for a shadow effect
    ctx.fillRect(
        BTN_X_1 + BTN_PADDING,
        BTN_Y - BTN_PADDING,
        BTN_WIDTH,
        BTN_HEIGHT
    ); // Draw a shadow for the first button

    ctx.fillStyle = "#ffffff"; // Set the button color to white
    ctx.fillRect(BTN_X_2, BTN_Y, BTN_WIDTH, BTN_HEIGHT); // Draw the second pause button
    ctx.fillStyle = "#000000"; // Set the button color to black for a shadow effect
    ctx.fillRect(
        BTN_X_2 + BTN_PADDING,
        BTN_Y - BTN_PADDING,
        BTN_WIDTH,
        BTN_HEIGHT
    ); // Draw a shadow for the second button
}

// Function to draw the pause menu on the canvas
export function DrawPauseMenu() {
    ctx.font = "100px Arial"; // Set the font style and size
    ctx.fillStyle = "#ffffff"; // Set the text color to white
    ctx.textAlign = "center"; // Align text to the center
    ctx.fillText("Pause", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5); // Display "Pause" in the center
    ctx.fillStyle = "#000000"; // Set the text color to black for a shadow effect
    ctx.fillText("Pause", CANVAS_WIDTH * 0.5 + 5, CANVAS_HEIGHT * 0.5 - 5); // Display a shadow for the text
}

// Function to perform animation and clear the canvas
export function Animation() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clear the canvas

    // Draw particles,enemies and explosions on the canvas
    [particleManager, enemyManager, explosionManager].forEach((object) => {
        object.Draw(ctx);
    });
}
