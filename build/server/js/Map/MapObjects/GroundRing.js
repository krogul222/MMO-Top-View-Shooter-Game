Object.defineProperty(exports, "__esModule", { value: true });
const MapObject_1 = require("./MapObject");
const GeometryAndPhysics_1 = require("./../../GeometryAndPhysics");
const enums_1 = require("../../enums");
class GroundRing extends MapObject_1.MapObject {
    constructor(width, height, enterOrientation) {
        super();
        this.corners = [];
        this.sidesU = [];
        this.sidesD = [];
        this.sidesL = [];
        this.sidesR = [];
        this.isColliding = (mapTiles, position) => {
            for (let i = 0; i < (this.sidesU.length + 2); i++) {
                if (mapTiles[position.y][position.x + i].collisions || mapTiles[position.y + this.sidesR.length + 1][position.x + i].collisions) {
                    return true;
                }
            }
            for (let i = 0; i < (this.sidesR.length + 2); i++) {
                if (mapTiles[position.y + i][position.x].collisions || mapTiles[position.y + i][position.x + this.sidesD.length + 1].collisions) {
                    return true;
                }
            }
            return false;
        };
        if (width > 2 && height > 2) {
            this.corners[enums_1.CornerOrientation.LU] = new GeometryAndPhysics_1.Point(0, 0);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.LU], enums_1.MapObjectType.GR_LU);
            this.corners[enums_1.CornerOrientation.LD] = new GeometryAndPhysics_1.Point(0, height - 1);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.LD], enums_1.MapObjectType.GR_LD);
            this.corners[enums_1.CornerOrientation.RU] = new GeometryAndPhysics_1.Point(width - 1, 0);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.RU], enums_1.MapObjectType.GR_RU);
            this.corners[enums_1.CornerOrientation.RD] = new GeometryAndPhysics_1.Point(width - 1, height - 1);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.RD], enums_1.MapObjectType.GR_RD);
            for (let i = 0, length = width - 2; i < length; i++) {
                this.sidesU[i] = new GeometryAndPhysics_1.Point(1 + i, 0);
                this.addObjectTile(this.sidesU[i], enums_1.MapObjectType.GR_U);
                this.sidesD[i] = new GeometryAndPhysics_1.Point(1 + i, height - 1);
                this.addObjectTile(this.sidesD[i], enums_1.MapObjectType.GR_D);
            }
            for (let i = 0, length = height - 2; i < length; i++) {
                this.sidesL[i] = new GeometryAndPhysics_1.Point(0, 1 + i);
                this.addObjectTile(this.sidesL[i], enums_1.MapObjectType.GR_L);
                this.sidesR[i] = new GeometryAndPhysics_1.Point(width - 1, 1 + i);
                this.addObjectTile(this.sidesR[i], enums_1.MapObjectType.GR_R);
            }
            this.enterOrientation = enterOrientation;
            let x = enums_1.getRandomInt(1, width - 2);
            let y = enums_1.getRandomInt(1, height - 2);
            if (enterOrientation == enums_1.Orientation.down) {
                y = height - 1;
            }
            else if (enterOrientation == enums_1.Orientation.up) {
                y = 0;
            }
            if (enterOrientation == enums_1.Orientation.left) {
                x = 0;
            }
            else if (enterOrientation == enums_1.Orientation.right) {
                x = width - 1;
            }
            this.enter = new GeometryAndPhysics_1.Point(x, y);
            if (enterOrientation == enums_1.Orientation.down) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_ED);
            }
            else if (enterOrientation == enums_1.Orientation.up) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_EU);
            }
            else if (enterOrientation == enums_1.Orientation.right) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_ER);
            }
            else if (enterOrientation == enums_1.Orientation.left) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_EL);
            }
        }
    }
}
exports.GroundRing = GroundRing;
//# sourceMappingURL=GroundRing.js.map