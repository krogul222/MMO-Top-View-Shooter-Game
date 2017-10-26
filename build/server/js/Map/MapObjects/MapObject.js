Object.defineProperty(exports, "__esModule", { value: true });
const ObjectTile_1 = require("./ObjectTile");
class MapObject {
    constructor() {
        this.objectTiles = [];
        this.addObjectTile = (position, type) => {
            this.objectTiles.push(new ObjectTile_1.ObjectTile(position, type));
        };
    }
}
exports.MapObject = MapObject;
//# sourceMappingURL=MapObject.js.map