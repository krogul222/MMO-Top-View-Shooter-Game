import { initPack } from './../../../server/js/globalVariables';
import { Point } from './../../../server/js/GeometryAndPhysics';
import { selfId } from '../game';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class PlayerClient{
    public id: number = -1;
    public _position: Point = new Point(250, 250);
    public width: number = 0;
    public height: number = 0;
    public img: any = Img["player"+"knife"];
    public hp: number = 1;
    public hpMax: number = 1;
    public map = "forest";
    public aimAngle: number = 0;
    public attackStarted: boolean = false;
    public attackMelee: boolean = false;  
    public spriteAnimCounter: number = 0;
    public moving: boolean = false;
    public reload = false;

    constructor(initPack) {
        if(initPack.id) this.id = initPack.id;
        if(initPack.position) this._position = initPack.position;
        if(initPack.width) this.width = initPack.width;
        if(initPack.height) this.height = initPack.height;
        if(initPack.weapon) this.img = Img["player"+initPack.weapon];
        if(initPack.hp) this.hp = initPack.hp;
        if(initPack.hpMax) this.hpMax = initPack.hpMax;
        if(initPack.aimAngle) this.aimAngle = initPack.aimAngle;
        if(initPack.moving) this.moving = initPack.moving;
        if(initPack.attackStarted) this.attackStarted = initPack.attackStarted;
        if(initPack.attackMelee) this.attackMelee = initPack.attackMelee;
        PlayerClient.list[initPack.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let spriteRows = 1;
        let spriteColumns = 20;
        
        let hpWidth = 30 * this.hp/this.hpMax;
        
        let mainPlayer: PlayerClient = PlayerClient.list[selfId];
        let mainPlayerx = mainPlayer._position.x;
        let mainPlayery = mainPlayer._position.y;
        let px = this._position.x;
        let py = this._position.y;

        let x: number = px - (mainPlayerx-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
        let y: number = py - (mainPlayery-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;  

        let aimAngle: number = this.aimAngle;
        
        aimAngle = (aimAngle < 0) ? (360 + aimAngle) : aimAngle;
        let directionMod: number = this.inWhichDirection(aimAngle);
        let walkingMod = Math.floor(this.spriteAnimCounter) % spriteColumns;

        this.drawWalk(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);

        if(this.attackStarted && this.attackMelee){
            this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
        } else {
            if(this.reload){
            } else {
                this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
            }
        }

        //hp bar
        ctx.fillStyle = 'red';
        ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);
    }

    inWhichDirection = (aimAngle) => {
        let directionMod = 3;  //right
        if(aimAngle >= 45 && aimAngle <135){
            directionMod = 2;   //down
        } else if(aimAngle >= 135 && aimAngle <225){
            directionMod = 1;   //left
        } else if(aimAngle >= 225 && aimAngle <315) {
            directionMod = 0;   // up 
        }

        return directionMod;
    }

    drawNormalBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
        let frameWidth = this.img.width/spriteColumns;
        let frameHeight = this.img.height/spriteRows;

        // the alternative is to untranslate & unrotate after drawing
        ctx.save();
        ctx.translate(x - this.width/2,y - this.height/2);
        ctx.translate(this.width/2, this.height/2); 
        ctx.rotate(aimAngle*Math.PI/180)

        ctx.drawImage(this.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -this.width/2,-this.height/2, this.width, this.height);

        ctx.restore();
    }

    drawWalk = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
        let frameWidth = Img["walk"].width/spriteColumns;
        let frameHeight = Img["walk"].height/spriteRows;        
        
        ctx.save();
        ctx.translate(x - this.width/4,y - this.height/4);
        ctx.translate(this.width/4, this.height/4); 
        ctx.rotate(aimAngle*Math.PI/180)
        
        ctx.drawImage(Img["walk"], walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -this.width/4,-this.height/4, this.width/2, this.height/2);
        
        ctx.restore();   
    }

    static list: any = {};
}





