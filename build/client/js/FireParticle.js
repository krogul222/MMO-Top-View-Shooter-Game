Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../../server/js/GeometryAndPhysics");
const canvas_1 = require("./canvas");
class FireParticle {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.size = 15;
        this.life = 0;
        this.maxLife = 10;
        this.draw = () => {
            ctx.fillStyle = "rgba(" + (260 - (this.life * 2)) + "," + ((this.life * 2) + 50) + "," + (this.life * 2) + "," + (((this.maxLife - this.life) / this.maxLife) * 0.4) + ")";
            ctx.beginPath();
            let pos = canvas_1.camera.getScreenPosition(this.position);
            ctx.arc(pos.x, pos.y, (this.maxLife - this.life) / this.maxLife * (this.size / 2) + (this.size / 2), 0, 2 * Math.PI);
            ctx.fill();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.life++;
        };
        if (param.maxLife !== undefined)
            this.maxLife = param.maxLife;
        if (param.size !== undefined)
            this.size = param.size;
    }
}
exports.FireParticle = FireParticle;
//# sourceMappingURL=FireParticle.js.map