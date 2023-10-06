import Particle from "./particle.js";

class ParticleManager {
    constructor() {
        /** @type {Particle[]} */
        this.particles = [];
    }

    /**
     * Calls the Particle constructor to create a new particle and adds it to the particles array.
     * @param {number} x - The X coordinate.
     * @param {number} y - The Y coordinate.
     * @param {number} scale - The scale of the particle.
     * @param {string} color - The color of the particle.
     */
    CallParticle(x, y, scale, color) {
        this.particles.push(new Particle(x, y, scale, color));
    }

    /**
     * Updates all particles in the particles array.
     */
    Update() {
        this.particles.forEach((particle) => {
            particle.Update();
            if (particle.die) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            }
        });
    }

    /**
     * Draws all particles on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    Draw(ctx) {
        this.particles.forEach((particle) => {
            particle.Draw(ctx);
        });
    }
}

export const particleManager = new ParticleManager();
