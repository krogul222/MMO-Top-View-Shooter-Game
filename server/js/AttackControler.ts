import { Enemy, Player, Actor } from './Entities';
import { SingleWeapon, WeaponCollection } from './../../client/js/WeaponCollection';
import { Counter } from './../../client/js/Counter';
import { WeaponType } from '../../client/js/enums';

export class AttackController {
    melee: boolean = true;
    attackStarted: boolean = false;
    reloadCounter: Counter = new Counter(25);
    attackCounter: Counter = new Counter(25);
    activeWeapon: SingleWeapon = new SingleWeapon( WeaponType.knife, 1 ); 
    weaponCollection = new WeaponCollection();

    constructor (private parent: Actor) {}

    update = () => {
        this.reloadCounter.setInc(this.activeWeapon.reloadSpd);
        this.attackCounter.setInc(this.activeWeapon.attackSpd);

        if(this.reloadCounter.resetIfMax()){
            this.reloadCounter.deactivate();
            this.activeWeapon.reload();
        }

        this.reloadCounter.count();
        this.attackCounter.count();
    }

    performAttack = () => {
        if ( !this.reloadCounter.isActive() && this.attackCounter.resetIfMax() ) {
            this.attackStarted = true;

            this.melee = (this.activeWeapon.ammo > 0) ? this.melee : true;
            
            this.melee ? this.closeAttack(this.parent.aimAngle) : this.distanceAttack();
        }
    }

    closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);

    attackCloseByEnemy = (aimAngle) => {
        let player: Player = this.parent.getClosestPlayer();
        let distance = 80;
        let maxDistance = Math.sqrt(player.width*player.width/4+player.height*player.height/4) + distance;

        if(player){
            if(this.parent.getDistance(player) < maxDistance){ player.hp -= this.activeWeapon.meleeDmg; }
        }

    }

    attackCloseByPlayer = (aimAngle) => {
        let enemy: Enemy = this.parent.getClosestEnemy(40, 45);
        if(enemy) { enemy.hp -= this.activeWeapon.meleeDmg; }
    }

    distanceAttack = () => {
        if(this.weaponCollection.shoot(this.activeWeapon.weapon,1)){
            let shootSpeed = this.activeWeapon.shootSpeed;
            let aimAngle = this.parent.aimAngle;
            let attackRadius = this.activeWeapon.attackRadius;

            this.shootBullet(this.parent.aimAngle, shootSpeed, shootSpeed);

            for(let i = 0; i < attackRadius; i++){
                this.shootBullet(aimAngle+(i+1)*2, shootSpeed, shootSpeed);
                this.shootBullet(aimAngle-(i+1)*2, shootSpeed, shootSpeed);

            }
        }
    }

    shootBullet = (aimAngle, shootSpeedX, shootSpeedY) => {

    }
}