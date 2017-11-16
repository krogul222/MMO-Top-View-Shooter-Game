Object.defineProperty(exports, "__esModule", { value: true });
const WeaponTypes_1 = require("./WeaponTypes");
const enums_1 = require("../enums");
class WeaponCollection {
    constructor(owner) {
        this.weapons = [];
        this.shoot = (id, bullets) => {
            return true;
        };
        this.chooseNextWeaponWithAmmo = () => {
            if (!this.owner.attackController.reloadCounter.isActive()) {
                let inc = 1;
                for (let i = 0; i < this.weapons.length; i++) {
                    if (this.weapons[i].id === this.owner.attackController.activeWeapon.weapon) {
                        while (i + inc < this.weapons.length) {
                            if (this.weapons[i + inc].ammoInGun > 0) {
                                this.owner.attackController.equip(this.weapons[i + inc].id);
                                return;
                            }
                            else {
                                inc++;
                            }
                        }
                        inc = 0;
                        while (inc < i) {
                            if (this.weapons[inc].ammoInGun > 0) {
                                this.owner.attackController.equip(this.weapons[inc].id);
                                return;
                            }
                            else {
                                inc++;
                            }
                        }
                        return;
                    }
                }
            }
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
        this.setWeaponAmmo = (id, ammo) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammo = ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammoInGun = this.weapons[i].ammo;
                    }
                    if (this.owner.attackController.activeWeapon.weapon == id) {
                        if (this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0) {
                            this.owner.attackController.reloadCounter.activate();
                        }
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        };
        this.addWeaponAmmo = (id, ammo) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammo = this.weapons[i].ammo + ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammoInGun = this.weapons[i].ammo;
                    }
                    if (this.owner.attackController.activeWeapon.weapon == id) {
                        if (this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0) {
                            this.owner.attackController.reloadCounter.activate();
                        }
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        };
        this.decAmmo = (id, amount) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammoInGun = (this.weapons[i].ammoInGun > amount) ? this.weapons[i].ammoInGun - amount : 0;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammo = this.weapons[i].ammoInGun;
                    }
                }
            }
        };
        this.reload = (id) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammoInGun = (this.weapons[i].ammo > WeaponTypes_1.WeaponTypes.list[id].reloadAmmo) ? WeaponTypes_1.WeaponTypes.list[id].reloadAmmo : this.weapons[i].ammo;
                    this.weapons[i].ammo = this.weapons[i].ammo - this.weapons[i].ammoInGun;
                }
            }
        };
        this.removeWeapon = (id, amount) => {
        };
        this.hasWeapon = (id, amount) => {
            for (var i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    return this.weapons[i].amount >= amount;
                }
            }
            return false;
        };
        this.changeWeapon = (id) => {
            if (this.hasWeapon(id, 1) && !this.owner.attackController.reloadCounter.isActive()) {
                this.owner.attackController.equip(id);
            }
        };
        this.addWeapon = (id, amount) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({ id: id, amount: amount, ammo: 10, ammoInGun: WeaponTypes_1.WeaponTypes.list[id].reloadAmmo });
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
            this.parent.attackController.weaponCollection.reload(this._weapon);
            this._ammoInGun = (this._ammo > WeaponTypes_1.WeaponTypes.list[this._weapon].reloadAmmo) ? WeaponTypes_1.WeaponTypes.list[this._weapon].reloadAmmo : this._ammo;
            this._ammo = this._ammo - this._ammoInGun;
        };
        this.decAmmo = (amount) => {
            this._ammoInGun = (this._ammoInGun - amount >= 0) ? this._ammoInGun - amount : 0;
            this.parent.attackController.weaponCollection.decAmmo(this._weapon, amount);
            let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this._weapon);
            if (weaponProperties.reloadSpd == -1) {
                this._ammo = this._ammoInGun;
            }
        };
        this.updateAmmo = () => {
            let weaponCollection = this.parent.attackController.weaponCollection;
            for (let i = 0; i < weaponCollection.weapons.length; i++) {
                if (weaponCollection.weapons[i].id === this.weapon) {
                    this._ammo = weaponCollection.weapons[i].ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this.weapon);
                    if (weaponProperties.reloadSpd == -1) {
                        this._ammoInGun = this._ammo;
                    }
                }
            }
        };
        this.shoot = (bullets) => {
            if (bullets <= this._ammoInGun) {
                if (this._ammoInGun - bullets >= 0) {
                    this.decAmmo(bullets);
                }
                else {
                    this.parent.attackController.reloadCounter.activate();
                    return false;
                }
                if (this._ammoInGun == 0) {
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this.weapon);
                    if (weaponProperties.reloadSpd > 0) {
                        this.parent.attackController.reloadCounter.activate();
                    }
                }
                if (WeaponTypes_1.WeaponTypes.list[this.weapon].recoil)
                    this.parent.movementController.recoilCounter.activate();
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
                    this._ammo = weaponCollection.weapons[i].ammo;
                    this._ammoInGun = weaponCollection.weapons[i].ammoInGun;
                    this.attackType = weaponProperties.attackType;
                }
            }
        };
        if (param.weapon !== undefined) {
            this._weapon = param.weapon;
            let weaponParameters = WeaponTypes_1.WeaponTypes.getWeaponParameters(this._weapon);
            this._ammoInGun = weaponParameters.reloadAmmo;
            this.attackType = weaponParameters.attackType;
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