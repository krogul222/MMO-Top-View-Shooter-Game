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


export class UpgradeClient {
    position: Point = new Point(0, 0);
    id: number = -1;
    width: number;
    height: number;
    map: any;
    img: any;
    category: number;
    kind: number;

    constructor(param){
        this.id = param.id ? param.id : this.id;
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? param.img : this.img;
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind; 

        UpgradeClient.list[this.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let frame = jsonIAE["frames"][this.img+".png"]["frame"];
        let frameWidth = frame["w"];
        let frameHeight = frame["h"];
        camera.drawImage(Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height, frame["x"], frame["y"] );
        

     //   camera.drawImage(this.img, this.img.width, this.img.height, 0, 0, 0, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);            
    }

    static list = {};
}