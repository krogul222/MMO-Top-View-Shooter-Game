import { MapController } from './MapControler';
import { Counter } from './../../client/js/Counter';
import { Velocity, Size, Point, Rectangle, testCollisionRectRect, calculateAngleBetweenEntities } from './../../client/js/GeometryAndPhysics';
import { WeaponCollection, SingleWeapon } from './../../client/js/WeaponCollection';
import { WeaponType } from './../../client/js/enums'
import { AttackController } from './AttackControler';
import { Entity } from './Entity';
import { MovementController } from './MovementController';


export class Actor extends Entity {
    aimAngle: number;
    hp: number;
    attackController: AttackController = new AttackController(this);
    movementController: MovementController = new MovementController(this);
    mapController: MapController = new MapController();

    constructor(param) { super(param); }

	update = () => {
        this.movementController.updateSpd();
        this.attackController.update();
        super.update();
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
        let pangle = this.aimAngle;
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
}

export class Enemy extends Actor {
    constructor(param) { super(param) } 

    static list: Enemy[];
}

export class Player extends Actor {
    constructor(param) { super(param) } 

    static list: Player[];
}