import { imageName } from './../Constants';
import { Player } from './Player';
import { Entity } from './Entity';
import { initPack, removePack } from '../globalVariables';
import { frameCount } from '../../../app';
import { Point } from '../GeometryAndPhysics';
import { UpgradeCategory, randomEnum, ItemType, WeaponAmmoType } from '../enums';
import { MapController } from '../Controllers/MapControler';
import { GameController } from './../Controllers/GameController';

export class Upgrade extends Entity{
    private category: number = -1;
    private kind: number = -1;
    value: number = 0; 
    
    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = (param.category !== undefined) ? param.category: this.category;
        this.kind = (param.kind !== undefined) ? param.kind : this.kind;
        this.value = (param.value !== undefined) ? param.value : this.value;
        Upgrade.list[this.id] = this;

        if(GameController.list[this.game] !== undefined)
            GameController.list[this.game].initPack.upgrade.push(this.getInitPack());

        GameController.list[this.game].addUpgrade(this);
    }

    getInitPack = function(){
        return {
           id: this.id,
           position: this.position,
           map: this.map,
           img: this.img,
           width: this.width,
           height: this.height,
           category: this.category,
           kind: this.kind
        };
    }
    
    getUpdatePack = function(){
        return {
           id: this.id,
           position: this.position
        };
    }   

    static updateParam = (param) => {
        param.type = "upgrade";
        return param;
    }

    static update = () => {
        let pack: any = [];
        
        for(let i in Player.list){
            let player: Player = Player.list[i];
            let closeUpgrades = player.getCloseUpgrades();
            for(let key in closeUpgrades){
                let upgrade: Upgrade = Upgrade.list[closeUpgrades[key]];
              /*  upgrade.update();
                pack.push(upgrade.getUpdatePack());*/

                let isColliding = player.testCollision(upgrade);

                if(isColliding) {
                    if(upgrade.category === UpgradeCategory.item) player.inventory.addItem(upgrade.kind, 1);

                    if(upgrade.category === UpgradeCategory.ammo) player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind-1000, upgrade.value);
    
                    removePack.upgrade.push(upgrade.id);               
                    delete Upgrade.list[key];
                    break;
                }
            }
        }
        return pack;
    }

    static updateSpecific = (upgrades) => {
        let pack: any = [];
        
        for(let i in Player.list){
            let player: Player = Player.list[i];
            let closeUpgrades = player.getCloseUpgrades();
            for(let key in closeUpgrades){
                let upgrade: Upgrade = Upgrade.list[closeUpgrades[key]];
                /*upgrade.update();
                pack.push(upgrade.getUpdatePack());*/
                if(upgrade !== undefined){
                    let gameId = upgrade.game;
                    let isColliding = player.testCollision(upgrade);
    
                    if(isColliding) {
                        if(upgrade.category === UpgradeCategory.item) player.inventory.addItem(upgrade.kind, 1);
    
                        if(upgrade.category === UpgradeCategory.ammo) player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind-1000, upgrade.value);
                    
                        removePack.upgrade.push(upgrade.id);   
                        
                        GameController.list[gameId].removePack.upgrade.push(upgrade.id);
    
                        delete Upgrade.list[closeUpgrades[key]];
                        delete closeUpgrades[key];
    
                        if(GameController.list[gameId].itemRespawn == true)
                            Upgrade.randomlyGenerate(GameController.list[gameId]);
                        
                        break;
                    }
                }
            }
        }
        return pack;
    }    

    static getAllInitPack = function(){
        let upgrades: any = [];
        for(let i in Upgrade.list)
            upgrades.push(Upgrade.list[i].getInitPack());
        return upgrades;
    }

    static randomlyGenerate = (game: GameController, category: any = null, kind: any = null) => {
        let map = MapController.getMap(game.map);
        
        let x = Math.random()*map.width;
        let y = Math.random()*map.height;
        let position = new Point(x,y);
        
        while(map.isPositionWall(position) !== 0){
            x = Math.random() * map.width; 
            y = Math.random() * map.height;  
            position.updatePosition(x, y);
        }

        let height = 32;
        let width = 32;
        let id = Math.random(); 
        let upgCategory: any;
        let upgKind: any;
        let upgValue: number = 0;
        let img: any;

        if(category && kind){
            upgCategory = category;
            upgKind = kind;  
        } else {
            upgCategory = (Math.random()<0.5) ? UpgradeCategory.item : UpgradeCategory.ammo;

            if(upgCategory == UpgradeCategory.item) upgKind = randomEnum(ItemType);
            if(upgCategory == UpgradeCategory.ammo){
                upgKind = randomEnum(WeaponAmmoType);
                upgValue = 20;
            } 
        }
        img = imageName[upgKind]; 
        new Upgrade({id: id, position: position, width: width, game: game.id, height: height, category: upgCategory, kind: upgKind , map: game.map, img: img, value: upgValue});
    }
    static list = {};
}