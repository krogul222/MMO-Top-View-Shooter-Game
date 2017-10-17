Object.defineProperty(exports, "__esModule", { value: true });
class GameMap {
    constructor(_name, _width, _height) {
        this._name = _name;
        this._width = _width;
        this._height = _height;
        this.isPositionWall = (position) => {
            if (position.x < 0 || position.x >= this.width)
                return 1;
            if (position.y < 0 || position.y >= this.height)
                return 1;
            return 0;
        };
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map