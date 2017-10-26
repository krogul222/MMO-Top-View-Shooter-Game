Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
const Constants_1 = require("../Constants");
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
            let tileX = Math.floor(position.x / (Constants_1.TILE_SIZE * 32));
            let tileY = Math.floor(position.y / (Constants_1.TILE_SIZE * 32));
            let inTileX = position.x - tileX * Constants_1.TILE_SIZE * 32;
            let inTileY = position.y - tileY * Constants_1.TILE_SIZE * 32;
            if (tileX < this._size && tileY < this._size)
                return this.mapTiles[tileY][tileX].isPositionWall(new GeometryAndPhysics_1.Point(inTileX, inTileY));
            else {
                return 0;
            }
        };
        this.mapTiles = [];
        this._size = mapTiles.length;
        for (let i = 0; i < mapTiles.length; i++) {
            this.mapTiles[i] = mapTiles[i].slice();
            for (let j = 0; j < mapTiles[i].length; j++) {
                this.mapTiles[i][j] = mapTiles[i][j];
            }
        }
        this._height = Constants_1.TILE_SIZE * 32 * this._size;
        this._width = Constants_1.TILE_SIZE * 32 * this._size;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get size() { return this._size; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map