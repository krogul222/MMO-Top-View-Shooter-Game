Object.defineProperty(exports, "__esModule", { value: true });
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["knife"] = 0] = "knife";
    WeaponType[WeaponType["pistol"] = 1] = "pistol";
    WeaponType[WeaponType["shotgun"] = 2] = "shotgun";
    WeaponType[WeaponType["rifle"] = 3] = "rifle";
    WeaponType[WeaponType["flamethrower"] = 4] = "flamethrower";
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
    ItemType[ItemType["flamethrower"] = 4] = "flamethrower";
    ItemType[ItemType["medicalkit"] = 101] = "medicalkit";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
;
var UpgradeCategory;
(function (UpgradeCategory) {
    UpgradeCategory[UpgradeCategory["item"] = 0] = "item";
    UpgradeCategory[UpgradeCategory["ammo"] = 1] = "ammo";
})(UpgradeCategory = exports.UpgradeCategory || (exports.UpgradeCategory = {}));
var TerrainMaterial;
(function (TerrainMaterial) {
    TerrainMaterial[TerrainMaterial["dirt"] = 1] = "dirt";
    TerrainMaterial[TerrainMaterial["water"] = 2] = "water";
    TerrainMaterial[TerrainMaterial["stone"] = 3] = "stone";
})(TerrainMaterial = exports.TerrainMaterial || (exports.TerrainMaterial = {}));
var TerrainMaterialWithoutWater;
(function (TerrainMaterialWithoutWater) {
    TerrainMaterialWithoutWater[TerrainMaterialWithoutWater["dirt"] = 1] = "dirt";
    TerrainMaterialWithoutWater[TerrainMaterialWithoutWater["stone"] = 3] = "stone";
})(TerrainMaterialWithoutWater = exports.TerrainMaterialWithoutWater || (exports.TerrainMaterialWithoutWater = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["up"] = 0] = "up";
    Orientation[Orientation["right"] = 1] = "right";
    Orientation[Orientation["down"] = 2] = "down";
    Orientation[Orientation["left"] = 3] = "left";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var CornerOrientation;
(function (CornerOrientation) {
    CornerOrientation[CornerOrientation["RU"] = 0] = "RU";
    CornerOrientation[CornerOrientation["RD"] = 1] = "RD";
    CornerOrientation[CornerOrientation["LD"] = 2] = "LD";
    CornerOrientation[CornerOrientation["LU"] = 3] = "LU";
})(CornerOrientation = exports.CornerOrientation || (exports.CornerOrientation = {}));
var ParticleType;
(function (ParticleType) {
    ParticleType[ParticleType["fire"] = 0] = "fire";
})(ParticleType = exports.ParticleType || (exports.ParticleType = {}));
;
var MapObjectType;
(function (MapObjectType) {
    MapObjectType[MapObjectType["GR_LU"] = 1] = "GR_LU";
    MapObjectType[MapObjectType["GR_LD"] = 2] = "GR_LD";
    MapObjectType[MapObjectType["GR_RU"] = 3] = "GR_RU";
    MapObjectType[MapObjectType["GR_RD"] = 4] = "GR_RD";
    MapObjectType[MapObjectType["GR_L"] = 5] = "GR_L";
    MapObjectType[MapObjectType["GR_R"] = 6] = "GR_R";
    MapObjectType[MapObjectType["GR_D"] = 7] = "GR_D";
    MapObjectType[MapObjectType["GR_U"] = 8] = "GR_U";
    MapObjectType[MapObjectType["GR_EU"] = 9] = "GR_EU";
    MapObjectType[MapObjectType["GR_ED"] = 10] = "GR_ED";
    MapObjectType[MapObjectType["GR_EL"] = 11] = "GR_EL";
    MapObjectType[MapObjectType["GR_ER"] = 12] = "GR_ER";
})(MapObjectType = exports.MapObjectType || (exports.MapObjectType = {}));
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
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=enums.js.map