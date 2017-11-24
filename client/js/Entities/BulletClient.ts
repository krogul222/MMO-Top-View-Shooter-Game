import { Img, jsonIAE } from './../images';
import { gameSoundManager } from './../game';
import { EnemyClient } from './EnemyClient';
import { initPack } from './../../../server/js/globalVariables';
import { Point } from './../../../server/js/GeometryAndPhysics';
import { selfId } from '../game';
import { PlayerClient } from './PlayerClient';
import { ExplosionClient } from './ExplosionClient';
import { camera } from '../canvas';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class BulletClient {

    id: number = -1;
    position: Point = new Point(250, 250);
    startPosition: Point = new Point(250, 250);
    map = "forest";
    img :any = Img["bullet"];
    width: number = 32;
    height: number = 32;
    hitCategory: any = 1; 
    maxLife: number = 10;
    life: number = this.maxLife;
    toRemove: boolean = false;

    constructor(initPack) {
        this.id = (initPack.id !== undefined) ? initPack.id : -1;
        this.position = (initPack.position !== undefined) ? initPack.position : new Point(250, 250);
        this.startPosition = (initPack.startPosition !== undefined) ? initPack.startPosition : new Point(250, 250);
        
        this.width = (initPack.width !== undefined) ? initPack.width : 32;
        this.height = (initPack.height !== undefined) ? initPack.height : 32;
        this.hitCategory = (initPack.hitCategory !== undefined) ? initPack.hitCategory : 1;
        this.img = (initPack.img !== undefined) ? initPack.img : "bullet";
        this.map = (initPack.map !== undefined) ? initPack.map : "forest";
        BulletClient.list[this.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }
        camera.drawLine(this.startPosition.x, this.startPosition.y, this.position.x, this.position.y, (this.life/this.maxLife)*4, 255, 255, 255, (this.life/this.maxLife));
     /*   let frame = jsonIAE["frames"][this.img+".png"]["frame"];
        let frameWidth = frame["w"];
        let frameHeight = frame["h"];

        camera.drawImage(Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x, this.position.y, this.width, this.height, frame["x"], frame["y"]);
   
    */ 
    }

    update = () => {
        this.life--;

        if(this.life <= 0) this.toRemove = true;
    }

    hit = (category, entityCategory, entityId) => {

        let x = this.position.x;
        let y = this.position.y;
        
        if(entityCategory == "player"){
            if(PlayerClient.list[entityId]){
                x = PlayerClient.list[entityId].x + (1-Math.round(2*Math.random())) * Math.floor(Math.random()*PlayerClient.list[entityId].width/4);
                y = PlayerClient.list[entityId].y + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*PlayerClient.list[entityId].height/4);
            }
        }   
            
        if(entityCategory == "enemy"){
            if(EnemyClient.list[entityId]){
                x = EnemyClient.list[entityId].x + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*EnemyClient.list[entityId].width/4);
                y = EnemyClient.list[entityId].y + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*EnemyClient.list[entityId].height/4);
            }
        }
        
        gameSoundManager.playHit(entityCategory);

        if(category == 1){
            new ExplosionClient({position: this.position, map: this.map, img: "blood", width: 48, height: 48, category: category, spriteRows: 1, spriteColumns: 6});
        } else if(category == 2){
            new ExplosionClient({position: this.position, map: this.map, img: "explosion1", width: 64, height: 64, category: category, spriteRows: 4, spriteColumns: 10});
        }

    }

    static list = {};
}