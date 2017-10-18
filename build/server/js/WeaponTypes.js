Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class WeaponTypes {
    constructor(param) {
        this.name = "";
        this.meleeDmg = 0;
        this.shootDmg = 0;
        this.shootSpeed = 0;
        this.attackRadius = 0;
        this.attackSpd = 30;
        this.attackMelee = true;
        this.reloadSpd = 30;
        this.recoil = false;
        this.maxSpd = 8;
        this.reloadAmmo = 0;
        this._weapon = (param.weapon !== undefined) ? param.weapon : enums_1.WeaponType.knife;
        this.attackRadius = (param.attackRadius !== undefined) ? param.attackRadius : 0;
        this.attackSpd = (param.attackSpd !== undefined) ? param.attackSpd : 0;
        this.attackMelee = (param.attackMelee !== undefined) ? param.attackMelee : true;
        this.shootDmg = (param.shootDmg !== undefined) ? param.shootDmg : 0;
        this.meleeDmg = (param.meleeDmg !== undefined) ? param.meleeDmg : 0;
        this.maxSpd = (param.maxSpd !== undefined) ? param.maxSpd : 8;
        this.shootSpeed = (param.shootSpeed !== undefined) ? param.shootSpeed : 0;
        this.reloadAmmo = (param.reloadAmmo !== undefined) ? param.reloadAmmo : 0;
        this.reloadSpd = (param.reloadSpd !== undefined) ? param.reloadSpd : 0;
        this.recoil = (param.recoil !== undefined) ? param.recoil : false;
        this.name = (param.name !== undefined) ? param.name : "knife";
        WeaponTypes.list[param.weapon] = this;
    }
    get weapon() { return this._weapon; }
}
WeaponTypes.getWeaponParameters = (weapon) => {
    for (let i in WeaponTypes.list) {
        let weaponFromBank = WeaponTypes.list[i];
        if (weaponFromBank.weapon == weapon) {
            return weaponFromBank;
        }
    }
    return WeaponTypes.list[0];
};
WeaponTypes.getWeaponIdbyName = (name) => {
    for (let i in WeaponTypes.list) {
        let weaponFromBank = WeaponTypes.list[i];
        if (weaponFromBank.name == name) {
            return weaponFromBank.weapon;
        }
    }
    return enums_1.WeaponType.knife;
};
WeaponTypes.list = {};
exports.WeaponTypes = WeaponTypes;
new WeaponTypes({ weapon: enums_1.WeaponType.pistol, name: "pistol",
    attackRadius: 0,
    attackSpd: 4,
    attackMelee: false,
    shootDmg: 2,
    meleeDmg: 2,
    maxSpd: 10,
    shootSpeed: 20,
    reloadAmmo: 6,
    reloadSpd: 5,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.shotgun, name: "shotgun",
    attackRadius: 3,
    attackSpd: 2,
    attackMelee: false,
    shootDmg: 3,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 15,
    reloadAmmo: 2,
    reloadSpd: 2,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.knife, name: "knife",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 8,
    maxSpd: 11,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.rifle, name: "rifle",
    attackRadius: 0,
    attackSpd: 1,
    attackMelee: false,
    shootDmg: 15,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 30,
    reloadAmmo: 1,
    reloadSpd: 2,
    recoil: true
});
new WeaponTypes({ weapon: enums_1.WeaponType.claws, name: "claws",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 5,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});
//# sourceMappingURL=WeaponTypes.js.map