Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
class SpawnObjectMapChecker {
    constructor(mapTiles, desiredTerrain, size) {
        this.search = (start, maxIterations = 20) => {
            let p = new GeometryAndPhysics_1.Point(start.x, start.y);
            let iterations = 0;
            let dPosition;
            while (!this.loadCheckerArray(p)) {
                if (iterations >= maxIterations) {
                    p.updatePosition(-1, -1);
                    break;
                }
                dPosition = this.moveCheckerArray();
                p.x += dPosition.x;
                p.y += dPosition.y;
                iterations++;
            }
            console.log("ITERATIONS " + iterations);
            return p;
        };
        this.loadCheckerArray = (p) => {
            let end = true;
            for (let i = 0; i < this.checkerArray.length; i++) {
                for (let j = 0; j < this.checkerArray[0].length; j++) {
                    if (this.pointInMap(p.x + j, p.y + i)) {
                        this.checkerArray[i][j] = this.map[p.y + i][p.x + j].material;
                        if (this.checkerArray[i][j] !== this.desiredTerrain) {
                            end = false;
                        }
                    }
                    else {
                        this.checkerArray[i][j] = -1;
                        end = false;
                    }
                }
            }
            return end;
        };
        this.pointInMap = (x, y) => {
            if (x >= 0 && x < this.map[0].length && y >= 0 && y < this.map.length) {
                return true;
            }
            else {
                return false;
            }
        };
        this.moveCheckerArray = () => {
            let leftOrUp = 0;
            let rightOrDown = 0;
            let deltaPosition = new GeometryAndPhysics_1.Point(0, 0);
            for (let i = 0; i < this.checkerArray.length; i++) {
                if (this.checkerArray[i][this.size.x - 1] == this.desiredTerrain) {
                    rightOrDown++;
                }
                if (this.checkerArray[i][0] == this.desiredTerrain) {
                    leftOrUp++;
                }
                if (rightOrDown > leftOrUp) {
                    deltaPosition.x = 1;
                }
                else if (leftOrUp > rightOrDown) {
                    deltaPosition.x = -1;
                }
                else {
                    if (this.checkerArray[0][this.size.x - 1] == -1) {
                        deltaPosition.x = -1;
                    }
                    else if (this.checkerArray[0][0] == -1) {
                        deltaPosition.x = 1;
                    }
                }
            }
            leftOrUp = 0;
            rightOrDown = 0;
            for (let j = 0; j < this.checkerArray[0].length; j++) {
                if (this.checkerArray[this.size.y - 1][j] == this.desiredTerrain) {
                    rightOrDown++;
                }
                if (this.checkerArray[0][j] == this.desiredTerrain) {
                    leftOrUp++;
                }
                if (rightOrDown > leftOrUp) {
                    deltaPosition.y = 1;
                }
                else if (leftOrUp > rightOrDown) {
                    deltaPosition.y = -1;
                }
                else {
                    if (this.checkerArray[this.size.y - 1][0] == -1) {
                        deltaPosition.y = -1;
                    }
                    else if (this.checkerArray[0][0] == -1) {
                        deltaPosition.y = 1;
                    }
                }
            }
            return deltaPosition;
        };
        this.desiredTerrain = desiredTerrain;
        this.checkerArray = [];
        this.size = size;
        for (let i = 0; i < size.y; i++) {
            this.checkerArray[i] = [];
            for (let j = 0; j < size.x; j++) {
                this.checkerArray[i][j] = -1;
            }
        }
        this.map = mapTiles;
    }
}
exports.SpawnObjectMapChecker = SpawnObjectMapChecker;
//# sourceMappingURL=SpawnObjectMapChecker.js.map