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

    constructor(param) {
         super(param);
         this.lifeAndBodyController = new LifeAndBodyController(this, param); 
         this.attackController = new AttackController(this, param);
         this.movementController = new MovementController(this, param);
         this.mapController = new MapController(param);
        }

	update = () => {
        this.movementController.updateSpd();
        this.attackController.update();
        this.updatePosition();
	}

    getClosestPlayer = () => {
        let distance = 10000;
        let index: string = "0";
        for(let i in Player.list){
            if(distance > this.getDistance(Player.list[i])){
                distance = this.getDistance(Player.list[i]);
                index = i; 
            }
        }
    return Player.list[index];
    }

    getClosestEnemy = (distance: number, angleLimit: number) => {
        let closestEnemyIndex: string = "0";
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
       
        return Enemy.list[closestEnemyIndex];
    }

    onDeath = () => {}
}