Object.defineProperty(exports, "__esModule", { value: true });
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["knife"] = 0] = "knife";
    WeaponType[WeaponType["pistol"] = 1] = "pistol";
    WeaponType[WeaponType["shotgun"] = 2] = "shotgun";
    WeaponType[WeaponType["rifle"] = 3] = "rifle";
    WeaponType[WeaponType["claws"] = 20] = "claws";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
;
var WeaponAmmoType;
(function (WeaponAmmoType) {
    WeaponAmmoType[WeaponAmmoType["pistol"] = 1001] = "pistol";
    WeaponAmmoType[WeaponAmmoType["shotgun"] = 1002] = "shotgun";
    WeaponAmmoType[WeaponAmmoType["rifle"] = 1003] = "rifle";
})(WeaponAmmoType = exports.WeaponAmmoType || (exports.WeaponAmmoType = {}));
;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["knife"] = 0] = "knife";
    ItemType[ItemType["pistol"] = 1] = "pistol";
    ItemType[ItemType["shotgun"] = 2] = "shotgun";
    ItemType[ItemType["rifle"] = 3] = "rifle";
    ItemType[ItemType["medicalkit"] = 101] = "medicalkit";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
;
var UpgradeCategory;
(function (UpgradeCategory) {
    UpgradeCategory[UpgradeCategory["item"] = 0] = "item";
    UpgradeCategory[UpgradeCategory["ammo"] = 1] = "ammo";
})(UpgradeCategory = exports.UpgradeCategory || (exports.UpgradeCategory = {}));
function randomEnum(myEnum) {
    const enumValues = Object.keys(myEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n));
    const randomIndex = getRandomInt(0, enumValues.length);
    return enumValues[randomIndex];
}
exports.randomEnum = randomEnum;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
//# sourceMappingURL=enums.js.map