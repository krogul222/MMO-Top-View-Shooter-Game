import { PlayerClient } from './Entities/PlayerClient';
import { selfId } from './game';
import { GameMap } from '../../server/js/Map/GameMap';
import { TerrainMaterial } from '../../server/js/enums';
import { mapTileImageName } from '../../server/js/Constants';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class MapClient {
    
    map: GameMap;
    image: any = new Image();

    constructor(map){
        this.map = map;
    }

    reloadMap = (map) => {
        this.map = map;
    }

    draw = () =>{


        let mainPlayer: PlayerClient = PlayerClient.list[selfId];
        let mainPlayerx = mainPlayer.position.x;
        let mainPlayery = mainPlayer.position.y;

        let x = WIDTH/2 - mainPlayerx;
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
        let y = HEIGHT/2 - mainPlayery;
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

        let size = this.map.size;
        let material: TerrainMaterial = TerrainMaterial.grass;
        let imgWidth: number = 1;
        let imgHeight: number = 1;

        for (let i = 0 ; i < size ; i++){
            for (let j = 0; j < size; j++){
                material = this.map.mapTiles[i][j].material;
                imgWidth = Img[mapTileImageName[material]].width;
                imgHeight = Img[mapTileImageName[material]].height;
                ctx.drawImage(Img[mapTileImageName[material]], 0, 0, imgWidth, imgHeight, x+imgWidth*j, y+imgHeight*i, imgWidth, imgHeight);                
            }
        }
       // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, x, y, this.image.width*2, this.image.height*2);
    }
}