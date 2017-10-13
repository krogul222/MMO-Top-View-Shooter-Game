Object.defineProperty(exports, "__esModule", { value: true });
const WeaponTypes_1 = require("./WeaponTypes");
const enums_1 = require("./enums");
class WeaponCollection {
    constructor(owner) {
        this.weapons = [];
        this.shoot = (id, bullets) => {
            return true;
        };
        this.chooseNextWeaponWithAmmo = () => {
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
        this.removeWeapon = (id, amount) => {
        };
        this.addWeapon = (id, amount) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({ id: id, amount: amount, ammo: 50, ammoInGun: WeaponTypes_1.WeaponTypes.list[id].reloadAmmo });
            console.log("Weapon " + id + " added");
        };
        this.owner = owner;
    }
}
exports.WeaponCollection = WeaponCollection;
class SingleWeapon {
    constructor(parent, param) {
        this.parent = parent;
        this._ammoInGun = 30;
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
            let weaponCollection = this.parent.attackController.weaponCollection;
            for (let i = 0; i < weaponCollection.weapons.length; i++) {
                if (weaponCollection.weapons[i].id === weapon) {
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(weapon);
                    this._weapon = weapon;
                    this.name = weaponProperties.name;
                    console.log("WEAPON " + this.name + this._weapon);
                    this._ammo = weaponCollection.weapons[i].ammo;
                    this._ammoInGun = weaponCollection.weapons[i].ammoInGun;
                }
            }
        };
        if (param.weapon !== undefined) {
            this._weapon = param.weapon;
            let weaponParameters = WeaponTypes_1.WeaponTypes.getWeaponParameters(this._weapon);
            this._ammoInGun = weaponParameters.reloadAmmo;
        }
        else {
            this._weapon = enums_1.WeaponType.knife;
        }
        this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
        this.name = (param.name !== undefined) ? param.name : "knife";
    }
    get ammo() { return this._ammo; }
    get weapon() { return this._weapon; }
    get ammoInGun() { return this._ammoInGun; }
    get reloadSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].reloadSpd; }
    get attackSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackSpd; }
    get attackRadius() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackRadius; }
    get shootSpeed() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootSpeed; }
    get meleeDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].meleeDmg; }
    get shootDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootDmg; }
}
exports.SingleWeapon = SingleWeapon;
//# sourceMappingURL=WeaponCollection.js.map