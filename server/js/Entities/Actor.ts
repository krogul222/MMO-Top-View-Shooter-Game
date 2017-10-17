import { Inventory } from './../Inventory';
import { LifeAndBodyController } from './../LifeAndBodyController';
import { MapController } from './../MapControler';
import { Entity } from './Entity';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { AttackController } from '../AttackControler';
import { MovementController } from '../MovementController';
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
        this.updatePosition();
	}

    getClosestPlayer = (distance: number, angleLimit: number)  => {

    let closestEnemyIndex: string = "0";
    let closestEnemyDistance: number = 100000;
    let pangle = this.movementController.aimAngle;
    pangle = (pangle < 0) ? pangle + 360 : pangle;

    for(let i in Player.list) {
        let enemy = Player.list[i]; 
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
        let closestEnemyDistance: number = 100000;
        let pangle = this.movementController.aimAngle;
        pangle = (pangle < 0) ? pangle + 360 : pangle;

        for(let i in Enemy.list) {
            let enemy = Enemy.list[i];    
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