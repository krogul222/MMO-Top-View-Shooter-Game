import { MapController } from './../MapControler';
import { AttackController } from './../AttackControler';
import { Enemy } from './Enemy';
import { LifeAndBodyController } from './../LifeAndBodyController';
import { Entity, initPack, removePack } from './Entity';
import { Actor } from './Actor';
import { Player } from './Player';

export class Bullet extends Entity{

    private combatType: string = 'player';
    private angle: number = 0;
    private spdX: number = 1;
    private spdY: number = 1;
    private parent: number;
    private timer: number = 0;
    private toRemove: boolean = false;
    private mapController: MapController;

    private hitCategory: number = 0;
    private hitEntityCategory: string = "";
    private hitEntityId: number = -1;

    constructor(param) {
        super(param);
        this.mapController = new MapController(null);
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.angle = param.angle ? param.angle : this.angle;
        this.spdX = param.spd ? Math.cos(this.angle/180*Math.PI) * param.spd : Math.cos(this.angle/180*Math.PI);
        this.spdY = param.spd ? Math.sin(this.angle/180*Math.PI) * param.spd : Math.sin(this.angle/180*Math.PI);
        this.parent = param.parent ? param.parent : -1;

        initPack.bullet.push(this.getInitPack());
        Bullet.list[this.id] = this;
    }

    update = () => {
        super.update();
        if(this.timer++ > 100) this.toRemove = true;
    
        switch(this.combatType){
            case 'player': {   //bullet was shot by player
                let player: Player= Player.list[this.parent];

                for(let key in Enemy.list){          // check if enemy was hit
                    let enemy: Enemy = Enemy.list[key]; 
                    if(this.testCollision(enemy)){
                        this.toRemove = true;
                        enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                        this.setHitProperties(1, "enemy", enemy.id);
                    }
                }

                for(let key in Player.list){         // check if player was hit
                    if(Player.list[key].id !== this.parent){
                        let enemyPlayer: Player = Player.list[key];
                        if(this.testCollision(enemyPlayer)){
                            this.toRemove = true;
                            enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                            this.setHitProperties(1, "player", enemyPlayer.id);
                        }
                    }
                }
                break;
            }

            case 'enemy': {   //bullet was shot by enemy
                let enemy: Enemy = Enemy.list[this.parent];

                for(let key in Player.list){
                    let player: Player = Player.list[key];
                    if(this.testCollision(player)){
                        this.toRemove = true;
                        this.setHitProperties(1, "player", player.id);
                        (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);

                    }
                }
                break;
            }
        }

        let map = this.mapController.getMap(this.map);
        
        if(map.isPositionWall(this.position) && map.isPositionWall(this.position) !== 2){
            this.toRemove = true;
            this.hitCategory = 2;
        }
    }

    setHitProperties = (hitCategory, hitEntityCategory, hitEntityId) => {
        this.hitCategory = hitCategory;
        this.hitEntityCategory = hitEntityCategory;
        this.hitEntityId = hitEntityId;
    }

    getInitPack = () => {
        return {
            id: this.id,
            position: this.position,
            map: this.map,
            img: this.img,
            width: this.width,
            height: this.height,
            combatType: this.combatType,
            hitCategory: this.hitCategory
        }
    }

    getUpdatePack = () => {
        return {
           id: this.id,
           position: this.position,
           hitCategory: this.hitCategory
        };
    }  

    static update = () =>{
        let pack =[];
        for(let i in Bullet.list){
            let bullet = Bullet.list[i];
            bullet.update();
            if(bullet.toRemove){
                delete Bullet.list[i];
                removePack.bullet.push({id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId});
            } else {
                pack.push(bullet.getUpdatePack());     
            }
        }
        return pack;
    }

    static getAllInitPack = function(){
        let bullets = [];
        for(let i in Bullet.list){
            bullets.push(Bullet.list[i].getInitPack());
        }
        return bullets;
    }

    static list:{};
}