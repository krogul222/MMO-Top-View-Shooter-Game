import { Img, jsonIAE, jsonGUI } from './images';
import { TILE_SIZE } from './../../server/js/Constants';
import { GameMap } from './../../server/js/Map/GameMap';
import { Rectangle, Point } from './../../server/js/GeometryAndPhysics';
import { PlayerClient } from './Entities/PlayerClient';
import { selfId, inventory, currentMap } from './game';
import { ItemType, TerrainMaterial } from './../../server/js/enums';
import { WeaponTypes } from '../../server/js/Weapons/WeaponTypes';

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
            this.drawItems();
            this.ctx.fillText('Hit points: '+PlayerClient.list[selfId].hp + '/'+PlayerClient.list[selfId].hpMax, 0, 0.6*this.height);
            this.drawMinimap();
        }
    }

    resize = (width, height) => {
        this.width = width;
        this.height = height;
    }

    drawWeapon = () => {
        if(PlayerClient.list[selfId]){
            let frame = jsonIAE["frames"][PlayerClient.list[selfId].weapon+".png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            this.ctx.drawImage(Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, (this.width-0.8*this.height)/4, (this.height-0.8*this.height)/2, 0.8*this.height, 0.8*this.height);
        }
    }

    drawAmmo = () => {
        if(PlayerClient.list[selfId]){
            if(jsonIAE["frames"][PlayerClient.list[selfId].weapon+"ammo.png"] !== undefined){
                let frame = jsonIAE["frames"][PlayerClient.list[selfId].weapon+"ammo.png"]["frame"];
                let frameWidth = frame["w"];
                let frameHeight = frame["h"];
                this.ctx.drawImage(Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, 11*(this.width-0.8*this.height)/32, (this.height-0.4*this.height)/2, 0.4*this.height, 0.4*this.height); 
                
                if(WeaponTypes.list[WeaponTypes.getWeaponIdbyName(PlayerClient.list[selfId].weapon)].reloadAmmo > 0){
                    this.ctx.fillText(' x'+PlayerClient.list[selfId].ammo+"  "+PlayerClient.list[selfId].ammoInGun+"/"+WeaponTypes.list[WeaponTypes.getWeaponIdbyName(PlayerClient.list[selfId].weapon)].reloadAmmo, 11*(this.width-0.8*this.height)/32+0.4*this.height, (this.height)/2+10);            
                } else {
                    this.ctx.fillText(' x'+PlayerClient.list[selfId].ammo, 11*(this.width-0.8*this.height)/32+0.4*this.height, (this.height)/2+10); 
                }

            }
        }
    }

    drawItems = () => {
        if(PlayerClient.list[selfId]){
            let frame = jsonIAE["frames"]["medicalkit.png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            this.ctx.drawImage(Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, 3*(this.width-0.8*this.height)/4, (this.height-0.8*this.height)/2, 0.8*this.height, 0.8*this.height);
            
            this.ctx.fillText(' x'+inventory.getItemAmount(ItemType.medicalkit), 3*(this.width-0.8*this.height)/4+0.8*this.height, (this.height)/2+10);
        }
    }

    drawFace = () => {
        let spriteRows = 2;
        let spriteColumns = 4;
        let facelook = 1;
        let frame = jsonGUI["frames"]["faceborder.png"]["frame"];
        let frameWidth = frame["w"];
        let frameHeight = frame["h"];
        this.ctx.drawImage(Img["GUI"], frame["x"], frame["y"], frameWidth, frameHeight, (this.width-0.85*this.height)/2, (this.height-0.85*this.height)/2, 0.85*this.height, 0.85*this.height);
        
        if(PlayerClient.list[selfId]){ 
            facelook = Math.round(((PlayerClient.list[selfId].hpMax-PlayerClient.list[selfId].hp)/PlayerClient.list[selfId].hpMax)*(spriteRows*spriteColumns-1));
            
            let facex = facelook % spriteColumns;
            let facey = Math.floor(facelook / spriteColumns);
            
            let frame = jsonGUI["frames"]["face.png"]["frame"];
            let frameWidth = frame["w"]/spriteColumns;
            let frameHeight = frame["h"]/spriteRows;

            this.ctx.drawImage(Img["GUI"], frame["x"]+facex*frameWidth, frame["y"]+ facey*frameHeight, frameWidth, frameHeight, (this.width-0.8*this.height)/2, (this.height-0.8*this.height)/2, 0.8*this.height, 0.8*this.height);
        }
    }

    drawMinimap = () => {
        let sizeY = currentMap.map.mapTiles.length;
        let sizeX = currentMap.map.mapTiles[0].length;

        let imgSize = 64;
        var imgData = this.ctx.createImageData(imgSize, imgSize);
        var data = imgData.data;
        let ratio = imgSize/currentMap.map.size;
        let Ra: number[] = [];
        let Ga: number[] = [];
        let Ba: number[] = [];

        Ra[TerrainMaterial.dirt] = 255;
        Ra[TerrainMaterial.water] = 0;
        Ra[TerrainMaterial.stone] = 128;

        Ga[TerrainMaterial.dirt] = 255;
        Ga[TerrainMaterial.water] = 0;
        Ga[TerrainMaterial.stone] = 128;

        Ba[TerrainMaterial.dirt] = 0;
        Ba[TerrainMaterial.water] = 255;
        Ba[TerrainMaterial.stone] = 128;

        let material: TerrainMaterial;
        let playerPosition: Point = PlayerClient.list[selfId].position;

        for(let i = 0; i < imgSize; i++){
            for(let j = 0; j < imgSize; j++){
                material = currentMap.map.mapTiles[Math.floor(i/ratio)][Math.floor(j/ratio)].material;

                data[(j+i*imgSize)*4] = Ra[material];
                data[(j+i*imgSize)*4+1] = Ga[material];
                data[(j+i*imgSize)*4+2] = Ba[material];
                data[(j+i*imgSize)*4+3] = 255;

                if(Math.floor(playerPosition.x/(TILE_SIZE*32)) == Math.floor(j/ratio) && Math.floor(playerPosition.y/(TILE_SIZE*32)) == Math.floor(i/ratio)){
                    data[(j+i*imgSize)*4] = 255;
                    data[(j+i*imgSize)*4+1] = 0;
                    data[(j+i*imgSize)*4+2] = 0;
                    data[(j+i*imgSize)*4+3] = 255;
                }
                
            }
        }

        let px = Math.floor(PlayerClient.list[selfId].position.x/(TILE_SIZE*32*sizeX)*imgSize);
        let py = Math.floor(PlayerClient.list[selfId].position.y/(TILE_SIZE*32*sizeY)*imgSize);



        this.ctx.putImageData(imgData, 5*(this.width)/6, (this.height-imgSize)/2);
    }
}