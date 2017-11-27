Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("../../../server/js/GeometryAndPhysics");
class Particle {
    constructor(ctx) {
        this.ctx = ctx;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.radius = 5;
        this.maxLifeTime = 100;
        this.draw = () => {
            if (this.image) {
                this.ctx.globalAlpha = this.lifeTime / this.maxLifeTime;
                this.ctx.drawImage(this.image, this.position.x - 128, this.position.y - 128);
                this.ctx.globalAlpha = 1.0;
                return;
            }
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
            this.ctx.fill();
            this.ctx.closePath();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            if (this.position.x >= WIDTH) {
                this.velocity.x = -this.velocity.x;
                this.position.x = WIDTH;
            }
            else if (this.position.x <= 0) {
                this.velocity.x = -this.velocity.x;
                this.position.x = 0;
            }
            if (this.position.y >= HEIGHT) {
                this.velocity.y = -this.velocity.y;
                this.position.y = HEIGHT;
            }
            else if (this.position.y <= 0) {
                this.velocity.y = -this.velocity.y;
                this.position.y = 0;
            }
            this.lifeTime--;
        };
        this.setImage = (image) => {
            this.image = image;
        };
        let id = Math.random();
        Particle.list[id] = this;
        this.maxLifeTime += Math.random() * 800;
        this.lifeTime = this.maxLifeTime;
    }
}
Particle.list = {};
exports.Particle = Particle;
//# sourceMappingURL=Particle.js.map