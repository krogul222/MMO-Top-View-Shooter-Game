Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./../Constants");
const enums_1 = require("../enums");
class MapTile {
    constructor(_width, _height, material) {
        this._width = _width;
        this._height = _height;
        this.sides = [];
        this.corners = [];
        this.objects = [];
        this.convex = true;
        this.updateMaterial = (material) => {
            this._material = material;
        };
        this.isPositionWall = (position) => {
            let areaX = Math.floor(position.x / 32);
            let areaY = Math.floor(position.y / 32);
            if (areaX < this._width && areaY < this._height) {
                return this.grid[areaY][areaX];
            }
            else {
                return 0;
            }
        };
        this.addObject = (type, collisions) => {
            this.objects.push(type);
            if (collisions == true) {
                this.updateCollisions(type);
            }
        };
        this.updateCollisions = (type) => {
            let gridUpdate = Constants_1.mapObjectCollisions[type];
            console.log("COLLISIONS: " + Constants_1.mapObjectCollisions[type]);
            for (let i = 0; i < this._height; i++) {
                for (let j = 0; j < this._width; j++) {
                    this.grid[i][j] = gridUpdate[i * Constants_1.TILE_SIZE + j];
                }
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
        for (let i = 0; i < 4; i++) {
            this.sides[i] = 0;
            this.corners[i] = 0;
        }
        this.objects.push(0);
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}
exports.MapTile = MapTile;
//# sourceMappingURL=MapTile.js.map