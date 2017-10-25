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
MapController.updatePack = [];
MapController.getMap = (map) => {
    for (let i in MapController.maps) {
        if (map == MapController.maps[i].name) {
            return MapController.maps[i];
        }
    }
};
MapController.getMapPack = (map) => {
    for (let i in MapController.maps) {
        if (map == MapController.maps[i].name) {
            let gameMap = MapController.maps[i];
            let material = "";
            let sides = "";
            for (let i = 0; i < gameMap.size; i++) {
                for (let j = 0; j < gameMap.size; j++) {
                    material += gameMap.mapTiles[i][j].material + ",";
                    for (let k = 0; k < 4; k++) {
                        sides += gameMap.mapTiles[i][j].sides[k];
                        sides += (k < 3) ? "," : ";";
                    }
                }
            }
            return { material: material, name: MapController.maps[i].name, sides: sides };
        }
    }
};
MapController.loadMaps = () => {
    MapController.createMap("forest", 16, 20);
    MapController.createMap("forest2", 16, 20);
};
MapController.updateMap = (param) => {
    if (param !== undefined) {
        for (let i in MapController.maps) {
            if (param.name == MapController.maps[i].name) {
                let gameMap = MapController.maps[i];
                let str = param.material;
                let materialArr = str.split(",");
                let counter = 0;
                str = param.sides;
                let sidesArr = str.split(";");
                let smallsidesArr;
                for (let i = 0; i < gameMap.size; i++) {
                    for (let j = 0; j < gameMap.size; j++) {
                        gameMap.mapTiles[i][j].updateMaterial(materialArr[counter]);
                        str = sidesArr[counter];
                        smallsidesArr = str.split(",");
                        counter++;
                        for (let k = 0; k < 4; k++) {
                            gameMap.mapTiles[i][j].sides[k] = smallsidesArr[k];
                        }
                    }
                }
            }
        }
    }
};
MapController.createMap = (name, size, seeds) => {
    let mapTiles;
    mapTiles = [];
    let seedPosition = [];
    let seedx = 0;
    let seedy = 0;
    let seedMaterial = [];
    let seedM = enums_1.TerrainMaterial.dirt;
    let waterSeeds = Math.floor(seeds / 10);
    for (let i = 0; i < seeds - waterSeeds; i++) {
        seedx = enums_1.getRandomInt(1, size);
        seedy = enums_1.getRandomInt(1, size);
        seedM = enums_1.randomEnum(enums_1.TerrainMaterialWithoutWater);
        seedPosition[i] = new GeometryAndPhysics_1.Point(seedx, seedy);
        seedMaterial[i] = seedM;
    }
    for (let i = seeds - waterSeeds; i < seeds; i++) {
        seedx = enums_1.getRandomInt(1, size);
        seedy = enums_1.getRandomInt(1, size);
        seedM = enums_1.TerrainMaterial.water;
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
            if (j > 0) {
                if (mapTiles[i][j].material !== mapTiles[i][j - 1].material) {
                    mapTiles[i][j].convex = !mapTiles[i][j - 1].convex;
                }
                else {
                    mapTiles[i][j].convex = mapTiles[i][j - 1].convex;
                }
            }
            else {
                if (i > 0) {
                    if (mapTiles[i][j].material !== mapTiles[i - 1][j].material) {
                        mapTiles[i][j].convex = !mapTiles[i - 1][j].convex;
                    }
                    else {
                        mapTiles[i][j].convex = mapTiles[i - 1][j].convex;
                    }
                }
            }
            if (j > 0) {
                if (mapTiles[i][j].material !== mapTiles[i][j - 1].material) {
                    if (mapTiles[i][j - 1].convex) {
                        mapTiles[i][j].sides[enums_1.Orientation.left] = mapTiles[i][j - 1].material;
                    }
                    else {
                        mapTiles[i][j - 1].sides[enums_1.Orientation.right] = mapTiles[i][j].material;
                    }
                }
            }
            if (i > 0) {
                if (mapTiles[i][j].material !== mapTiles[i - 1][j].material) {
                    if (mapTiles[i - 1][j].convex) {
                        mapTiles[i][j].sides[enums_1.Orientation.up] = mapTiles[i - 1][j].material;
                    }
                    else {
                        mapTiles[i - 1][j].sides[enums_1.Orientation.down] = mapTiles[i][j].material;
                    }
                }
            }
        }
    }
    MapController.maps[name] = (new GameMap_1.GameMap(name, mapTiles));
};
MapController.getTileDistance = (x, y, tx, ty) => {
    return Math.sqrt((x - tx) * (x - tx) + (y - ty) * (y - ty));
};
exports.MapController = MapController;
//# sourceMappingURL=MapControler.js.map