Object.defineProperty(exports, "__esModule", { value: true });
const GameMap_1 = require("./GameMap");
class MapController {
    constructor(param) {
        this.maps = [];
        this.getMap = (map) => {
            for (let i = 0; i < this.maps.length; i++) {
                if (map == this.maps[i].name) {
                    return this.maps[i];
                }
            }
        };
        this.maps.push(new GameMap_1.GameMap("forest", 1280, 1280));
    }
}
exports.MapController = MapController;
//# sourceMappingURL=MapControler.js.map