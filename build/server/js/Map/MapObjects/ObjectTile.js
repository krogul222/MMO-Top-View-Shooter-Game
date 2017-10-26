Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../../Constants");
class ObjectTile {
    constructor(position, type) {
        this.position = position;
        this.type = type;
        this.collisions = [];
        for (let i = 0; i < Constants_1.TILE_SIZE; i++) {
            this.collisions[i] = [];
            for (let j = 0; j < Constants_1.TILE_SIZE; j++) {
                this.collisions[i][j] = 0;
            }
        }
    }
}
exports.ObjectTile = ObjectTile;
//# sourceMappingURL=ObjectTile.js.map