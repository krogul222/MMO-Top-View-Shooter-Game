import { MAX_DISTANCE } from './../globalVariables';
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
    
    private _lifeAndBodyController: LifeAndBodyController;
    private _attackController: AttackController;
    private _movementController: MovementController;
    private _mapController: MapController;
    private _inventory: Inventory;
    private score: number = 1;

    constructor(param) {
         super(param);
         this._lifeAndBodyController = new LifeAndBodyController(this, param); 
         this._attackController = new AttackController(this, param);
         this._movementController = new MovementController(this, param);
         this._mapController = new MapController(param);
         this._inventory = new Inventory(param.socket, true, this);
        }

    get lifeAndBodyController(){ return this._lifeAndBodyController; }
    get attackController(){ return this._attackController; }
    get movementController(){ return this._movementController; }
    get mapController(){ return this._mapController; }
    get inventory(){ return this._inventory; }

	update = () => {
        this._movementController.updateSpd();
        this._attackController.update();
        this._lifeAndBodyController.update();
        this.updatePosition();
    }
    getScore = () => {
        let score = this.score;
        this.score = 0;
        return score;
    }

    getClosestPlayer = (distance: number, angleLimit: number)  => {
        let closestEnemyIndex: string = "0";
        let closestEnemyDistance: number = MAX_DISTANCE;
        let pangle = this._movementController.aimAngle;
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

        return players[closestEnemyIndex];    
    }

    getClosestEnemy = (distance: number, angleLimit: number) => {
        let closestEnemyIndex: string = "-1";
        let closestEnemyDistance: number = MAX_DISTANCE;
        let pangle = this._movementController.aimAngle;
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

        return enemies[closestEnemyIndex];
    }

    getClosestPlayerorEnemy = (distance: number, angleLimit: number) => {
        let enemy: Enemy = this.getClosestEnemy(distance, angleLimit);
        let player: Player = this.getClosestPlayer(distance, angleLimit);

        if(this.getDistance(enemy) < this.getDistance(player)){
            if(enemy !== undefined)
                return enemy;
            else
                return null;
        } else{
            if(player !== undefined)
                return player;
            else
                return null;
        }
    }
    onDeath = () => {}
}