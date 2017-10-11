import { SingleWeapon } from './../../server/js/WeaponCollection';
import { PlayerClient } from './Entities/PlayerClient';
import { selfId } from './game';
import { WeaponTypes } from '../../server/js/WeaponTypes';
export class GUI {
    width: number;
    height: number;
    ctx: any;

    constructor(param) {
        if(param.ctx !== undefined) this.ctx = param.ctx;
        if(param.width !== undefined) this.width = param.width;
        if(param.height !== undefined) this.height = param.height;
    }

    draw = () => {

        this.ctx.clearRect(0,0,this.width,this.height);
        let pat = this.ctx.createPattern(Img["guibackground"],"repeat-x");
        this.ctx.fillStyle = pat;
        this.ctx.fillRect(0,0,this.width,this.height);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";

        if(PlayerClient.list[selfId]){
            this.drawWeapon();
            this.drawAmmo();
            this.drawFace();
            this.ctx.fillText('Hit points: '+PlayerClient.list[selfId].hp + '/'+PlayerClient.list[selfId].hpMax, 0, 0.6*this.height);
        }
    }

    resize = (width, height) => {
        this.width = width;
        this.height = height;
    }

    drawWeapon = () => {
        if(PlayerClient.list[selfId]){
            this.ctx.drawImage(Img[PlayerClient.list[selfId].weapon], 0, 0, Img[PlayerClient.list[selfId].weapon].width, Img[PlayerClient.list[selfId].weapon].height, (this.width-0.8*this.height)/4, (this.height-0.8*this.height)/2, 0.8*this.height, 0.8*this.height);
        }
    }

    drawAmmo = () => {
        if(PlayerClient.list[selfId]){
            if(Img[PlayerClient.list[selfId].weapon+"ammo"]){
                this.ctx.drawImage(Img[PlayerClient.list[selfId].weapon+"ammo"], 0, 0, Img[PlayerClient.list[selfId].weapon+"ammo"].width, Img[PlayerClient.list[selfId].weapon+"ammo"].height, 11*(this.width-0.8*this.height)/32, (this.height-0.4*this.height)/2, 0.4*this.height, 0.4*this.height); 
                
                this.ctx.fillText(' x'+PlayerClient.list[selfId].ammo+"  "+PlayerClient.list[selfId].ammoInGun+"/", 11*(this.width-0.8*this.height)/32+0.4*this.height, (this.height)/2+10);
            }   
        }
    }

    drawFace = () => {
        let spriteRows = 2;
        let spriteColumns = 4;
        let facelook = 1;

        this.ctx.drawImage(Img["faceborder"], 0, 0, Img["faceborder"].width, Img["faceborder"].height, (this.width-0.85*this.height)/2, (this.height-0.85*this.height)/2, 0.85*this.height, 0.85*this.height);
        
        if(PlayerClient.list[selfId]){ 
            facelook = Math.round(((PlayerClient.list[selfId].hpMax-PlayerClient.list[selfId].hp)/PlayerClient.list[selfId].hpMax)*(spriteRows*spriteColumns-1));
            
            let facex = facelook % spriteColumns;
            let facey = Math.floor(facelook / spriteColumns);
            
            let frameWidth = Img["face"].width/spriteColumns;
            let frameHeight = Img["face"].height/spriteRows;
            
            this.ctx.drawImage(Img["face"], facex*frameWidth, facey*frameHeight, frameWidth, frameHeight, (this.width-0.8*this.height)/2, (this.height-0.8*this.height)/2, 0.8*this.height, 0.8*this.height);
        }
    }
}