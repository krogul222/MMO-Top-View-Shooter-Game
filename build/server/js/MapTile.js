Object.defineProperty(exports, "__esModule", { value: true });
class MapTile {
    constructor(_name, _width, _height) {
        this._name = _name;
        this._width = _width;
        this._height = _height;
        if (_name == "forest") {
        }
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}
exports.MapTile = MapTile;
//# sourceMappingURL=MapTile.js.map