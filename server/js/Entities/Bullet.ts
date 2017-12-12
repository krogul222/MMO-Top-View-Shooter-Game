import { GameController } from './../Controllers/GameController';
import { Point } from './../GeometryAndPhysics';
import { Pack } from './../Pack';
import { Enemy } from './Enemy';
import { Actor } from './Actor';
import { Player } from './Player';
import { Entity } from './Entity';
import { initPack, removePack } from '../globalVariables';
import { MapController } from '../Controllers/MapControler';

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
    public startPosition: Point;

    constructor(param) {
        super(Bullet.updateParam(param));
        this.startPosition = new Point(this.position.x, this.position.y);
        this.mapController = new MapController(null);
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.angle = param.angle ? param.angle : this.angle;
        if(param.shootspeed !== undefined){
            this.spdX = param.shootspeed ? Math.cos(this.angle/180*Math.PI) * param.shootspeed : Math.cos(this.angle/180*Math.PI);
            this.spdY = param.shootspeed ? Math.sin(this.angle/180*Math.PI) * param.shootspeed : Math.sin(this.angle/180*Math.PI);
        }
        this.setSpdX(this.spdX);
        this.setSpdY(this.spdY);
        
        this.parent = param.parent ? param.parent : -1;
        
       // initPack.bullet.push(this.getInitPack());
        Bullet.list[this.id] = this;
    }

    get isToRemove() { return this.toRemove; }
 
    update = () => {
        this.updatePosition();
        if(this.timer++ > 50) this.toRemove = true;
        switch(this.combatType){
            case 'player': {   //bullet was shot by player
                let player: Player= Player.list[this.parent];
                let closeEnemies = player.getCloseEnemies();


                for(let key in closeEnemies){          // check if enemy was hit
                    let enemy: Enemy = Enemy.list[closeEnemies[key]]; 
                    if(this.testCollision(enemy)){
                        this.toRemove = true;
                        enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                        this.setHitProperties(1, "enemy", enemy.id);
                        break;
                    }
                }
                if(GameController.list[this.game] !== undefined){
                    let players = GameController.list[this.game].players;
                    
                    for(let key in players){         // check if player was hit
                        if(players[key].id !== this.parent){
                            let enemyPlayer: Player = players[key];
                            if(this.testCollision(enemyPlayer)){
                                this.toRemove = true;
                                enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                                this.setHitProperties(1, "player", enemyPlayer.id);
                            }
                        }
                    }
                }

                break;
            }

            case 'enemy': {   //bullet was shot by enemy
                let enemy: Enemy = Enemy.list[this.parent];

                if(GameController.list[this.game] !== undefined){
                    let players = GameController.list[this.game].players;
                    
                                    for(let key in players){
                                        let player: Player = players[key];
                                        if(this.testCollision(player)){
                                            this.toRemove = true;
                                            this.setHitProperties(1, "player", player.id);
                                            (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);
                    
                                        }
                                    }
                }

                break;
            }
        }

        let map = MapController.getMap(this.map);
        
        if(map.isPositionWall(this.position) > 2){
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
            startPosition: this.startPosition,
            map: this.map,
            img: this.img,
            width: this.width,
            height: this.height,
            combatType: this.combatType,
            hitCategory: this.hitCategory,
            hitEntityCategory: this.hitEntityCategory,
            hitEntityId: this.hitEntityId
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
      //  let pack: any[] =[];
        for(let i in Bullet.list){
            let bullet: Bullet = Bullet.list[i];
            //bullet.update();
            if(bullet.toRemove){
                initPack.bullet.push(bullet.getInitPack());
                GameController.list[bullet.game].initPack.bullet.push(bullet.getInitPack());
                delete Bullet.list[i];
              //  removePack.bullet.push({id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId});
            } else {
               // pack.push(bullet.getUpdatePack());     
            }
        }
      //  return pack;
    }

    static getAllInitPack = function(){
        let bullets: any[] = [];
        for(let i in Bullet.list){
            bullets.push(Bullet.list[i].getInitPack());
        }
        return bullets;
    }

    static getAllSpecificInitPack = function(game){
  /*      let bullets: any[] = [];
        if(GameController.list[game] !== undefined){
            let e = GameController.list[game].enemies;
            for(let i in Bullet.list){
                bullets.push(Bullet.list[i].getInitPack());
            }
        }
        return bullets;*/
    }

    static updateParam = (param) => {
        param.id = Math.random();
        return param;
    }

    static list = {};
}