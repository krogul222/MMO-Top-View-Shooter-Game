Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const PlayerClient_1 = require("./Entities/PlayerClient");
const GeometryAndPhysics_1 = require("./../../server/js/GeometryAndPhysics");
const FireParticle_1 = require("./FireParticle");
class FireFlameClient {
    constructor(position, angle) {
        this.particles = [];
        this.angle = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.speed = 5;
        this.draw = () => {
            ctx.globalCompositeOperation = "lighter";
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
            ctx.globalCompositeOperation = "source-over";
        };
        this.update = (create) => {
            if (create) {
                for (let i = 0; i < 10; i++) {
                    let p = new FireParticle_1.FireParticle(60);
                    let oldpos = new GeometryAndPhysics_1.Point(PlayerClient_1.PlayerClient.list[game_1.selfId].position.x, PlayerClient_1.PlayerClient.list[game_1.selfId].position.y);
                    let angle = PlayerClient_1.PlayerClient.list[game_1.selfId].aimAngle + 180;
                    oldpos.x -= Math.cos((angle * Math.PI) / 180) * 50;
                    oldpos.y -= Math.sin((angle * Math.PI) / 180) * 50;
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
        this.position.x = position.x;
        this.position.y = position.y;
        this.angle = angle;
    }
}
exports.FireFlameClient = FireFlameClient;
//# sourceMappingURL=FireFlameClient.js.map