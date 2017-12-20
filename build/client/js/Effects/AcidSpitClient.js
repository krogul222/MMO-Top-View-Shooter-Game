Object.defineProperty(exports, "__esModule", { value: true });
const AcidParticle_1 = require("./AcidParticle");
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
class AcidSpitClient {
    constructor(parent, burn = false) {
        this.particles = [];
        this.angle = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.speed = 5;
        this.create = false;
        this.burn = false;
        this.draw = () => {
            ctx.globalCompositeOperation = "lighter";
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
            ctx.globalCompositeOperation = "source-over";
        };
        this.update = () => {
            if (this.create) {
                for (let i = 0; i < 10; i++) {
                    let p;
                    if (this.burn) {
                        p = new AcidParticle_1.AcidParticle({ maxLife: 10, size: 7 });
                    }
                    else {
                        p = new AcidParticle_1.AcidParticle({ maxLife: 60 });
                    }
                    let oldpos = new GeometryAndPhysics_1.Point(this.parent.position.x, this.parent.position.y);
                    let angle = this.parent.aimAngle + 180;
                    if (this.burn) {
                        angle = Math.random() * 360;
                    }
                    else {
                        oldpos.x -= Math.cos((angle * Math.PI) / 180) * 50;
                        oldpos.y -= Math.sin((angle * Math.PI) / 180) * 50;
                    }
                    ;
                    p.position.updatePosition(oldpos.x, oldpos.y);
                    let flame = (0 - Math.random() * 2 * this.speed);
                    p.velocity.x = Math.cos((angle * Math.PI * 2) / 360) * flame;
                    p.velocity.y = Math.sin((angle * Math.PI * 2) / 360) * flame;
                    angle += 90;
                    flame = (Math.random() * 2 * this.speed - this.speed) / 6;
                    p.velocity.x += Math.cos((angle * Math.PI * 2) / 360) * flame;
                    p.velocity.y += Math.sin((angle * Math.PI * 2) / 360) * flame;
                    this.particles.push(p);
                }
            }
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].life >= this.particles[i].maxLife) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        };
        this.parent = parent;
        this.position.x = parent.position.x;
        this.position.y = parent.position.y;
        this.angle = this.parent.aimAngle + 180;
        this.burn = burn;
    }
}
exports.AcidSpitClient = AcidSpitClient;
//# sourceMappingURL=AcidSpitClient.js.map