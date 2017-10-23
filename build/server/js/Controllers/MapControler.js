Object.defineProperty(exports, "__esModule", { value: true });
const GameMap_1 = require("./../Map/GameMap");
const MapTile_1 = require("../Map/MapTile");
const enums_1 = require("../enums");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class MapController {
    constructor(param) {
    }
    static reloadMaps(maps) {
        MapController.maps = {};
        MapController.maps = maps;
    }
}
MapController.maps = {};
MapController.getMap = (map) => {
    for (let i in MapController.maps) {
        if (map == MapController.maps[i].name) {
            return MapController.maps[i];
        }
    }
};
MapController.loadMaps = () => {
    MapController.createMap("forest", 16, 20);
    MapController.createMap("forest2", 16, 20);
};
MapController.createMap = (name, size, seeds) => {
    let mapTiles;
    mapTiles = [];
    let seedPosition = [];
    let seedx = 0;
    let seedy = 0;
    let seedMaterial = [];
    let seedM = enums_1.TerrainMaterial.grass;
    for (let i = 0; i < seeds; i++) {
        seedx = enums_1.getRandomInt(1, size);
        seedy = enums_1.getRandomInt(1, size);
        seedM = enums_1.randomEnum(enums_1.TerrainMaterial);
        seedPosition[i] = new GeometryAndPhysics_1.Point(seedx, seedy);
        seedMaterial[i] = seedM;
    }
    let distance = 10000;
    let closestSeed = 0;
    for (let i = 0; i < size; i++) {
        mapTiles[i] = [];
        for (let j = 0; j < size; j++) {
            distance = 10000;
            closestSeed = 0;
            for (let k = 0; k < seeds; k++) {
                if (MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y) < distance) {
                    distance = MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y);
                    closestSeed = k;
                }
            }
            mapTiles[i][j] = new MapTile_1.MapTile(8, 8, seedMaterial[closestSeed]);
        }
    }
    MapController.maps[name] = (new GameMap_1.GameMap(name, mapTiles));
};
MapController.getTileDistance = (x, y, tx, ty) => {
    return Math.sqrt((x - tx) * (x - tx) + (y - ty) * (y - ty));
};
exports.MapController = MapController;
//# sourceMappingURL=MapControler.js.map