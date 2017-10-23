Object.defineProperty(exports, "__esModule", { value: true });
class GameMap {
    constructor(_name, mapTiles) {
        this._name = _name;
        this._width = 1280;
        this._height = 1280;
        this._size = 1;
        this.isPositionWall = (position) => {
            if (position.x < 0 || position.x >= this.width)
                return 1;
            if (position.y < 0 || position.y >= this.height)
                return 1;
            return 0;
        };
        this.mapTiles = [];
        this._size = mapTiles.length;
        for (let i = 0; i < mapTiles.length; i++) {
            this.mapTiles[i] = mapTiles[i].slice();
            for (let j = 0; j < mapTiles[i].length; j++) {
                this.mapTiles[i][j] = mapTiles[i][j];
            }
        }
        this._height = 8 * 32 * this._size;
        this._width = 8 * 32 * this._size;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get size() { return this._size; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map