import { PlayerClient } from './PlayerClient';
import { Point } from "../../../server/js/GeometryAndPhysics";
import { selfId } from '../game';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class EnemyClient{
    public id: number = -1;
    public position: Point = new Point(250, 250);
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

    constructor(initPack) {
        if(initPack.id) this.id = initPack.id;
        if(initPack.position) this.position = initPack.position;
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
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let hpWidth = 30 * this.hp/this.hpMax;
        
        let mainPlayer: PlayerClient = PlayerClient.list[selfId];
        let mainPlayerx = mainPlayer.position.x;
        let mainPlayery = mainPlayer.position.y;
        let ex = this.position.x;
        let ey = this.position.y;

        let x: number = ex - (mainPlayerx-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
        let y: number = ey - (mainPlayery-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;  


        let frameWidth = this.img.width/6;
        let frameHeight = this.img.height/4;
        let aimAngle = this.aimAngle;
            
        if(aimAngle < 0){ aimAngle = 360 + aimAngle; }
            
        let directionMod = 3;  //right
        if(aimAngle >= 45 && aimAngle <135){
            directionMod = 2;   //down
        } else if(aimAngle >= 135 && aimAngle <225){
            directionMod = 1;   //left
        } else if(aimAngle >= 225 && aimAngle <315) {
            directionMod = 0;   // up 
        }
            
        let walkingMod = Math.floor(this.spriteAnimCounter) % 6;

        if(this.kind == 'zombie'){
            this.drawTopViewSprite(x, y, aimAngle);            
        } else{
            walkingMod = Math.floor(this.spriteAnimCounter) % 6; 
            ctx.drawImage(this.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - this.width/2, y - this.height/2, this.width, this.height);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);    

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

        let frameWidth = Img[this.kind+'attack'].width/spriteColumns;
        let frameHeight = Img[this.kind+'attack'].height/spriteRows;

        // the alternative is to untranslate & unrotate after drawing
        ctx.save();
        ctx.translate(x - (this.width)/2,y - this.height/2);   
        ctx.translate((this.width)/2, this.height/2); 
        ctx.rotate(aimAngle*Math.PI/180)
                
        ctx.drawImage(Img[this.kind+'attack'], walkingMod*frameWidth, 0, frameWidth, frameHeight, -this.width/2,-this.height/2, (this.width), this.height);
        ctx.restore();
                
        if(this.spriteAnimCounter % spriteColumns >= (spriteColumns-1)){
            this.spriteAnimCounter = 0;
            this.attackStarted = false;
        }
    }

    drawTopViewSpriteWalk = (x: number, y: number, aimAngle: number) => {
        let frameWidth = this.img.width/framesMove[this.kind];
        let frameHeight = this.img.height;

        ctx.save();
        ctx.translate(x - this.width/2,y - this.height/2);
        ctx.translate(this.width/2, this.height/2); 
        ctx.rotate(aimAngle*Math.PI/180)

        let walkingMod = Math.floor(this.spriteAnimCounter) % framesMove[this.kind];

        ctx.drawImage(this.img, walkingMod*frameWidth, 0, frameWidth, frameHeight, -this.width/2,-this.height/2, this.width, this.height);

        ctx.restore();  
    }

    static list = {};
}