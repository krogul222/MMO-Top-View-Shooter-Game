Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const globalVariables_1 = require("../globalVariables");
const Constants_1 = require("../Constants");
class Entity {
    constructor(param) {
        this._position = new GeometryAndPhysics_1.Point(250, 250);
        this._width = 32;
        this._height = 32;
        this._speed = new GeometryAndPhysics_1.Velocity(0, 0);
        this._id = Math.random();
        this._map = "forest";
        this._type = "entity";
        this._img = "";
        this._game = -1;
        this.updatePosition = () => this._position.changePosition(this._speed.x * Constants_1.GAME_SPEED_TOOLINGFACTOR, this._speed.y * Constants_1.GAME_SPEED_TOOLINGFACTOR);
        this.update = () => this.updatePosition();
        this.getDistance = (entity) => {
            if (entity == null)
                return 10000000;
            return this._position.getDistance(entity.position);
        };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this._position.x - (this._width / 4), this._position.y - (this._height / 4));
            let pos2 = new GeometryAndPhysics_1.Point(entity._position.x - (entity._width / 4), entity._position.y - (entity._height / 4));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this._width / 2, this._height / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity._width / 2, entity._height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.setSpdX = (speedX) => { this._speed.x = speedX; };
        this.setSpdY = (speedY) => { this._speed.y = speedY; };
        if (param) {
            this._position = param.position ? param.position : this._position;
            this._width = param.width ? param.width : this._width;
            this._height = param.height ? param.height : this._height;
            this._speed = param.speed ? param.speed : this._speed;
            this._id = param.id ? param.id : this._id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this._img = param.img ? param.img : this._img;
            if (param.game !== undefined) {
                this._game = param.game;
            }
        }
    }
    get type() { return this._type; }
    get position() { return this._position; }
    get width() { return this._width; }
    get height() { return this._height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    get id() { return this._id; }
    get img() { return this._img; }
    get game() { return this._game; }
    setPosition(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}
Entity.getFrameUpdateData = () => { return { removePack: globalVariables_1.removePack, initPack: globalVariables_1.initPack }; };
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map