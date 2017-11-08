Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = require("./Particle");
const enums_1 = require("../../server/js/enums");
const images_1 = require("./images");
class Effects {
    constructor(ctx) {
        this.ctx = ctx;
        this.maxVelocity = 2;
        this.initSmoke = (particleCount) => {
            for (var i = 0; i < particleCount; ++i) {
                let particle = new Particle_1.Particle(this.ctx);
                particle.position.updatePosition(enums_1.getRandomInt(0, WIDTH), enums_1.getRandomInt(0, HEIGHT));
                particle.velocity.updatePosition(this.generateRandom(-this.maxVelocity, this.maxVelocity), this.generateRandom(-this.maxVelocity, this.maxVelocity));
                particle.setImage(images_1.Img["smoke"]);
            }
        };
        this.decreaseSmoke = (particleCount) => {
            let count = 0;
            for (let i in Particle_1.Particle.list) {
                if (count < particleCount) {
                    delete Particle_1.Particle.list[i];
                }
                else {
                    return;
                }
                count++;
            }
        };
        this.generateRandom = (min, max) => {
            return Math.random() * (max - min) + min;
        };
        this.draw = () => {
            for (let i in Particle_1.Particle.list) {
                Particle_1.Particle.list[i].draw();
            }
        };
        this.update = () => {
            for (let i in Particle_1.Particle.list) {
                Particle_1.Particle.list[i].update();
                if (Particle_1.Particle.list[i].lifeTime <= 0) {
                    delete Particle_1.Particle.list[i];
                }
            }
        };
    }
}
exports.Effects = Effects;
//# sourceMappingURL=Effects.js.map