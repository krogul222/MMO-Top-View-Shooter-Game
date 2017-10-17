Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Entity_1 = require("./Entity");
const globalVariables_1 = require("../globalVariables");
const app_1 = require("../../../app");
class Upgrade extends Entity_1.Entity {
    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = "";
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
                category: this.category
            };
        };
        this.getUpdatePack = function () {
            return {
                id: this.id,
                position: this.position
            };
        };
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind;
        this.value = param.value ? param.value : this.value;
        globalVariables_1.initPack.upgrade.push(this.getInitPack());
        Upgrade.list[this.id] = this;
    }
}
Upgrade.updateParam = (param) => {
    param.type = "upgrade";
    return param;
};
Upgrade.update = () => {
    let pack = [];
    if (app_1.frameCount % 250 === 0)
        Upgrade.randomlyGenerate('forest');
    for (let key in Upgrade.list) {
        let upgrade = Upgrade.list[key];
        upgrade.update();
        pack.push(upgrade.getUpdatePack());
        for (let i in Player_1.Player.list) {
            let player = Player_1.Player.list[i];
            let isColliding = player.testCollision(upgrade);
            if (isColliding) {
                if (upgrade.category === 'item')
                    player.inventory.addItem(upgrade.kind, 1);
                if (upgrade.category === 'ammo')
                    player.attackController.weaponCollection.addWeaponAmmo(upgrade.kind, upgrade.value);
                globalVariables_1.removePack.upgrade.push(upgrade.id);
                delete Upgrade.list[key];
                break;
            }
        }
    }
};
Upgrade.randomlyGenerate = (map) => {
};
Upgrade.list = {};
exports.Upgrade = Upgrade;
//# sourceMappingURL=Upgrade.js.map