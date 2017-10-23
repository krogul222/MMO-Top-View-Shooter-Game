import { GameMap } from './../Map/GameMap';
import { MapTile } from '../Map/MapTile';
import { TerrainMaterial, getRandomInt, randomEnum } from '../enums';
import { Point } from '../GeometryAndPhysics';

export class MapController {
    static maps = {};

    static getMap = (map) => { 
        for (let i in MapController.maps) {
            if(map == MapController.maps[i].name) {
                return MapController.maps[i]; 
            }
        }
        
    }

    constructor(param) {
        //this.maps.push(new GameMap("forest", 1280, 1280));

    }

    static loadMaps = () => {
        MapController.createMap("forest", 16,20);
        MapController.createMap("forest2", 16,20);
    }

    static reloadMaps(maps){
        MapController.maps = {};
        MapController.maps = maps;
    }

    static createMap = (name: string, size: number, seeds: number) => {
        let mapTiles: MapTile[][];
        
        mapTiles = [];
        let seedPosition: Point[] = [];
        let seedx = 0;
        let seedy = 0;
        let seedMaterial: TerrainMaterial[] = [];
        let seedM: TerrainMaterial = TerrainMaterial.grass;

        for(let i = 0; i < seeds; i++){
            seedx = getRandomInt(1, size);
            seedy = getRandomInt(1, size);
            seedM = randomEnum(TerrainMaterial);
            seedPosition[i] = new Point(seedx, seedy);
            seedMaterial[i] = seedM;
        }
        
        let distance = 10000;
        let closestSeed = 0;

        for(let i = 0; i < size; i++){
            mapTiles[i] = [];
            for(let j = 0; j < size; j++){
                distance = 10000;
                closestSeed = 0;
                for(let k = 0; k < seeds; k++){
                    if(MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y) < distance){
                        distance = MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y);
                        closestSeed = k;
                    }
                }

                mapTiles[i][j] = new MapTile(8, 8, seedMaterial[closestSeed]);
            }
        }

        MapController.maps[name] = (new GameMap(name, mapTiles));
    }

    static getTileDistance = (x,y, tx, ty) =>{
        return Math.sqrt((x-tx)*(x-tx)+(y-ty)*(y-ty));
    }
    
}