Object.defineProperty(exports, "__esModule", { value: true });
const WeaponTypes_1 = require("./WeaponTypes");
const enums_1 = require("./enums");
class WeaponCollection {
    constructor() {
        this.weapons = [];
        this.shoot = (id, bullets) => {
            return true;
        };
        this.chooseNextWeaponWithAmmo = () => {
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
        this.addWeapon = (id, amount) => {
            for (var i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({ id: id, amount: amount, ammo: 50, reload: WeaponTypes_1.WeaponTypes.list[id].reload });
            console.log("Weapon " + id + " added");
        };
        this.equip = () => {
        };
    }
}
exports.WeaponCollection = WeaponCollection;
class SingleWeapon {
    constructor(param) {
        this.ammoInGun = 30;
        this.name = "";
        this.reload = () => {
        };
        this.shoot = (bullets) => {
            if (bullets <= this._ammo) {
                this._ammo -= bullets;
                console.log("Ammo " + this._ammo);
                return true;
            }
            return false;
        };
        this.equip = (weapon) => {
            for (let i in WeaponTypes_1.WeaponTypes.list) {
                let weaponFromBank = WeaponTypes_1.WeaponTypes.list[i];
                if (weaponFromBank.weapon == weapon) {
                    this._weapon = weapon;
                    this.name = weaponFromBank.name;
                    break;
                }
            }
        };
        this._weapon = (param.weapon !== undefined) ? param.weapon : enums_1.WeaponType.knife;
        this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
        this.name = (param.name !== undefined) ? param.name : "knife";
    }
    get ammo() { return this._ammo; }
    get weapon() { return this._weapon; }
    get reloadSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].reloadSpd; }
    get attackSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackSpd; }
    get attackRadius() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackRadius; }
    get shootSpeed() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootSpeed; }
    get meleeDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].meleeDmg; }
    get shootDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootDmg; }
}
exports.SingleWeapon = SingleWeapon;
//# sourceMappingURL=WeaponCollection.js.map