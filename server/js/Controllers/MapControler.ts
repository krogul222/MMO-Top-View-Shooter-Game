import { GroundRing } from './../Map/MapObjects/GroundRing';
import { ObjectTile } from './../Map/MapObjects/ObjectTile';
import { MapObject } from './../Map/MapObjects/MapObject';
import { GameMap } from './../Map/GameMap';
import { MapTile } from '../Map/MapTile';
import { TerrainMaterial, getRandomInt, randomEnum, TerrainMaterialWithoutWater, Orientation, CornerOrientation } from '../enums';
import { Point } from '../GeometryAndPhysics';
import { TILE_SIZE } from '../Constants';

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

                
                return { material: material, name: MapController.maps[i].name, sides: sides, objects: objects}

            }
        }
    }

    constructor(param) {
        //this.maps.push(new GameMap("forest", 1280, 1280));

    }

    static loadMaps = () => {
        console.log("Pierwsza Map");
        MapController.createMap("forest", 16,20);
        console.log("Druga Map");
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
                    if(MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y) < distance){
                        distance = MapController.getTileDistance(i, j, seedPosition[k].x, seedPosition[k].y);
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

/*
        let grSeeds: number[] =[];
        for(let k = 0; k < seeds; k++){
            let width = 0;
            let height = 0;
            if(seedMaterial[k] == TerrainMaterial.dirt){

                let x = seedPosition[k].y-1;
                let y = seedPosition[k].x-1;

                let terrainOK: boolean = true;

                for(let i = 0; i<3 ; i++){
                    for(let j=0; j<3; j++)
                    {
                        if(x>=0 && x<size && y>=0 && y<size ){
                            if(mapTiles[y][x].material == TerrainMaterial.dirt){
                                x++;
                            } else{
                                terrainOK = false;
                            }
                        } else{
                            terrainOK = false;
                        }
                    }
                    y++;
                }

                if(terrainOK){
                    let heightRF = 0; //getRandomInt(0,0);
                    let widthRF = 0; //getRandomInt(0,0);
                    for(let i=0; i<grSeeds.length; i++){
                        if(MapController.getTileDistance(seedPosition[k].x,seedPosition[k].y, seedPosition[grSeeds[i]].x-1,seedPosition[grSeeds[i]].y-1) < 4){
                            terrainOK = false;
                        }
                    }
                    if(terrainOK){
                        let gr: GroundRing = new GroundRing(3+widthRF,3+heightRF, Orientation.down);
                        MapController.loadObject(gr ,mapTiles, new Point(seedPosition[k].x-1,seedPosition[k].y-1));
                        grSeeds.push(k);
                    }
                }

                width = 0;
                height = 0;
            }
        }*/


        let width = getRandomInt(0,4);
        let height = getRandomInt(0,4);
        let enter = Orientation.down;
        if(Math.random()<0.5){
            enter = Orientation.up;
        }
        let gr: GroundRing = new GroundRing(3+width,3+height, enter);
        MapController.loadObject(gr ,mapTiles, new Point(4,4));
        


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
    
}