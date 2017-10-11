Object.defineProperty(exports, "__esModule", { value: true });
class GameMap {
    constructor(_name, _width, _height) {
        this._name = _name;
        this._width = _width;
        this._height = _height;
        this.isPositionWall = (position) => {
            return 0;
        };
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map