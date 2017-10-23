Object.defineProperty(exports, "__esModule", { value: true });
class MapTile {
    constructor(_width, _height, material) {
        this._width = _width;
        this._height = _height;
        this._material = material;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}
exports.MapTile = MapTile;
//# sourceMappingURL=MapTile.js.map