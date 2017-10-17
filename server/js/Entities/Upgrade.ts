import { Player } from './Player';
import { Entity } from './Entity';
import { initPack, removePack } from '../globalVariables';
import { frameCount } from '../../../app';

export class Upgrade extends Entity{
    private category: string = "";
    private kind: number = -1;
    value: number = 0;

    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = param.category ? param.category: this.category;
        this.kind = param.kind ? param.kind : this.kind;
        this.value = param.value ? param.value : this.value;
        
        initPack.upgrade.push(this.getInitPack());
        Upgrade.list[this.id] = this;
    }

    getInitPack = function(){
        return {
           id: this.id,
           position: this.position,
           map: this.map,
           img: this.img,
           width: this.width,
           height: this.height,
           category: this.category
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
        
        if(frameCount % 250 === 0) Upgrade.randomlyGenerate('forest'); //every 10 sec

        for(let key in Upgrade.list){
            let upgrade: Upgrade = Upgrade.list[key];
            upgrade.update();
            pack.push(upgrade.getUpdatePack());
            
            for(let i in Player.list){
                let player: Player = Player.list[i];

                let isColliding = player.testCollision(upgrade);

                if(isColliding) {
                    if(upgrade.category === 'item') player.inventory.addItem(upgrade.kind, 1);

                    if(upgrade.category === 'ammo') player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind, upgrade.value);
                
                    removePack.upgrade.push(upgrade.id);               
                    delete Upgrade.list[key];
                    break;
                }

            }
            
        }
    }

    static randomlyGenerate = (map: any) => {

    }
    static list = {};
}