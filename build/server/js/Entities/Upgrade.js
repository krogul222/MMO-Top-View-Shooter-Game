Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./../Constants");
const Player_1 = require("./Player");
const Entity_1 = require("./Entity");
const globalVariables_1 = require("../globalVariables");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
const enums_1 = require("../enums");
const MapControler_1 = require("../Controllers/MapControler");
const GameController_1 = require("./../Controllers/GameController");
class Upgrade extends Entity_1.Entity {
    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = -1;
        this.kind = -1;
        this.value = 0;
        this.getInitPack = function () {
            return {
                id: this.id,
                position: this.position,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                category: this.category,
                kind: this.kind
            };
        };
        this.getUpdatePack = function () {
            return {
                id: this.id,
                position: this.position
            };
        };
        this.category = (param.category !== undefined) ? param.category : this.category;
        this.kind = (param.kind !== undefined) ? param.kind : this.kind;
        this.value = (param.value !== undefined) ? param.value : this.value;
        Upgrade.list[this.id] = this;
        if (GameController_1.GameController.list[this.game] !== undefined)
            GameController_1.GameController.list[this.game].initPack.upgrade.push(this.getInitPack());
        GameController_1.GameController.list[this.game].addUpgrade(this);
    }
}
Upgrade.updateParam = (param) => {
    param.type = "upgrade";
    return param;
};
Upgrade.update = () => {
    let pack = [];
    for (let i in Player_1.Player.list) {
        let player = Player_1.Player.list[i];
        let closeUpgrades = player.getCloseUpgrades();
        for (let key in closeUpgrades) {
            let upgrade = Upgrade.list[closeUpgrades[key]];
            let isColliding = player.testCollision(upgrade);
            if (isColliding) {
                if (upgrade.category === enums_1.UpgradeCategory.item)
                    player.inventory.addItem(upgrade.kind, 1);
                if (upgrade.category === enums_1.UpgradeCategory.ammo)
                    player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind - 1000, upgrade.value);
                globalVariables_1.removePack.upgrade.push(upgrade.id);
                delete Upgrade.list[key];
                break;
            }
        }
    }
    return pack;
};
Upgrade.updateSpecific = (upgrades) => {
    let pack = [];
    for (let i in Player_1.Player.list) {
        let player = Player_1.Player.list[i];
        let closeUpgrades = player.getCloseUpgrades();
        for (let key in closeUpgrades) {
            let upgrade = Upgrade.list[closeUpgrades[key]];
            if (upgrade !== undefined) {
                let gameId = upgrade.game;
                let isColliding = player.testCollision(upgrade);
                if (isColliding) {
                    if (upgrade.category === enums_1.UpgradeCategory.item)
                        player.inventory.addItem(upgrade.kind, 1);
                    if (upgrade.category === enums_1.UpgradeCategory.ammo)
                        player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind - 1000, upgrade.value);
                    globalVariables_1.removePack.upgrade.push(upgrade.id);
                    GameController_1.GameController.list[gameId].removePack.upgrade.push(upgrade.id);
                    delete Upgrade.list[closeUpgrades[key]];
                    delete closeUpgrades[key];
                    if (GameController_1.GameController.list[gameId].itemRespawn == true)
                        Upgrade.randomlyGenerate(GameController_1.GameController.list[gameId]);
                    break;
                }
            }
        }
    }
    return pack;
};
Upgrade.getAllInitPack = function () {
    let upgrades = [];
    for (let i in Upgrade.list)
        upgrades.push(Upgrade.list[i].getInitPack());
    return upgrades;
};
Upgrade.randomlyGenerate = (game, category = null, kind = null) => {
    let map = MapControler_1.MapController.getMap(game.map);
    let x = Math.random() * map.width;
    let y = Math.random() * map.height;
    let position = new GeometryAndPhysics_1.Point(x, y);
    while (map.isPositionWall(position) !== 0) {
        x = Math.random() * map.width;
        y = Math.random() * map.height;
        position.updatePosition(x, y);
    }
    let height = 32;
    let width = 32;
    let id = Math.random();
    let upgCategory;
    let upgKind;
    let upgValue = 0;
    let img;
    if (category && kind) {
        upgCategory = category;
        upgKind = kind;
    }
    else {
        upgCategory = (Math.random() < 0.5) ? enums_1.UpgradeCategory.item : enums_1.UpgradeCategory.ammo;
        if (upgCategory == enums_1.UpgradeCategory.item)
            upgKind = enums_1.randomEnum(enums_1.ItemType);
        if (upgCategory == enums_1.UpgradeCategory.ammo) {
            upgKind = enums_1.randomEnum(enums_1.WeaponAmmoType);
            upgValue = 20;
        }
    }
    img = Constants_1.imageName[upgKind];
    new Upgrade({ id: id, position: position, width: width, game: game.id, height: height, category: upgCategory, kind: upgKind, map: game.map, img: img, value: upgValue });
};
Upgrade.list = {};
exports.Upgrade = Upgrade;
//# sourceMappingURL=Upgrade.js.map