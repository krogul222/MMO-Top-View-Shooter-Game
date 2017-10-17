import { GameMap } from './../../server/js/GameMap';
import { PlayerClient } from './Entities/PlayerClient';
import { selfId } from './game';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class MapClient {
    
    map: GameMap;
    image: any = new Image();

    constructor(){}

    draw = () =>{


        let mainPlayer: PlayerClient = PlayerClient.list[selfId];
        let mainPlayerx = mainPlayer.position.x;
        let mainPlayery = mainPlayer.position.y;
        
        if(!this.image.src){
            this.image.src = '/client/img/'+mainPlayer.map+'.png';
        }
        let x = WIDTH/2 - mainPlayerx;
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
        let y = HEIGHT/2 - mainPlayery;
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, x, y, this.image.width*2, this.image.height*2);
    }
}