Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = require("./../../globalVariables");
const enums_1 = require("./../../enums");
const GeometryAndPhysics_1 = require("./../../GeometryAndPhysics");
const Enemy_1 = require("../../Entities/Enemy");
class Particle {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.size = 10;
        this.life = 0;
        this.maxLife = 10;
        this.toRemove = false;
        this.id = Math.random();
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.life++;
            if (this.life >= this.maxLife)
                this.toRemove = true;
            if (this.type == enums_1.ParticleType.fire) {
                for (let key in Enemy_1.Enemy.list) {
                    let enemy = Enemy_1.Enemy.list[key];
                    if (this.testCollision(enemy)) {
                        enemy.lifeAndBodyController.wasHit(0.03 * this.life / this.maxLife);
                    }
                }
            }
        };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this.position.x - (this.size / 4), this.position.y - (this.size / 4));
            let pos2 = new GeometryAndPhysics_1.Point(entity.position.x - (entity.width / 4), entity.position.y - (entity.height / 4));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this.size / 2, this.size / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity.width / 2, entity.height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                map: this.map,
                size: this.size,
                type: this.type,
                maxLife: this.maxLife
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                life: this.life
            };
        };
        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.type = (param.type !== undefined) ? param.type : enums_1.ParticleType.fire;
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        if (param.velocity !== undefined) {
            this.velocity.x = param.velocity.x;
            this.velocity.y = param.velocity.y;
        }
        this.map = (param.map !== undefined) ? param.map : 0;
        globalVariables_1.initPack.particle.push(this.getInitPack());
        Particle.list[this.id] = this;
    }
}
Particle.update = () => {
    let pack = [];
    for (let i in Particle.list) {
        let particle = Particle.list[i];
        particle.update();
        if (particle.toRemove) {
            delete Particle.list[i];
            globalVariables_1.removePack.particle.push({ id: particle.id });
        }
        else {
            pack.push(particle.getUpdatePack());
        }
    }
    return pack;
};
Particle.list = {};
exports.Particle = Particle;
//# sourceMappingURL=Particle.js.map