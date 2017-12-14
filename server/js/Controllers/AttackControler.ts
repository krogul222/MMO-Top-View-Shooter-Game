import { AttackType } from './../enums';
import { Flame } from './../Effects/Flame';
import { Bullet } from './../Entities/Bullet';
import { Actor } from './../Entities/Actor';
import { WeaponCollection, SingleWeapon } from './../Weapons/WeaponCollection';
import { Counter } from './../Counter';
import { WeaponTypes } from '../Weapons/WeaponTypes';
import { Player } from '../Entities/Player';
import { WeaponType } from '../enums';
import { Point } from '../GeometryAndPhysics';


export class AttackController {
    private _melee: boolean = true;
    private _attackStarted: boolean = false;
    private _reloadCounter: Counter = new Counter(50);
    private _attackCounter: Counter = new Counter(25);
    private _activeWeapon: SingleWeapon;
    private _weaponCollection: WeaponCollection;
    private _pressingAttack: boolean = false;
    private _flame: Flame;
    private _accuracy: number = 0;

    constructor (private parent: Actor, param) {
        this._weaponCollection = new WeaponCollection(this.parent);
        this._activeWeapon = new SingleWeapon(this.parent, {weapon: "0", ammo: "20", parent: this.parent});
        if(param.atkSpd) this._attackCounter.setInc(param.atkSpd);

        this._flame = new Flame({parent: parent, game: this.parent.game, offset: 50, life: 30});
        
        //this.equip(WeaponType.knife);
        this.attackCounter.activate();
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

        this.performAttack();

        if(this._pressingAttack == false) this._flame.create = false;

        
    }

    performAttack = () => {
        if ( !this._reloadCounter.isActive() && this._pressingAttack) {
            if(this._attackCounter.resetIfMax()){
                this._attackStarted = true;
                this._melee = (this._activeWeapon._ammoInGun > 0) ? WeaponTypes.getWeaponParameters(this._activeWeapon.weapon).attackMelee : true;
                this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();   
            }
        }
    }

    closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);

    attackCloseByEnemy = (aimAngle) => {
        let player: Player = this.parent.getClosestPlayer(10000000, 360);
        let distance = 80;
        if(player){

        let maxDistance = Math.sqrt(player.width*player.width/4+player.height*player.height/4) + distance;
        if(this.parent.getDistance(player) < maxDistance){ player.lifeAndBodyController.wasHit( this._activeWeapon.meleeDmg ); }
        
        }

    }

    attackCloseByPlayer = (aimAngle) => {
        let enemy: Actor = this.parent.getClosestPlayerorEnemy(20, 45);
        if(enemy) { enemy.lifeAndBodyController.wasHit( this._activeWeapon.meleeDmg); }
    }

    distanceAttack = () => {
        if(this._activeWeapon.shoot(1)){
            let shootSpeed = this._activeWeapon.shootSpeed;
            let accuracy = (Math.random()-0.5)*this._accuracy;
            let aimAngle = this.parent.movementController.aimAngle+accuracy;
            let attackRadius = this._activeWeapon.attackRadius;

            if(this._activeWeapon.attackType == AttackType.bullet){

                this.shootBullet(aimAngle, shootSpeed);
                
                            for(let i = 0; i < attackRadius; i++){
                                this.shootBullet(aimAngle+(i+1)*2, shootSpeed);
                                this.shootBullet(aimAngle-(i+1)*2, shootSpeed);
                            }
            }

            if(this._activeWeapon.attackType == AttackType.fire){
                this._flame.create = true;
                this._flame.update();
            }

        }
    }

    equip = (weapon: WeaponType) => {
        this.activeWeapon.equip(weapon);
        let weaponProperties: WeaponTypes =  WeaponTypes.list[weapon];
        this._melee = weaponProperties.attackMelee;

        console.log("BRON: "+weaponProperties.name+" "+"melee:"+weaponProperties.attackMelee);
    }

    shootBullet = (aimAngle, shootSpeed) => {
        let b: Bullet = new Bullet({
            parent: this.parent.id,
            combatType: this.parent.type,
            angle: aimAngle,
            position: new Point(this.parent.position.x, this.parent.position.y),
            map: this.parent.map,
            game: this.parent.game, 
            img: 'bullet',
            width: 8,
            height: 8, 
            shootspeed: shootSpeed
        });

        let counter: number = 0;
        while(!b.isToRemove){
            b.update();
            counter++;
            if(counter == 1){
                b.startPosition.x = b.position.x;
                b.startPosition.y = b.position.y;
            } 
        }
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

    set accuracy(value: number) { this._accuracy = value; }

}