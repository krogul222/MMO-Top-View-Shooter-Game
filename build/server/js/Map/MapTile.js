Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
class MapTile {
    constructor(_width, _height, material) {
        this._width = _width;
        this._height = _height;
        this.updateMaterial = (material) => {
            this._material = material;
        };
        this.isPositionWall = (position) => {
            let areaX = Math.floor(position.x / 32);
            let areaY = Math.floor(position.y / 32);
            console.log("AX = " + areaX + "   areaY = " + areaY);
            if (areaX < this._width && areaY < this._height) {
                console.log(this.grid[areaY][areaX]);
                return this.grid[areaY][areaX];
            }
            else {
                console.log("MAPTILE FAIL " + areaX + " " + areaY);
                return 0;
            }
        };
        this._material = material;
        this.grid = [];
        for (let i = 0; i < this._height; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this._width; j++) {
                this.grid[i][j] = (material != enums_1.TerrainMaterial.water) ? 0 : 2;
            }
        }
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}
exports.MapTile = MapTile;
//# sourceMappingURL=MapTile.js.map