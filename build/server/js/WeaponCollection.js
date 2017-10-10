Object.defineProperty(exports, "__esModule", { value: true });
class WeaponCollection {
    constructor() {
        this.shoot = (id, bullets) => {
        };
        this.chooseNextWeaponWithAmmo = () => {
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
    }
}
exports.WeaponCollection = WeaponCollection;
class SingleWeapon {
    constructor(_weapon, _ammo, radius = 0) {
        this._weapon = _weapon;
        this._ammo = _ammo;
        this.radius = radius;
        this.meleeDmg = 0;
        this.shootDmg = 0;
        this.shootSpeed = 0;
        this.attackRadius = 0;
        this.attackSpd = 30;
        this.reloadSpd = 30;
        this.ammoInGun = 30;
        this.reload = () => {
        };
    }
    get ammo() { return this._ammo; }
    get weapon() { return this._weapon; }
}
exports.SingleWeapon = SingleWeapon;
//# sourceMappingURL=WeaponCollection.js.map