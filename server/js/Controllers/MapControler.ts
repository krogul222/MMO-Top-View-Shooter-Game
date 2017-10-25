import { GameMap } from './../Map/GameMap';
import { MapTile } from '../Map/MapTile';
import { TerrainMaterial, getRandomInt, randomEnum, TerrainMaterialWithoutWater, Orientation, CornerOrientation } from '../enums';
import { Point } from '../GeometryAndPhysics';

export class MapController {
    static maps = {};
    static updatePack: any[] = [];
    static getMap = (map) => { 
        for (let i in MapController.maps) {
            if(map == MapController.maps[i].name) {
                return MapController.maps[i]; 
            }
        }
        
    }

    static getMapPack = (map) => {
        for (let i in MapController.maps) {
            if(map == MapController.maps[i].name) {
                
                let gameMap: GameMap = MapController.maps[i];

                let material: string ="";
                let sides: string = "";

                for(let i = 0; i < gameMap.size; i++){
                    for(let j = 0; j < gameMap.size; j++){
                        material +=gameMap.mapTiles[i][j].material+",";

                        for(let k = 0; k < 4; k++){
                            sides +=gameMap.mapTiles[i][j].sides[k];
                            sides += (k<3) ? "," : ";";
                        }
                    }
                }

                
                return { material: material, name: MapController.maps[i].name, sides: sides}

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


    static updateMap = (param) => {
        if(param !== undefined){
            for (let i in MapController.maps) {
               // console.log("UPDATE2");
                if(param.name == MapController.maps[i].name){
                    let gameMap: GameMap = MapController.maps[i];
                    
                    let str: string = param.material;
                    let materialArr = str.split(",");
                    let counter = 0;
                    str = param.sides;
                    let sidesArr = str.split(";");
                    let smallsidesArr;

                   // console.log("MAPA UPDATE: ")
                    for(let i = 0; i < gameMap.size; i++){
                        for(let j = 0; j < gameMap.size; j++){
                            gameMap.mapTiles[i][j].updateMaterial(materialArr[counter]);
                            str = sidesArr[counter];
                            smallsidesArr = str.split(",");
                            counter++;
                            for(let k = 0; k < 4; k++){
                                gameMap.mapTiles[i][j].sides[k] = smallsidesArr[k];
                            }
                           // console.log(gameMap.mapTiles[i][j].material+", ");
                        }
                    }
                }
            }
        }
    }

    static createMap = (name: string, size: number, seeds: number) => {
        let mapTiles: MapTile[][];
        
        mapTiles = [];
        let seedPosition: Point[] = [];
        let seedx = 0;
        let seedy = 0;
        let seedMaterial: TerrainMaterial[] = [];
        let seedM: TerrainMaterial = TerrainMaterial.dirt;

        let waterSeeds = Math.floor(seeds/10);

        for(let i = 0; i < seeds-waterSeeds; i++){
            seedx = getRandomInt(1, size);
            seedy = getRandomInt(1, size);
            seedM = randomEnum(TerrainMaterialWithoutWater);
            seedPosition[i] = new Point(seedx, seedy);
            seedMaterial[i] = seedM;
        }
        
        for(let i = seeds-waterSeeds; i < seeds; i++){
            seedx = getRandomInt(1, size);
            seedy = getRandomInt(1, size);
            seedM = TerrainMaterial.water;
            seedPosition[i] = new Point(seedx, seedy);
            seedMaterial[i] = seedM;
        }

        let distance = 10000;
        let closestSeed = 0;

       // let checkLeftNeighbour = true; 

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
                
            
               if(j > 0){
                    if(mapTiles[i][j].material !== mapTiles[i][j-1].material){
                        mapTiles[i][j].convex = !mapTiles[i][j-1].convex;
                    } else{
                        mapTiles[i][j].convex = mapTiles[i][j-1].convex;
                    }
                } else{
                    if(i > 0) {
                        if(mapTiles[i][j].material !== mapTiles[i-1][j].material){
                            mapTiles[i][j].convex = !mapTiles[i-1][j].convex;
                        } else{
                            mapTiles[i][j].convex = mapTiles[i-1][j].convex;
                        }
                    }
                }

                if(j > 0 ){
                    if(mapTiles[i][j].material !== mapTiles[i][j-1].material){
                        if(mapTiles[i][j-1].convex){
                            mapTiles[i][j].sides[Orientation.left] = mapTiles[i][j-1].material;
                        } else{
                            mapTiles[i][j-1].sides[Orientation.right] = mapTiles[i][j].material;
                        }
                    }
                }

                if(i > 0 ){
                    if(mapTiles[i][j].material !== mapTiles[i-1][j].material){
                        if(mapTiles[i-1][j].convex){
                            mapTiles[i][j].sides[Orientation.up] = mapTiles[i-1][j].material;
                        } else{
                            mapTiles[i-1][j].sides[Orientation.down] = mapTiles[i][j].material;
                        }
                    }
                }
            }
        }

        /*
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                
                if(i > 0 && j > 0){
                    if(mapTiles[i][j-1].sides[Orientation.up] == mapTiles[i-1][j].sides[Orientation.left]){
                        mapTiles[i][j].corners[CornerOrientation.LU] = mapTiles[i][j-1].sides[Orientation.up];
                    }
                }
                if(i > 0 && j < (size-1)){
                    if(mapTiles[i][j+1].sides[Orientation.up] == mapTiles[i-1][j].sides[Orientation.right]){
                        mapTiles[i][j].corners[CornerOrientation.RU] = mapTiles[i][j+1].sides[Orientation.up];
                    }
                }

                if(i < (size-1) && j < (size-1)){
                    if(mapTiles[i][j+1].sides[Orientation.down] == mapTiles[i+1][j].sides[Orientation.right]){
                        mapTiles[i][j].corners[CornerOrientation.RD] = mapTiles[i][j+1].sides[Orientation.down];
                    }
                }


                if(i < (size-1) && j > 0){
                    if(mapTiles[i][j-1].sides[Orientation.down] == mapTiles[i+1][j].sides[Orientation.left]){
                        mapTiles[i][j].corners[CornerOrientation.LD] = mapTiles[i+1][j].sides[Orientation.left];
                    }
                }
                
            }
        }*/

        MapController.maps[name] = (new GameMap(name, mapTiles));
    }

    static getTileDistance = (x,y, tx, ty) =>{
        return Math.sqrt((x-tx)*(x-tx)+(y-ty)*(y-ty));
    }
    
}