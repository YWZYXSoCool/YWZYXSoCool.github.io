import Particle from "./particle.js";

class ParticleManager {
    constructor() {
        /** @type {Particle[]} */
        this.particles = [];
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     * @param {string} color
     */
    CallParticle(x, y, scale, color) {
        this.particles.push(new Particle(x, y, scale, color));
    }

    Update() {
        this.particles.forEach((particle) => {
            particle.Update();
            if (particle.die) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            }
        });
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {
        this.particles.forEach((particle) => {
            particle.Draw(ctx);
        });
    }
}

export const particleManager = new ParticleManager();
