import { GameController } from './../Controllers/GameController';
import { Inventory } from './../Inventory/Inventory';
import { MapController } from './../Controllers/MapControler';
import { MovementController } from './../Controllers/MovementController';
import { AttackController } from './../Controllers/AttackControler';
import { LifeAndBodyController } from './../Controllers/LifeAndBodyController';

import { Entity } from './Entity';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { calculateAngleBetweenEntities } from '../GeometryAndPhysics';


export class Actor extends Entity {
    
    lifeAndBodyController: LifeAndBodyController;
    attackController: AttackController;
    movementController: MovementController;
    mapController: MapController;
    inventory: Inventory;

    constructor(param) {
         super(param);
         this.lifeAndBodyController = new LifeAndBodyController(this, param); 
         this.attackController = new AttackController(this, param);
         this.movementController = new MovementController(this, param);
         this.mapController = new MapController(param);
         this.inventory = new Inventory(param.socket, true, this);
        }

	update = () => {
        this.movementController.updateSpd();
        this.attackController.update();
        this.lifeAndBodyController.update();
        this.updatePosition();
	}

    getClosestPlayer = (distance: number, angleLimit: number)  => {

    let closestEnemyIndex: string = "0";
    let closestEnemyDistance: number = 100000000;
    let pangle = this.movementController.aimAngle;
    pangle = (pangle < 0) ? pangle + 360 : pangle;
    
    let players = GameController.list[this.game].players;

    for(let i in players) {
        let enemy = players[i]; 
        if(enemy !== this){   
            let angle = calculateAngleBetweenEntities(this, enemy);
            let maxDistance = Math.sqrt(enemy.width*enemy.width/4 +enemy.height*enemy.height/4) + distance;
            let distanceFromEnemy = this.getDistance(enemy);

            if(distanceFromEnemy < maxDistance){
                if((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)){
                    if(closestEnemyDistance > distanceFromEnemy){
                        closestEnemyDistance = distanceFromEnemy;
                        closestEnemyIndex = i; 
                    }
                }
            }
        }
    }
   
    if(closestEnemyIndex == "-1") return null;

    return Player.list[closestEnemyIndex];    
    }

    getClosestEnemy = (distance: number, angleLimit: number) => {
        let closestEnemyIndex: string = "-1";
        let closestEnemyDistance: number = 100000000;
        let pangle = this.movementController.aimAngle;
        pangle = (pangle < 0) ? pangle + 360 : pangle;

        let enemies = GameController.list[this.game].enemies;

        for(let i in enemies) {
            let enemy = enemies[i];    
            let angle = calculateAngleBetweenEntities(this, enemy);
            let maxDistance = Math.sqrt(enemy.width*enemy.width/4 +enemy.height*enemy.height/4) + distance;
            let distanceFromEnemy = this.getDistance(enemy);

            if(distanceFromEnemy < maxDistance){
                if((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)){
                    if(closestEnemyDistance > distanceFromEnemy){
                        closestEnemyDistance = distanceFromEnemy;
                        closestEnemyIndex = i; 
                    }
                }
            }
        }
       
        if(closestEnemyIndex == "-1") return null;

        return Enemy.list[closestEnemyIndex];
    }

    getClosestPlayerorEnemy = (distance: number, angleLimit: number) => {
        let enemy: Enemy = this.getClosestEnemy(distance, angleLimit);
        let player: Player = this.getClosestPlayer(distance, angleLimit);

        if(this.getDistance(enemy) < this.getDistance(player)){
            if(enemy !== null){
                return enemy;
            } else{
                return null;
            }
        } else{
            if(player !== null){
                return player;
            } else{
                return null;
            }
        }
    
    }
    onDeath = () => {}
}