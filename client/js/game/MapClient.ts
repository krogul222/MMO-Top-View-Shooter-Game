import { GameMap } from "../../../server/js/Map/GameMap";
import { PlayerClient } from "../Entities/PlayerClient";
import { TerrainMaterial } from "../../../server/js/enums";
import { mapTileImageName, mapTileSideImageName, mapObjectImageName } from "../../../server/js/Constants";
import { camera } from "../pregame/canvas";
import { canvasFilters, selfId } from "./game";
import { Img, jsonMap } from "../images";



declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class MapClient {
    
    map: GameMap;
    image: any = new Image();
    name: string ="";

    constructor(map, name){
        this.map = map;
        this.name = name;
    }

    reloadMap = (map : GameMap) => {
        this.map = map;
        this.name = map.name;
    }

    draw = () =>{

        if(this.map){
            let mainPlayer: PlayerClient = PlayerClient.list[selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
    
            let x = WIDTH/2 - mainPlayerx;
            x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
            let y = HEIGHT/2 - mainPlayery;
            y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;
    
            let size = this.map.size;
            let material: TerrainMaterial = TerrainMaterial.dirt;
            let imgWidth: number = 1;
            let imgHeight: number = 1;
    
            let frame = jsonMap["frames"];
            let mapFrame = frame;
            let frameWidth = 32;
            let frameHeight = 32;
            
            for (let i = 0 ; i < size ; i++){
                for (let j = 0; j < size; j++){
                    material = this.map.mapTiles[i][j].material;

                    mapFrame = frame[mapTileImageName[material]+".png"]["frame"];
                    imgWidth = mapFrame["w"];
                    imgHeight = mapFrame["h"];

                    camera.drawImage(Img["Map"], imgWidth, imgHeight, 0, 0, 0,  (imgWidth-1)*j, (imgHeight-1)*i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
                    
                    
                    for(let k = 0; k < 4; k++){
                        if(this.map.mapTiles[i][j].sides[k] > 0){
                            mapFrame = frame[mapTileSideImageName[k][this.map.mapTiles[i][j].sides[k]]+".png"]["frame"];
                            imgWidth = mapFrame["w"];
                            imgHeight = mapFrame["h"];
                            
                            camera.drawImage(Img["Map"], imgWidth, imgHeight, 0, 0, 0,  (imgWidth-1)*j, (imgHeight-1)*i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
                            
                        }
                    }
    
                }
            }
            canvasFilters.getImageFromCanvas();
            canvasFilters.bright();

            for (let i = 0 ; i < size ; i++){
                for (let j = 0; j < size; j++){
                    for(let k = 0; k < this.map.mapTiles[i][j].objects.length; k++){
                        if(this.map.mapTiles[i][j].objects[k] > 0){
                            mapFrame = frame[mapObjectImageName[this.map.mapTiles[i][j].objects[k]]+".png"]["frame"];
                            imgWidth = mapFrame["w"];
                            imgHeight = mapFrame["h"];
                            
                            camera.drawImage(Img["Map"], imgWidth, imgHeight, 0, 0, 0,  (imgWidth-1)*j, (imgHeight-1)*i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
                        }
                    }
                }
            }
        }
    }
}