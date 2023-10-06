const canvas = document.getElementById("main");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas element not found");
}

/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext("2d");

export const CANVAS_WIDTH = (canvas.width = innerWidth);
export const CANVAS_HEIGHT = (canvas.height = innerHeight);

export const RAVEN_BASE_INTERVAL = 400;
export const RAVEN_BASE_SPEED = 0.7;

export const RAVEN_IMAGE = new Image();
RAVEN_IMAGE.src = "src/image/enemy.png";
export const EXPLOSION_IMAGE = new Image();
EXPLOSION_IMAGE.src = "src/image/boom.png";
