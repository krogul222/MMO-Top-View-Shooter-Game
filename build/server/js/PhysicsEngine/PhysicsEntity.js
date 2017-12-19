Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const GameController_1 = require("../Controllers/GameController");
class PhysicsEntity {
    constructor(param) {
        this._id = Math.random();
        this.Collision = {
            elastic: function (_restitution) {
                this._restitution = _restitution || .2;
            },
            displace: function () {
            }
        };
        this.updateBounds = () => {
            this._halfWidth = this._width * .5;
            this._halfHeight = this._height * .5;
        };
        this.getMidX = () => {
            return this._halfWidth + this.position.x;
        };
        this.getMidY = () => {
            return this._halfHeight + this.position.y;
        };
        this.getTop = () => {
            return this.position.y;
        };
        this.getLeft = () => {
            return this.position.x;
        };
        this.getRight = () => {
            return this.position.x + this._width;
        };
        this.getBottom = () => {
            return this.position.y + this._height;
        };
        this._type = (param.type !== undefined) ? param.type : PhysicsEntity.DYNAMIC;
        this._id = (param.id !== undefined) ? param.id : this._id;
        this.collision = (param.collisionName !== undefined) ? param.collisionName : PhysicsEntity.ELASTIC;
        this._width = (param.width !== undefined) ? param.width : 20;
        this._height = (param.height !== undefined) ? param.height : 20;
        this._alive = (param.alive !== undefined) ? param.alive : true;
        this._moveable = (param.moveable !== undefined) ? param.moveable : true;
        this._halfWidth = this._width * .5;
        this._halfHeight = this._height * .5;
        let collision = this.Collision[this.collision];
        collision.call(this);
        this._position = new GeometryAndPhysics_1.Point(0, 0);
        this._velocity = new GeometryAndPhysics_1.Velocity(0, 0);
        this._acceleration = new GeometryAndPhysics_1.Acceleration(0, 0);
        this.updateBounds();
        PhysicsEntity.fullList[this._id] = this;
        if (this.alive == true)
            PhysicsEntity.aliveList[this._id] = this;
        if (this.moveable == true)
            PhysicsEntity.moveableList[this._id] = this;
        if (param.game !== undefined) {
            if (GameController_1.GameController.list[param.game] !== undefined) {
                GameController_1.GameController.list[param.game].physicsEngine.addEntity(this);
            }
        }
    }
    get halfWidth() { return this._halfWidth; }
    get halfHeight() { return this._halfHeight; }
    get restitution() { return this._restitution; }
    get width() { return this.width; }
    get height() { return this.height; }
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    get type() { return this._type; }
    get alive() { return this._alive; }
    get moveable() { return this._moveable; }
    get id() { return this._id; }
}
PhysicsEntity.KINEMATIC = 'kinematic';
PhysicsEntity.DYNAMIC = 'dynamic';
PhysicsEntity.DISPLACE = 'displace';
PhysicsEntity.ELASTIC = 'elastic';
PhysicsEntity.fullList = {};
PhysicsEntity.moveableList = {};
PhysicsEntity.aliveList = {};
exports.PhysicsEntity = PhysicsEntity;
//# sourceMappingURL=PhysicsEntity.js.map