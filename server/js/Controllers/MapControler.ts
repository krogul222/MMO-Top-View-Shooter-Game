import { FlatMountain } from './../Map/MapObjects/FlatMountain';
import { SpawnObjectMapChecker } from './../Map/SpawnObjectMapChecker';
import { GroundRing } from './../Map/MapObjects/GroundRing';
import { ObjectTile } from './../Map/MapObjects/ObjectTile';
import { MapObject } from './../Map/MapObjects/MapObject';
import { GameMap } from './../Map/GameMap';
import { MapTile } from '../Map/MapTile';
import { TerrainMaterial, getRandomInt, randomEnum, TerrainMaterialWithoutWater, Orientation, CornerOrientation, MapObjectType } from '../enums';
import { Point } from '../GeometryAndPhysics';
import { TILE_SIZE } from '../Constants';
import { Enemy } from '../Entities/Enemy';

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
                let objects: string = "";

                for(let i = 0; i < gameMap.size; i++){
                    for(let j = 0; j < gameMap.size; j++){
                        material +=gameMap.mapTiles[i][j].material+",";

                        for(let k = 0; k < 4; k++){
                            sides +=gameMap.mapTiles[i][j].sides[k];
                            sides += (k<3) ? "," : ";";
                        }

                        for(let k = 0, length = gameMap.mapTiles[i][j].objects.length; k < length; k++){
                            objects +=gameMap.mapTiles[i][j].objects[k];
                            objects += (k < length-1) ? "," : ";";
                        }

                    }
                }

                
                return { material: material, name: MapController.maps[i].name, sides: sides, objects: objects, size: gameMap.size}

            }
        }
    }

    constructor(param) {
        //this.maps.push(new GameMap("forest", 1280, 1280));

    }

    static loadMaps = () => {
        console.log("Pierwsza Map");
        MapController.createMap("forest", 16,20);
      //  console.log("Druga Map");
     //   MapController.createMap("forest2", 16,20);
    }

    static reloadMaps(maps){
        MapController.maps = {};
        MapController.maps = maps;
    }


    static updateMap = (param) => {
        if(param !== undefined){
            console.log("MAPY:");
            for (let i in MapController.maps) {
                console.log(MapController.maps[i].name+" ");
                if(param.name == MapController.maps[i].name){
                    let gameMap: GameMap = MapController.maps[i];
                    
                    let str: string = param.material;
                    let materialArr = str.split(",");
                    let counter = 0;

                    str = param.sides;
                    let sidesArr = str.split(";");
                    let smallsidesArr;


                    str = param.objects;
                    let objectsArr = str.split(";");
                    let smallobjectsArr;

                    console.log("MAPA OBJECTS: "+param.objects);
                    
                    for(let i = 0; i < gameMap.size; i++){
                        for(let j = 0; j < gameMap.size; j++){
                            gameMap.mapTiles[i][j].objects.length = 0;
                            gameMap.mapTiles[i][j].updateMaterial(materialArr[counter]);
                            str = sidesArr[counter];
                            smallsidesArr = str.split(",");
                            str = objectsArr[counter];
                            smallobjectsArr = str.split(",");
                            counter++;
                            for(let k = 0; k < 4; k++){
                                gameMap.mapTiles[i][j].sides[k] = smallsidesArr[k];
                            }

                            for(let k = 0; k < smallobjectsArr.length; k++){
                                gameMap.mapTiles[i][j].addObject(smallobjectsArr[k], false);
                            }
                           // console.log(gameMap.mapTiles[i][j].material+", ");
                        }
                    }
                }
            }
        }
    }

    static createMap = (name: string, size: number, seeds: number, water: number = 10) => {
        let mapTiles: MapTile[][];
        
        mapTiles = [];
        let seedPosition: Point[] = [];
        let seedx = 0;
        let seedy = 0;
        let seedMaterial: TerrainMaterial[] = [];
        let seedM: TerrainMaterial = TerrainMaterial.dirt;

        let waterSeeds = Math.floor(seeds*water/100);

        for(let i = 0; i < seeds-waterSeeds; i++){
            seedx = getRandomInt(1, size);
            seedy = getRandomInt(1, size);
            seedM = randomEnum(TerrainMaterialWithoutWater);
          //  seedM = TerrainMaterial.dirt;
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
                    if(MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x) < distance){
                        distance = MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x);
                        closestSeed = k;
                    }
                }

                mapTiles[i][j] = new MapTile(TILE_SIZE, TILE_SIZE, seedMaterial[closestSeed]);


                if(j > 0 ){
                    if(mapTiles[i][j].material !== mapTiles[i][j-1].material){
                        if(mapTiles[i][j-1].material< mapTiles[i][j].material){
                            mapTiles[i][j].sides[Orientation.left] = mapTiles[i][j-1].material;
                        } else{
                            mapTiles[i][j-1].sides[Orientation.right] = mapTiles[i][j].material;
                        }
                    }
                }

                if(i > 0 ){
                    if(mapTiles[i][j].material !== mapTiles[i-1][j].material){
                        if(mapTiles[i-1][j].material< mapTiles[i][j].material){
                            mapTiles[i][j].sides[Orientation.up] = mapTiles[i-1][j].material;
                        } else{
                            mapTiles[i-1][j].sides[Orientation.down] = mapTiles[i][j].material;
                        }
                    }
                }
            }
        }

        MapController.generateGroundRings(mapTiles, seedMaterial, seedPosition);

        MapController.generateBasicObject(MapObjectType.SS, TerrainMaterial.darkdirt ,mapTiles, seedMaterial, seedPosition);
        


       // MapController.generateSolidStones(mapTiles, seedMaterial, seedPosition);
        MapController.generateBasicObject(MapObjectType.RO, TerrainMaterial.stone ,mapTiles, seedMaterial, seedPosition);
        MapController.generateFlatMountains(mapTiles, seedMaterial, seedPosition, TerrainMaterial.darkdirt);
        MapController.generateFlatMountains(mapTiles, seedMaterial, seedPosition, TerrainMaterial.stone);
        
        /*
        let width = getRandomInt(0,4);
        let height = getRandomInt(0,4);
        let enter = Orientation.down;
        if(Math.random()<0.5){
            enter = Orientation.up;
        }
        gr = new GroundRing(3+width,3+height, enter);
        MapController.loadObject(gr ,mapTiles, new Point(4,4));
        */


        MapController.maps[name] = (new GameMap(name, mapTiles));


    }

    static getTileDistance = (x,y, tx, ty) =>{
        return Math.sqrt((x-tx)*(x-tx)+(y-ty)*(y-ty));
    }

    static loadObject = (mapObject:MapObject, mapTiles: MapTile[][], position: Point) =>{
        
        for(let i in mapObject.objectTiles){
            let object: ObjectTile = mapObject.objectTiles[i];
            mapTiles[position.y+object.position.y][position.x+object.position.x].addObject(object.type, true);
        } 
    }

    static generateGroundRings = (mapTiles: MapTile[][], seedMaterial: TerrainMaterial[], seedPosition: Point[]) => {
        let grCheckers: SpawnObjectMapChecker[] = [];
        
                grCheckers[2] = new SpawnObjectMapChecker(mapTiles, TerrainMaterial.dirt, new Point(3,3));
                grCheckers[1] = new SpawnObjectMapChecker(mapTiles, TerrainMaterial.dirt, new Point(4,3));
                grCheckers[0] = new SpawnObjectMapChecker(mapTiles, TerrainMaterial.dirt, new Point(5,3));
                
                let grSpawnPosition: Point;
                let gr: GroundRing; 
                let enter: Orientation;
                let seeds = seedMaterial.length;

                for(let k = 0; k < seeds; k++){
                    if(seedMaterial[k] == TerrainMaterial.dirt){
                        for(let i = 0; i < grCheckers.length; i++){
                            grSpawnPosition = grCheckers[i].search(seedPosition[k]);
                            console.log("Pozycja: " + grSpawnPosition.x + " "+ grSpawnPosition.y);
                            if(grSpawnPosition.x > -1 && grSpawnPosition.y > -1){
                                enter = randomEnum(Orientation);
                                gr = new GroundRing(grCheckers[i].size.x, grCheckers[i].size.y, enter);
                                if(!gr.isColliding(mapTiles, new Point(grSpawnPosition.x,grSpawnPosition.y))){
                                    MapController.loadObject(gr ,mapTiles, new Point(grSpawnPosition.x,grSpawnPosition.y));
                                }      
                            }
                        }        
                    }
               }
    }

    static generateBasicObject = (mapObjectType :MapObjectType, material : TerrainMaterial,  mapTiles: MapTile[][], seedMaterial: TerrainMaterial[], seedPosition: Point[]) => {
        let Checkers: SpawnObjectMapChecker[] = [];
        
                Checkers[0] = new SpawnObjectMapChecker(mapTiles, material, new Point(2,2));
                
                let spawnPosition: Point;
                let mapObject: MapObject = new MapObject();
                mapObject.addObjectTile(new Point(0,0) , mapObjectType);
                let enter: Orientation;
                let seeds = seedMaterial.length;

                for(let k = 0; k < seeds; k++){
                    if(seedMaterial[k] == material){
                        for(let i = 0; i < Checkers.length; i++){
                            spawnPosition = Checkers[i].search(seedPosition[k]);
                            console.log("Pozycja: " + spawnPosition.x + " "+ spawnPosition.y);
                            if(spawnPosition.x > -1 && spawnPosition.y > -1){
                              //  gr = new GroundRing(grCheckers[i].size.x, grCheckers[i].size.y, enter);
                              //  if(!gr.isColliding(mapTiles, new Point(grSpawnPosition.x,grSpawnPosition.y))){
                                    MapController.loadObject(mapObject, mapTiles, new Point(spawnPosition.x,spawnPosition.y));
                              //  }      
                            }
                        }        
                    }
               }
    }

    static generateFlatMountains = (mapTiles: MapTile[][], seedMaterial: TerrainMaterial[], seedPosition: Point[], material: TerrainMaterial) => {
        let fmCheckers: SpawnObjectMapChecker[] = [];
        
                fmCheckers[2] = new SpawnObjectMapChecker(mapTiles, material, new Point(3,2));
                fmCheckers[1] = new SpawnObjectMapChecker(mapTiles, material, new Point(4,2));
                fmCheckers[0] = new SpawnObjectMapChecker(mapTiles, material, new Point(5,1));
                
                let fmSpawnPosition: Point;
                let fm: FlatMountain; 
                let seeds = seedMaterial.length;

                for(let k = 0; k < seeds; k++){
                    if(seedMaterial[k] == material){
                        for(let i = 0; i < fmCheckers.length; i++){
                            fmSpawnPosition = fmCheckers[i].search(seedPosition[k]);
                            console.log("Pozycja: " + fmSpawnPosition.x + " "+ fmSpawnPosition.y);
                            if(fmSpawnPosition.x > -1 && fmSpawnPosition.y > -1){
                                fm = new FlatMountain(fmCheckers[i].size.x);
                                if(!fm.isColliding(mapTiles, new Point(fmSpawnPosition.x,fmSpawnPosition.y))){
                                    MapController.loadObject(fm ,mapTiles, new Point(fmSpawnPosition.x,fmSpawnPosition.y));
                                }      
                            }
                        }        
                    }
               }
    }
    
}