Object.defineProperty(exports, "__esModule", { value: true });
const WeaponCollection_1 = require("./WeaponCollection");
const Counter_1 = require("./Counter");
const GeometryAndPhysics_1 = require("./GeometryAndPhysics");
const Bullet_1 = require("./Entities/Bullet");
const enums_1 = require("./enums");
class AttackController {
    constructor(parent, param) {
        this.parent = parent;
        this._melee = true;
        this._attackStarted = false;
        this._reloadCounter = new Counter_1.Counter(25);
        this._attackCounter = new Counter_1.Counter(25);
        this._activeWeapon = new WeaponCollection_1.SingleWeapon(enums_1.WeaponType.knife, 1);
        this._weaponCollection = new WeaponCollection_1.WeaponCollection();
        this._pressingAttack = false;
        this.update = () => {
            this._reloadCounter.setInc(this._activeWeapon.reloadSpd);
            this._attackCounter.setInc(this._activeWeapon.attackSpd);
            if (this._reloadCounter.resetIfMax()) {
                this._reloadCounter.deactivate();
                this._activeWeapon.reload();
            }
            this._reloadCounter.count();
            this._attackCounter.count();
        };
        this.performAttack = () => {
            if (!this._reloadCounter.isActive() && this._attackCounter.resetIfMax() && this._pressingAttack) {
                this._attackStarted = true;
                this._melee = (this._activeWeapon.ammo > 0) ? this._melee : true;
                this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();
            }
        };
        this.closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);
        this.attackCloseByEnemy = (aimAngle) => {
            let player = this.parent.getClosestPlayer();
            let distance = 80;
            let maxDistance = Math.sqrt(player.width * player.width / 4 + player.height * player.height / 4) + distance;
            if (player) {
                if (this.parent.getDistance(player) < maxDistance) {
                    player.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
                }
            }
        };
        this.attackCloseByPlayer = (aimAngle) => {
            let enemy = this.parent.getClosestEnemy(40, 45);
            if (enemy) {
                enemy.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
            }
        };
        this.distanceAttack = () => {
            if (this._weaponCollection.shoot(this._activeWeapon.weapon, 1)) {
                let shootSpeed = this._activeWeapon.shootSpeed;
                let aimAngle = this.parent.movementController.aimAngle;
                let attackRadius = this._activeWeapon.attackRadius;
                this.shootBullet(this.parent.movementController.aimAngle, shootSpeed, shootSpeed);
                for (let i = 0; i < attackRadius; i++) {
                    this.shootBullet(aimAngle + (i + 1) * 2, shootSpeed, shootSpeed);
                    this.shootBullet(aimAngle - (i + 1) * 2, shootSpeed, shootSpeed);
                }
            }
        };
        this.shootBullet = (aimAngle, shootSpeedX, shootSpeedY) => {
            new Bullet_1.Bullet({
                parent: this.parent.id,
                combatType: this.parent.type,
                angle: aimAngle,
                position: new GeometryAndPhysics_1.Point(this.parent.position.x, this.parent.position.y),
                map: this.parent.map,
                img: 'bullet',
                width: 8,
                height: 8,
                speed: new GeometryAndPhysics_1.Velocity(shootSpeedX, shootSpeedY)
            });
        };
        this.getDamage = () => {
            let damage = 0;
            damage = (this._melee) ? this._activeWeapon.meleeDmg : this._activeWeapon.shootDmg;
            return damage;
        };
        if (param.atkSpd)
            this._attackCounter.setInc(param.atkSpd);
    }
    get melee() { return this._melee; }
    get pressingAttack() { return this._pressingAttack; }
    get weaponCollection() { return this._weaponCollection; }
    get activeWeapon() { return this._activeWeapon; }
    get reloadCounter() { return this._reloadCounter; }
    get attackCounter() { return this._attackCounter; }
    get attackStarted() { return this._attackStarted; }
    set pressingAttack(value) { this._pressingAttack = value; }
    set attackStarted(value) { this._attackStarted = value; }
}
exports.AttackController = AttackController;
//# sourceMappingURL=AttackControler.js.map