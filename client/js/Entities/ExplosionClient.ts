import { Img, jsonIAE } from './../images';
import { Point } from './../../../server/js/GeometryAndPhysics';
import { PlayerClient } from './PlayerClient';
import { selfId } from '../game';
import { camera } from '../canvas';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class ExplosionClient {

    id: number = Math.random(); 
    position: Point = new Point(0, 0);
    width: number = 32;
    height: number = 32;
    map: any;
    img: any;
    category: any;

    spriteAnimCounter: number = 0;
    animRows: number;
    animColumns: number;

    constructor(param) {
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? param.img : this.img;
        this.category = param.category ? param.category : this.category;
        this.animRows = param.spriteRows ? param.spriteRows : this.animRows;
        this.animColumns = param.spriteColumns ? param.spriteColumns : this.animColumns;
        
        ExplosionClient.list[this.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let frame = jsonIAE["frames"][this.img+".png"]["frame"];

        let frameWidth = frame["w"]/this.animColumns;
        let frameHeight = frame["h"]/this.animRows;
		
        let spriteColumn = Math.floor(this.spriteAnimCounter) % this.animColumns;
        let spriteRow = Math.floor(this.spriteAnimCounter/this.animColumns);
        
        
      //  camera.drawImage(Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height, frame["x"], frame["y"] );
        
        camera.drawImage(Img["IAE"], frameWidth, frameHeight, 0, spriteRow, spriteColumn, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height, frame["x"], frame["y"]);            
            
    }

    isCompleted = () => {
        if(this.spriteAnimCounter > (this.animRows*this.animColumns))
            return true;
        else
            return false;
    }
    
	static list = {};
}