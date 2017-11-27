import { selfId } from './../game/game';
import { FireFlameClient } from './../Effects/FireFlameClient';
import { PlayerClient } from './PlayerClient';
import { Point } from "../../../server/js/GeometryAndPhysics";
import { selfId } from '../game/game';
import { camera } from '../pregame/canvas';
import { Img, jsonIAE } from '../images';
import { framesAttack, framesMove } from '../Constants/EnemyConstants';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class EnemyClient{
    public id: number = -1;
    public position: Point = new Point(250, 250);
    public startPosition: Point = new Point(250, 250);
    public width: number = 0;
    public height: number = 0;
    public img: any = Img["zombie"];
    public kind = "zombie";
    public hp: number = 1;
    public hpMax: number = 1;
    public map = "forest";
    public aimAngle: number = 0;
    public attackStarted: boolean = false;
    public attackMelee: boolean = false;  
    public spriteAnimCounter: number = 0
    public moving: boolean = false;
    public reload = false;
    public weapon = "pistol";
    public flame:FireFlameClient = new FireFlameClient(this);
    public burn:FireFlameClient = new FireFlameClient(this, true);
    
    constructor(initPack) {
        if(initPack.id) this.id = initPack.id;
        if(initPack.position) this.position = initPack.position;
        if(initPack.startPosition) this.startPosition = initPack.startPosition;
        if(initPack.width) this.width = initPack.width;
        if(initPack.height) this.height = initPack.height;
        if(initPack.weapon) this.weapon = initPack.weapon;
        if(initPack.img) this.img = Img[initPack.img];
        if(initPack.hp) this.hp = initPack.hp;
        if(initPack.hpMax) this.hpMax = initPack.hpMax;
        if(initPack.aimAngle) this.aimAngle = initPack.aimAngle;
        if(initPack.moving) this.moving = initPack.moving;
        if(initPack.attackStarted) this.attackStarted = initPack.attackStarted;
        if(initPack.attackMelee) this.attackMelee = initPack.attackMelee;
        if(initPack.kind) this.kind = initPack.kind;

        EnemyClient.list[initPack.id] = this;
    }

    draw = () => {
        let p: PlayerClient = PlayerClient.list[selfId];
        if(p.map !== this.map){
            return;  
        }

        if(p.position.x - this.position.x > WIDTH || p.position.y - this.position.y > HEIGHT ) return;


        let hpWidth = 30 * this.hp/this.hpMax;
        
        let frameWidth = 32;
        let frameHeight = 32;

        let aimAngle = this.aimAngle;
            
        if(aimAngle < 0){ aimAngle = 360 + aimAngle; }   

            
        let walkingMod = Math.floor(this.spriteAnimCounter) % 6;

        if(this.kind == 'zombie'){
            this.drawTopViewSprite(this.position.x, this.position.y, aimAngle);            
        } else{
            let directionMod = 3;  //right
            if(aimAngle >= 45 && aimAngle <135){
                directionMod = 2;   //down
            } else if(aimAngle >= 135 && aimAngle <225){
                directionMod = 1;   //left
            } else if(aimAngle >= 225 && aimAngle <315) {
                directionMod = 0;   // up 
            }
            let frame = jsonIAE["frames"][this.kind+".png"]["frame"];
            frameWidth = frame["w"]/6;
            frameHeight = frame["h"]/4;
            walkingMod = Math.floor(this.spriteAnimCounter) % 6; 
            camera.drawImage(Img["IAE"], frameWidth, frameHeight, 0, directionMod, walkingMod, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height, frame["x"], frame["y"]);            
        }

        camera.drawBar(this.position.x - hpWidth/2, this.position.y - 40, hpWidth, 4, 'red');  

    }

    drawTopViewSprite = (x: number, y: number, aimAngle: number) => {
        if(this.attackStarted){
            this.drawTopViewSpriteAttack(x, y, aimAngle);
        } else{
            this.drawTopViewSpriteWalk(x, y, aimAngle);
        }
    }

    drawTopViewSpriteAttack = (x: number, y: number, aimAngle: number) => {
        let spriteColumns = framesAttack[this.kind];
        let spriteRows = 1;
        let walkingMod = Math.floor(this.spriteAnimCounter) % spriteColumns;

        let frame = jsonIAE["frames"][this.kind+"_attack.png"]["frame"];
        let frameWidth = frame["w"]/spriteColumns;
        let frameHeight = frame["h"]/spriteRows;
        camera.drawImage(Img["IAE"], frameWidth, frameHeight, aimAngle, 0, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);       

        if(this.spriteAnimCounter % spriteColumns >= (spriteColumns-1)){
            this.spriteAnimCounter = 0;
            this.attackStarted = false;
        }
    }

    drawTopViewSpriteWalk = (x: number, y: number, aimAngle: number) => {

        let walkingMod = Math.floor(this.spriteAnimCounter) % framesMove[this.kind];

        let frame = jsonIAE["frames"][this.kind+"_move.png"]["frame"];
        let frameWidth = frame["w"]/framesMove[this.kind];
        let frameHeight = frame["h"];
        camera.drawImage(Img["IAE"], frameWidth, frameHeight, aimAngle, 0, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);       


    }

    static list = {};
}