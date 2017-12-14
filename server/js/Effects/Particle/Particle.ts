import { GameController } from './../../Controllers/GameController';
import { Player } from './../../Entities/Player';
import { Entity } from './../../Entities/Entity';
import { initPack, removePack } from './../../globalVariables';
import { ParticleType } from './../../enums';
import { Point, Rectangle, Size, testCollisionRectRect } from './../../GeometryAndPhysics';
import { Enemy } from '../../Entities/Enemy';

declare var ctx: any;

export class Particle{
    position: Point = new Point(0, 0);  // Set the initial x and y positions
    velocity: Point = new Point(0, 0);  // Set the initial velocity
    size: number = 40;
    life: number = 0;
    maxLife: number = 10;
    toRemove: boolean = false;
    type: ParticleType;
    id: number = Math.random();
    parent: number;
    combatType: string = 'player';
    game;

    constructor(param){

        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.type = (param.type !== undefined) ? param.type : ParticleType.fire;

        if(param.position !== undefined){
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }

        if(param.velocity !== undefined){
            this.velocity.x = param.velocity.x;
            this.velocity.y = param.velocity.y;
        }

        this.parent = param.parent ? param.parent : -1;
        this.combatType = param.combatType ? param.combatType : this.combatType;

        this.game = (param.game !== undefined) ? param.game : 0;

       // initPack.particle.push(this.getInitPack());
        Particle.list[this.id] = this; 
    }

    update = () => {
        this.position.x += this.velocity.x;
        this.position.y+=this.velocity.y;
        this.life++;
        if(this.life >= this.maxLife) this.toRemove = true;

        if(this.type == ParticleType.fire){

            switch(this.combatType){
                case 'player': {   //bullet was shot by player
                    
                    let player: Player= Player.list[this.parent];
                    if(player !== undefined){
                        let closeEnemies = player.getCloseEnemies();
                        
                            for(let key in closeEnemies){          // check if enemy was hit
                                let enemy: Enemy = Enemy.list[closeEnemies[key]]; 
                                if(enemy){
                                    if(this.testCollision(enemy)){
                                        //this.toRemove = true;
                                        enemy.lifeAndBodyController.wasHit(1*this.life/this.maxLife);
                                        enemy.lifeAndBodyController.startBurn(100);
                                        if(enemy.lifeAndBodyController.isDead() && enemy.getScore()>0){
                                            player.incFragEnemy();
                                        }
                                    }
                                } 
                            }
                    }


                   // let player: Player= Player.list[this.parent];
                   if(GameController.list[this.game] !== undefined){
                        let players = GameController.list[this.game].players;
                        for(let key in players){         // check if player was hit
                            if(players[key].id !== this.parent){
                                let enemyPlayer: Player = players[key];
                                if(this.testCollision(enemyPlayer)){
                                // this.toRemove = true;

                                    if(enemyPlayer.lifeAndBodyController.wasHit(1*this.life/this.maxLife)){
                                        player.incFragPlayer();
                                    }
                                    enemyPlayer.lifeAndBodyController.startBurn(100);
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

                                    for(let key in Player.list){
                                        let player: Player = Player.list[key];
                                        if(this.testCollision(player)){
                                         //   this.toRemove = true;
                                            player.lifeAndBodyController.wasHit(1*this.life/this.maxLife);
                                            player.lifeAndBodyController.startBurn(100);
                                        }
                                    }
                    }

                    if(GameController.list[this.game] !== undefined){

                        let enemies = GameController.list[this.game].enemies;

                                    for(let key in enemies){          // check if enemy was hit
                                        if(enemies.id !== this.parent){
                                            let enemy: Enemy = enemies[key]; 
                                            if(this.testCollision(enemy)){
                                                //this.toRemove = true;
                                                enemy.lifeAndBodyController.wasHit(1*this.life/this.maxLife);
                                                enemy.lifeAndBodyController.startBurn(100);
                                            }
                                        }
                                    }
                    }
                    break;
                }


            }


        }
    }

    testCollision = (entity: Entity) => {
        
                let pos1 = new Point(this.position.x - (this.size/4), this.position.y - (this.size/4));
                let pos2 = new Point(entity.position.x - (entity.width/4), entity.position.y - (entity.height/4));
                
                let rect1 = new Rectangle(pos1, new Size(this.size/2, this.size/2));
                let rect2 = new Rectangle(pos2, new Size(entity.width/2, entity.height/2));
        
                return testCollisionRectRect(rect1,rect2);
            }

    static update = () => {
        let pack: any[] =[];
        for(let i in Particle.list){
            let particle = Particle.list[i];
            particle.update();
            if(particle.toRemove){
                delete Particle.list[i];
                removePack.particle.push({id: particle.id});
            } else {
                pack.push(particle.getUpdatePack());     
            }
        }
        return pack;
    }

    getInitPack = () => {
        return {
            id: this.id,
            position: this.position,
            map: GameController.list[this.game].map,
            size: this.size,
            type: this.type,
            maxLife: this.maxLife
        }
    }

    getUpdatePack = () => {
        return {
           id: this.id,
           position: this.position,
           life: this.life
        };
    }  

    static list = {};
}