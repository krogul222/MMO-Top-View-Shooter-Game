Object.defineProperty(exports, "__esModule", { value: true });
const MapObject_1 = require("./MapObject");
const GeometryAndPhysics_1 = require("./../../GeometryAndPhysics");
const enums_1 = require("../../enums");
class FlatMountain extends MapObject_1.MapObject {
    constructor(mountainLength) {
        super();
        this.stripe = [];
        this.isColliding = (mapTiles, position) => {
            for (let i = 0; i < (this.stripe.length); i++) {
                if (mapTiles[position.y][position.x + i].collisions) {
                    return true;
                }
            }
            return false;
        };
        this.stripe[0] = new GeometryAndPhysics_1.Point(0, 0);
        this.addObjectTile(this.stripe[0], enums_1.MapObjectType.FM_L);
        if (mountainLength > 2) {
            for (let i = 1, length = mountainLength - 1; i < length; i++) {
                this.stripe[i] = new GeometryAndPhysics_1.Point(i, 0);
                this.addObjectTile(this.stripe[i], enums_1.MapObjectType.FM_M);
            }
        }
        this.stripe[mountainLength - 1] = new GeometryAndPhysics_1.Point(mountainLength - 1, 0);
        this.addObjectTile(this.stripe[mountainLength - 1], enums_1.MapObjectType.FM_R);
    }
}
exports.FlatMountain = FlatMountain;
//# sourceMappingURL=FlatMountain.js.map