import { jsonPlayer } from './../images';
import { initPack } from './../../../server/js/globalVariables';
import { Point } from './../../../server/js/GeometryAndPhysics';
import { selfId } from '../game';
import { camera } from '../canvas';
import { Img } from '../images';

declare var mouseX: any;
declare var mouseY: any;
declare var ctx: any;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare const WIDTH: any;
declare const HEIGHT: any;

export class PlayerClient{
    public id: number = -1;
    public position: Point = new Point(250, 250);
    public width: number = 0;
    public height: number = 0;
    public hp: number = 1;
    public hpMax: number = 1;
    public map = "forest";
    public aimAngle: number = 0;
    public attackStarted: boolean = false;
    public attackMelee: boolean = false;  
    public bodySpriteAnimCounter: number = 0;
    public walkSpriteAnimCounter: number = 0;
    public moving: boolean = false;
    public reload = false;
    public weapon = "pistol";
    public ammo = 0;
    public ammoInGun = 0;

    constructor(initPack) {
        if(initPack.id) this.id = initPack.id;
        if(initPack.position) this.position = initPack.position;
        if(initPack.width) this.width = initPack.width;
        if(initPack.height) this.height = initPack.height;
        if(initPack.weapon) {
            this.weapon = initPack.weapon;
        }
        if(initPack.hp) this.hp = initPack.hp;
        if(initPack.hpMax) this.hpMax = initPack.hpMax;
        if(initPack.aimAngle) this.aimAngle = initPack.aimAngle;
        if(initPack.moving) this.moving = initPack.moving;
        if(initPack.attackStarted) this.attackStarted = initPack.attackStarted;
        if(initPack.attackMelee) this.attackMelee = initPack.attackMelee;
        if(initPack.ammo) this.ammo = initPack.ammo;
        if(initPack.ammoInGun) this.ammoInGun = initPack.ammoInGun;

        PlayerClient.list[initPack.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        let spriteRows = 1;
        let spriteColumns = 20;
        
        let hpWidth = 30 * this.hp/this.hpMax;

        let aimAngle: number = this.aimAngle;
        
     //   aimAngle = (aimAngle < 0) ? (360 + aimAngle) : aimAngle;
        let directionMod: number = this.inWhichDirection(aimAngle);
        let walkingMod = Math.floor(this.walkSpriteAnimCounter) % spriteColumns;

        this.drawWalk(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);

        if(this.attackStarted && this.attackMelee){
            spriteColumns = 15;
            walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
            this.drawMeleeAttackBody(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
        } else {
            if(this.reload){
                if(this.weapon == "pistol") spriteColumns = 15;
                walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                this.drawReloadBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
            } else {
                this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
            }
        }

        //hp bar
        camera.drawBar(this.position.x - hpWidth/2, this.position.y - 40, hpWidth, 4, 'red');
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

    drawMeleeAttackBody = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {

        let correction = 1.3;
        let correctionWidth = 1;
        let correctionHeight = 1;
        
        if(this.weapon == "pistol"){
            correction = 1.1;
        }
        
        if(this.weapon == "shotgun" || this.weapon == "flamethrower"){
            correction = 1.4;
        }
       
        let frame = jsonPlayer["frames"]["player_"+this.weapon+"_meeleattack.png"]["frame"];
        let frameWidth = frame["w"]/spriteColumns;
        let frameHeight = frame["h"]/spriteRows;
        camera.drawImage(Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width*correction, this.height*correction, frame["x"], frame["y"] );
        


        if(this.bodySpriteAnimCounter % spriteColumns >= (spriteColumns-1)){
            this.bodySpriteAnimCounter = 0;
            this.attackStarted = false;
        }
    }

    drawNormalBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
        let frame = jsonPlayer["frames"]["player_"+this.weapon+".png"]["frame"];
        let frameWidth = frame["w"]/spriteColumns;
        let frameHeight = frame["h"]/spriteRows;
        camera.drawImage(Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"] );
    }


    drawReloadBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {

        let frame = jsonPlayer["frames"]["player_"+this.weapon+"_reload.png"]["frame"];
        let frameWidth = frame["w"]/spriteColumns;
        let frameHeight = frame["h"]/spriteRows;

        camera.drawImage(Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"] );

    }

    drawWalk = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {

        let frame = jsonPlayer["frames"]["walk.png"]["frame"];
        let frameWidth = frame["w"]/spriteColumns;
        let frameHeight = frame["h"]/spriteRows;
        
        camera.drawImage(Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width/2, this.height/2, frame["x"], frame["y"] );

    }

    static list: any = {};
}





