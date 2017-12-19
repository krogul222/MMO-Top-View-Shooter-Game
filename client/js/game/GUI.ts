import { EnemyClient } from './../Entities/EnemyClient';
import { PlayerClient } from './../Entities/PlayerClient';
import { selfId, inventory, currentMap } from './game';
import { WeaponTypes } from '../../../server/js/Weapons/WeaponTypes';
import { ItemType, TerrainMaterial } from '../../../server/js/enums';
import { TILE_SIZE } from '../../../server/js/Constants';
import { Point } from '../../../server/js/GeometryAndPhysics';
import { jsonIAE, Img, jsonGUI } from '../images';

export class GUI {
    width: number;
    height: number;
    ctx: any;
    minimap;
    minimapEntities;
    minimapSize: number = 64;
    minimapEntitiesImg;
    counter: number = 0;

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
            this.ctx.fillText('Hit points: '+Math.ceil(PlayerClient.list[selfId].hp) + '/'+PlayerClient.list[selfId].hpMax, 0, 0.3*this.height);
            this.ctx.fillText('Frags (enemies): '+PlayerClient.list[selfId].fragEnemy, 0, 0.6*this.height);
            this.ctx.fillText('Frags (players): '+PlayerClient.list[selfId].fragPlayer, 0, 0.9*this.height);
            this.drawMinimap();
        }

      /*  if(this.counter % 40){
            this.updateMinimap();
        }

        this.counter++;*/
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


    createMinimap = () => {
        let sizeY = currentMap.map.mapTiles.length;
        let sizeX = currentMap.map.mapTiles[0].length;

        let imgSize = this.minimapSize;
        this.minimap = this.ctx.createImageData(imgSize, imgSize);
        this.minimapEntities = this.ctx.createImageData(imgSize, imgSize);
        let data = this.minimap.data;
        let dataEntities = this.minimapEntities.data;
        let ratio = imgSize/currentMap.map.size;
        let Ra: number[] = [];
        let Ga: number[] = [];
        let Ba: number[] = [];

        Ra[TerrainMaterial.dirt] = 255;
        Ra[TerrainMaterial.water] = 0;
        Ra[TerrainMaterial.stone] = 128;
        Ra[TerrainMaterial.darkdirt] = 139;

        Ga[TerrainMaterial.dirt] = 255;
        Ga[TerrainMaterial.water] = 0;
        Ga[TerrainMaterial.stone] = 128;
        Ga[TerrainMaterial.darkdirt] = 69;

        Ba[TerrainMaterial.dirt] = 0;
        Ba[TerrainMaterial.water] = 255;
        Ba[TerrainMaterial.stone] = 128;
        Ba[TerrainMaterial.darkdirt] = 19;

        let material: TerrainMaterial;
        //let playerPosition: Point = PlayerClient.list[selfId].position;

        for(let i = 0; i < imgSize; i++){
            for(let j = 0; j < imgSize; j++){
                material = currentMap.map.mapTiles[Math.floor(i/ratio)][Math.floor(j/ratio)].material;

                data[(j+i*imgSize)*4] = Ra[material];
                data[(j+i*imgSize)*4+1] = Ga[material];
                data[(j+i*imgSize)*4+2] = Ba[material];
                data[(j+i*imgSize)*4+3] = 255;

           /*     dataEntities[(j+i*imgSize)*4] = 255;
                dataEntities[(j+i*imgSize)*4+1] = 0;
                dataEntities[(j+i*imgSize)*4+2] = 0;
                dataEntities[(j+i*imgSize)*4+3] = 0;*/

/*
                for(let k in EnemyClient.list){
                    let enemyPosition: Point = EnemyClient.list[k].position;
                    if(Math.floor(enemyPosition.x/(TILE_SIZE*32)) == Math.floor(j/ratio) && Math.floor(enemyPosition.y/(TILE_SIZE*32)) == Math.floor(i/ratio)){
                        data[(j+i*imgSize)*4] = 0;
                        data[(j+i*imgSize)*4+1] = 0;
                        data[(j+i*imgSize)*4+2] = 0;
                        data[(j+i*imgSize)*4+3] = 255;
                    }
                }

                if(Math.floor(playerPosition.x/(TILE_SIZE*32)) == Math.floor(j/ratio) && Math.floor(playerPosition.y/(TILE_SIZE*32)) == Math.floor(i/ratio)){
                    data[(j+i*imgSize)*4] = 255;
                    data[(j+i*imgSize)*4+1] = 0;
                    data[(j+i*imgSize)*4+2] = 0;
                    data[(j+i*imgSize)*4+3] = 255;
                }
                */
            }
        }
    }

    updateMinimap = () => {
        if(this.minimapEntities !== undefined){
            let imgSize = this.minimapSize;
            
                    this.minimapEntities = this.ctx.createImageData(imgSize, imgSize);
                    let playerPosition: Point = PlayerClient.list[selfId].position;
                    let ratio = imgSize/currentMap.map.size;
                    let data = this.minimapEntities.data;
                    
                    let j = Math.floor((playerPosition.x/(TILE_SIZE*32))*ratio);
                    let i = Math.floor((playerPosition.y/(TILE_SIZE*32))*ratio);
                    
                    data[(j+i*imgSize)*4] = 255;
                    data[(j+i*imgSize)*4+1] = 0;
                    data[(j+i*imgSize)*4+2] = 0;
                    data[(j+i*imgSize)*4+3] = 255;
        


                    // create a temporary canvas
                    var tempCanvas=document.createElement("canvas");
                    var tempCtx=tempCanvas.getContext("2d");

                    // set the temp canvas size == the canvas size
                    tempCanvas.width=imgSize;
                    tempCanvas.height=imgSize;

                    tempCtx.putImageData(this.minimapEntities,0,0);

                    this.minimapEntitiesImg = new Image();
                    this.minimapEntitiesImg.src = tempCanvas.toDataURL();       
        }   
    }

    drawMinimap = () => {/*
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


                for(let k in EnemyClient.list){
                    let enemyPosition: Point = EnemyClient.list[k].position;
                    if(Math.floor(enemyPosition.x/(TILE_SIZE*32)) == Math.floor(j/ratio) && Math.floor(enemyPosition.y/(TILE_SIZE*32)) == Math.floor(i/ratio)){
                        data[(j+i*imgSize)*4] = 0;
                        data[(j+i*imgSize)*4+1] = 0;
                        data[(j+i*imgSize)*4+2] = 0;
                        data[(j+i*imgSize)*4+3] = 255;
                    }
                }

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
*/

        if(this.minimap !== undefined){
            this.ctx.putImageData(this.minimap, 5*(this.width)/6, (this.height- this.minimapSize)/2);
        }

        if(this.minimapEntitiesImg !== undefined){
          //  this.ctx.putImageData(this.minimapEntities, 5*(this.width)/6, (this.height- this.minimapSize)/2);
          this.ctx.drawImage(this.minimapEntitiesImg, 5*(this.width)/6, (this.height- this.minimapSize)/2);
        }

    }
}