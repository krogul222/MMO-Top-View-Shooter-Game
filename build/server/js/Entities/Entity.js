Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const globalVariables_1 = require("../globalVariables");
class Entity {
    constructor(param) {
        this._position = new GeometryAndPhysics_1.Point(250, 250);
        this._size = new GeometryAndPhysics_1.Size(32, 32);
        this._speed = new GeometryAndPhysics_1.Velocity(0, 0);
        this._id = Math.random();
        this._map = "forest";
        this._type = "entity";
        this._img = "";
        this.updatePosition = () => this._position.changePosition(this._speed.x, this._speed.y);
        this.update = () => this.updatePosition();
        this.getDistance = (entity) => { return this._position.getDistance(entity.position); };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this._position.x + (this._size.width / 2), this._position.y + (this._size.height / 2));
            let pos2 = new GeometryAndPhysics_1.Point(entity._position.x + (entity._size.width / 2), entity._position.y + (entity._size.height / 2));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this._size.width / 2, this._size.height / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity._size.width / 2, entity._size.height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.setSpdX = (speedX) => { this._speed.x = speedX; };
        this.setSpdY = (speedY) => { this._speed.y = speedY; };
        if (param) {
            this._position = param.position ? param.position : this._position;
            this._size = param.size ? param.size : this._size;
            this._speed = param.speed ? param.speed : this._speed;
            this._size = param.size ? param.size : this._size;
            this._id = param.id ? param.id : this._id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this._img = param.img ? param.img : this._img;
        }
    }
    get type() { return this._type; }
    get position() { return this._position; }
    get width() { return this._size.width; }
    get height() { return this._size.height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    get id() { return this._id; }
    get img() { return this._img; }
    setPosition(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}
Entity.getFrameUpdateData = () => { return { removePack: globalVariables_1.removePack, initPack: globalVariables_1.initPack }; };
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map