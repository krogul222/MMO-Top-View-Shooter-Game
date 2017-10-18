import { Point } from './../../../server/js/GeometryAndPhysics';
import { PlayerClient } from './PlayerClient';
import { selfId } from '../game';

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
        this.img = param.img ? Img[param.img] : Img[this.img];
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind; 

        UpgradeClient.list[this.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let mainPlayer: PlayerClient = PlayerClient.list[selfId];
        let mainPlayerx = mainPlayer.position.x;
        let mainPlayery = mainPlayer.position.y;
        let ex = this.position.x;
        let ey = this.position.y;

        let x = ex - (mainPlayerx-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;

        let y = ey - (mainPlayery-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

        x -= this.width/2;
		y -= this.height/2;
		 
		ctx.drawImage(this.img, 0,0,this.img.width,this.img.height, x,y,this.width,this.height);
    }

    static list = {};
}