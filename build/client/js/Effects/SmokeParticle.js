Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./../pregame/canvas");
const GeometryAndPhysics_1 = require("../../../server/js/GeometryAndPhysics");
class SmokeParticle {
    constructor(ctx, position, radius, maxRadius, center, time) {
        this.ctx = ctx;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.center = new GeometryAndPhysics_1.Point(0, 0);
        this.radius = 5;
        this.maxRadius = 5;
        this.maxLifeTime = 0;
        this.draw = () => {
            if (this.image) {
                this.ctx.globalAlpha = this.lifeTime / this.maxLifeTime;
                canvas_1.camera.drawSimpleImage(this.image, this.position.x, this.position.y);
                this.ctx.globalAlpha = 1.0;
                return;
            }
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
            this.ctx.fill();
            this.ctx.closePath();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            if (this.position.x >= this.center.x + this.radius) {
                this.velocity.x = -this.velocity.x;
                this.position.x = this.center.x + this.radius;
            }
            else if (this.position.x <= this.center.x - this.radius) {
                this.velocity.x = -this.velocity.x;
                this.position.x = this.center.x - this.radius;
            }
            if (this.position.y >= this.center.y + this.radius) {
                this.velocity.y = -this.velocity.y;
                this.position.y = this.center.y + this.radius;
            }
            else if (this.position.y <= this.center.y - this.radius) {
                this.velocity.y = -this.velocity.y;
                this.position.y = this.center.y - this.radius;
            }
            if (this.lifeTime > 0)
                this.lifeTime--;
        };
        this.setImage = (image) => {
            this.image = image;
        };
        let id = Math.random();
        this.position.x = position.x;
        this.position.y = position.y;
        this.center.x = center.x;
        this.center.y = center.y;
        this.radius = radius;
        this.maxRadius = maxRadius;
        SmokeParticle.list[id] = this;
        this.maxLifeTime = time;
        this.lifeTime = this.maxLifeTime;
    }
}
SmokeParticle.list = {};
exports.SmokeParticle = SmokeParticle;
//# sourceMappingURL=SmokeParticle.js.map