Object.defineProperty(exports, "__esModule", { value: true });
const PhysicsEntity_1 = require("./PhysicsEntity");
class PhysicsEngine {
    constructor() {
        this.moveableEntities = {};
        this.aliveEntities = {};
        this.allEntities = {};
        this.step = (elapsed) => {
            let entity;
            let gx = 0;
            let gy = 0;
            for (let i in this.moveableEntities) {
                entity = this.moveableEntities[i];
                switch (entity.type) {
                    case PhysicsEntity_1.PhysicsEntity.DYNAMIC:
                        entity.velocity.x += entity.acceleration.x * elapsed + gx;
                        entity.velocity.y += entity.acceleration.y * elapsed + gy;
                        entity.velocity.x += entity.velocity.x * elapsed;
                        entity.velocity.y += entity.velocity.y * elapsed;
                        break;
                    case PhysicsEntity_1.PhysicsEntity.KINEMATIC:
                        entity.velocity.x += entity.acceleration.x * elapsed;
                        entity.velocity.y += entity.acceleration.y * elapsed;
                        entity.velocity.x += entity.velocity.x * elapsed;
                        entity.velocity.y += entity.velocity.y * elapsed;
                        break;
                }
            }
        };
        this.detectCollisions = () => {
        };
        this.addEntity = (entity) => {
            if (entity !== undefined) {
                this.allEntities[entity.id] = entity;
                if (entity.moveable == true)
                    this.moveableEntities[entity.id] = entity;
                if (entity.alive == true)
                    this.aliveEntities[entity.id] = entity;
            }
        };
    }
}
exports.PhysicsEngine = PhysicsEngine;
//# sourceMappingURL=PhysicsEngine.js.map