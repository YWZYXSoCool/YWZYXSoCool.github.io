// Get the canvas element with the ID "main"
const canvas = document.getElementById("main");

// Check if the retrieved element is an HTMLCanvasElement, and throw an error if it's not
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas element not found");
}

// Get the 2D rendering context of the canvas
/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext("2d");

// Set the canvas width and height to match the innerWidth and innerHeight of the window
export const CANVAS_WIDTH = (canvas.width = innerWidth);
export const CANVAS_HEIGHT = (canvas.height = innerHeight);

// Define some constants related to the game
export const RAVEN_BASE_INTERVAL = 400;
export const RAVEN_BASE_SPEED = 0.7;

// Create Image objects for the raven and explosion images and set their source paths
export const RAVEN_IMAGE = new Image();
RAVEN_IMAGE.src = "src/image/enemy.png";
export const EXPLOSION_IMAGE = new Image();
EXPLOSION_IMAGE.src = "src/image/boom.png";

// Define constants for button coordinates and dimensions
export const BTN_X_1 = CANVAS_WIDTH - 60,
    BTN_X_2 = CANVAS_WIDTH - 30,
    BTN_Y = 10,
    BTN_WIDTH = 10,
    BTN_HEIGHT = 50,
    BTN_PADDING = 3;

// Define the path to the boom sound
export const BOOM_PATH = "src/sound/boom.wav";
