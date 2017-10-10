import { SingleWeapon, WeaponCollection } from './WeaponCollection';
import { Counter } from './Counter';
import { Actor } from './Entities/Actor';
import { Player } from './Entities/Player';
import { Enemy } from './Entities/Enemy';
import { Point, Velocity } from './GeometryAndPhysics';
import { Bullet } from './Entities/Bullet';
import { WeaponType } from './enums';

export class AttackController {
    private _melee: boolean = true;
    private _attackStarted: boolean = false;
    private _reloadCounter: Counter = new Counter(25);
    private _attackCounter: Counter = new Counter(25);
    private _activeWeapon: SingleWeapon = new SingleWeapon( {weapon: WeaponType.knife, ammo: 1 }); 
    private _weaponCollection = new WeaponCollection();
    private _pressingAttack: boolean = false;


    constructor (private parent: Actor, param) {
        if(param.atkSpd) this._attackCounter.setInc(param.atkSpd);
    }

    update = () => {
        this._reloadCounter.setInc(this._activeWeapon.reloadSpd);
        this._attackCounter.setInc(this._activeWeapon.attackSpd);

        if(this._reloadCounter.resetIfMax()){
            this._reloadCounter.deactivate();
            this._activeWeapon.reload();
        }

        this._reloadCounter.count();
        this._attackCounter.count();
    }

    performAttack = () => {
        if ( !this._reloadCounter.isActive() && this._attackCounter.resetIfMax() && this._pressingAttack) {
            this._attackStarted = true;

            this._melee = (this._activeWeapon.ammo > 0) ? this._melee : true;
            
            this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();
        }
    }

    closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);

    attackCloseByEnemy = (aimAngle) => {
        let player: Player = this.parent.getClosestPlayer();
        let distance = 80;
        let maxDistance = Math.sqrt(player.width*player.width/4+player.height*player.height/4) + distance;

        if(player){
            if(this.parent.getDistance(player) < maxDistance){ player.lifeAndBodyController.wasHit( this._activeWeapon.meleeDmg ); }
        }

    }

    attackCloseByPlayer = (aimAngle) => {
        let enemy: Enemy = this.parent.getClosestEnemy(40, 45);
        if(enemy) { enemy.lifeAndBodyController.wasHit( this._activeWeapon.meleeDmg); }
    }

    distanceAttack = () => {
        if(this._weaponCollection.shoot(this._activeWeapon.weapon,1)){
            let shootSpeed = this._activeWeapon.shootSpeed;
            let aimAngle = this.parent.movementController.aimAngle;
            let attackRadius = this._activeWeapon.attackRadius;

            this.shootBullet(this.parent.movementController.aimAngle, shootSpeed, shootSpeed);

            for(let i = 0; i < attackRadius; i++){
                this.shootBullet(aimAngle+(i+1)*2, shootSpeed, shootSpeed);
                this.shootBullet(aimAngle-(i+1)*2, shootSpeed, shootSpeed);

            }
        }
    }

    shootBullet = (aimAngle, shootSpeedX, shootSpeedY) => {
        new Bullet({
            parent: this.parent.id,
            combatType: this.parent.type,
            angle: aimAngle,
            position: new Point(this.parent.position.x, this.parent.position.y),
            map: this.parent.map, 
            img: 'bullet',
            width: 8,
            height: 8, 
            speed: new Velocity(shootSpeedX, shootSpeedY)
        });
    }

    getDamage = () => {
        let damage: number = 0;
        
        damage = (this._melee) ? this._activeWeapon.meleeDmg : this._activeWeapon.shootDmg;

        return damage;
    }

    get melee() { return this._melee; }
    get pressingAttack() { return this._pressingAttack; }
    get weaponCollection() { return this._weaponCollection; }
    get activeWeapon() { return this._activeWeapon; }
    get reloadCounter() { return this._reloadCounter; }
    get attackCounter() { return this._attackCounter; }
    get attackStarted() { return this._attackStarted; }

    set pressingAttack(value: boolean) { this._pressingAttack = value; }
    set attackStarted(value: boolean) { this._attackStarted = value; }

}