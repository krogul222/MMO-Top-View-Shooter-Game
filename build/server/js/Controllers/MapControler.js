Object.defineProperty(exports, "__esModule", { value: true });
const SpawnObjectMapChecker_1 = require("./../Map/SpawnObjectMapChecker");
const GroundRing_1 = require("./../Map/MapObjects/GroundRing");
const GameMap_1 = require("./../Map/GameMap");
const MapTile_1 = require("../Map/MapTile");
const enums_1 = require("../enums");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
const Constants_1 = require("../Constants");
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
            let objects = "";
            for (let i = 0; i < gameMap.size; i++) {
                for (let j = 0; j < gameMap.size; j++) {
                    material += gameMap.mapTiles[i][j].material + ",";
                    for (let k = 0; k < 4; k++) {
                        sides += gameMap.mapTiles[i][j].sides[k];
                        sides += (k < 3) ? "," : ";";
                    }
                    for (let k = 0, length = gameMap.mapTiles[i][j].objects.length; k < length; k++) {
                        objects += gameMap.mapTiles[i][j].objects[k];
                        objects += (k < length - 1) ? "," : ";";
                    }
                }
            }
            return { material: material, name: MapController.maps[i].name, sides: sides, objects: objects };
        }
    }
};
MapController.loadMaps = () => {
    console.log("Pierwsza Map");
    MapController.createMap("forest", 16, 20);
};
MapController.updateMap = (param) => {
    if (param !== undefined) {
        console.log("MAPY:");
        for (let i in MapController.maps) {
            console.log(MapController.maps[i].name + " ");
            if (param.name == MapController.maps[i].name) {
                let gameMap = MapController.maps[i];
                let str = param.material;
                let materialArr = str.split(",");
                let counter = 0;
                str = param.sides;
                let sidesArr = str.split(";");
                let smallsidesArr;
                str = param.objects;
                let objectsArr = str.split(";");
                let smallobjectsArr;
                console.log("MAPA OBJECTS: " + param.objects);
                for (let i = 0; i < gameMap.size; i++) {
                    for (let j = 0; j < gameMap.size; j++) {
                        gameMap.mapTiles[i][j].objects.length = 0;
                        gameMap.mapTiles[i][j].updateMaterial(materialArr[counter]);
                        str = sidesArr[counter];
                        smallsidesArr = str.split(",");
                        str = objectsArr[counter];
                        smallobjectsArr = str.split(",");
                        counter++;
                        for (let k = 0; k < 4; k++) {
                            gameMap.mapTiles[i][j].sides[k] = smallsidesArr[k];
                        }
                        for (let k = 0; k < smallobjectsArr.length; k++) {
                            gameMap.mapTiles[i][j].addObject(smallobjectsArr[k], false);
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
                if (MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x) < distance) {
                    distance = MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x);
                    closestSeed = k;
                }
            }
            mapTiles[i][j] = new MapTile_1.MapTile(Constants_1.TILE_SIZE, Constants_1.TILE_SIZE, seedMaterial[closestSeed]);
            if (j > 0) {
                if (mapTiles[i][j].material !== mapTiles[i][j - 1].material) {
                    if (mapTiles[i][j - 1].material < mapTiles[i][j].material) {
                        mapTiles[i][j].sides[enums_1.Orientation.left] = mapTiles[i][j - 1].material;
                    }
                    else {
                        mapTiles[i][j - 1].sides[enums_1.Orientation.right] = mapTiles[i][j].material;
                    }
                }
            }
            if (i > 0) {
                if (mapTiles[i][j].material !== mapTiles[i - 1][j].material) {
                    if (mapTiles[i - 1][j].material < mapTiles[i][j].material) {
                        mapTiles[i][j].sides[enums_1.Orientation.up] = mapTiles[i - 1][j].material;
                    }
                    else {
                        mapTiles[i - 1][j].sides[enums_1.Orientation.down] = mapTiles[i][j].material;
                    }
                }
            }
        }
    }
    MapController.generateGroundRings(mapTiles, seedMaterial, seedPosition);
    MapController.maps[name] = (new GameMap_1.GameMap(name, mapTiles));
};
MapController.getTileDistance = (x, y, tx, ty) => {
    return Math.sqrt((x - tx) * (x - tx) + (y - ty) * (y - ty));
};
MapController.loadObject = (mapObject, mapTiles, position) => {
    for (let i in mapObject.objectTiles) {
        let object = mapObject.objectTiles[i];
        mapTiles[position.y + object.position.y][position.x + object.position.x].addObject(object.type, true);
    }
};
MapController.generateGroundRings = (mapTiles, seedMaterial, seedPosition) => {
    let grCheckers = [];
    grCheckers[2] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(3, 3));
    grCheckers[1] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(4, 3));
    grCheckers[0] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(5, 3));
    let grSpawnPosition;
    let gr;
    let enter;
    let seeds = seedMaterial.length;
    for (let k = 0; k < seeds; k++) {
        if (seedMaterial[k] == enums_1.TerrainMaterial.dirt) {
            for (let i = 0; i < grCheckers.length; i++) {
                grSpawnPosition = grCheckers[i].search(seedPosition[k]);
                console.log("Pozycja: " + grSpawnPosition.x + " " + grSpawnPosition.y);
                if (grSpawnPosition.x > -1 && grSpawnPosition.y > -1) {
                    enter = enums_1.randomEnum(enums_1.Orientation);
                    gr = new GroundRing_1.GroundRing(grCheckers[i].size.x, grCheckers[i].size.y, enter);
                    if (!gr.isColliding(mapTiles, new GeometryAndPhysics_1.Point(grSpawnPosition.x, grSpawnPosition.y))) {
                        MapController.loadObject(gr, mapTiles, new GeometryAndPhysics_1.Point(grSpawnPosition.x, grSpawnPosition.y));
                    }
                }
            }
        }
    }
};
exports.MapController = MapController;
//# sourceMappingURL=MapControler.js.map