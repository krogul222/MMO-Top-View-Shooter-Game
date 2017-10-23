Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
const globalVariables_1 = require("../globalVariables");
const enums_1 = require("../enums");
const MapControler_1 = require("../Controllers/MapControler");
class Enemy extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.toRemove = false;
        this.kind = "";
        this.extendedUpdate = () => {
            this.update();
            let player = this.getClosestPlayer(10000, 360);
            let diffX = 0;
            let diffY = 0;
            if (player) {
                diffX = player.position.x - this.position.x;
                diffY = player.position.y - this.position.y;
            }
            this.updateAim(player, diffX, diffY);
            this.updateKeyPress(player, diffX, diffY);
            this.updateAttack(player, diffX, diffY);
        };
        this.updateAim = (player, diffX, diffY) => {
            this.movementController.aimAngle = Math.atan2(diffY, diffX) / Math.PI * 180;
        };
        this.updateKeyPress = (player, diffX, diffY) => {
            let safeDistance = 20;
            safeDistance = (this.attackController.melee) ? 30 : 100;
            this.movementController.pressingRight = diffX > safeDistance;
            this.movementController.pressingLeft = diffX < -safeDistance;
            this.movementController.pressingDown = diffY > safeDistance;
            this.movementController.pressingUp = diffY < -safeDistance;
        };
        this.updateAttack = (player, diffX, diffY) => {
            this.attackController.pressingAttack = false;
            if (this.attackController.melee && Math.sqrt(diffX * diffX + diffY * diffY) < 50) {
                this.attackController.pressingAttack = true;
            }
            if (!this.attackController.melee && Math.sqrt(diffX * diffX + diffY * diffY) < 500) {
                this.attackController.pressingAttack = true;
            }
        };
        this.onDeath = () => {
            this.toRemove = true;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                kind: this.kind,
                attackStarted: this.attackController.attackStarted,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.giveWeapons = () => {
            if (this.kind == 'zombie') {
                this.inventory.addItem(enums_1.WeaponType.claws, 1);
                this.inventory.useItem(enums_1.WeaponType.claws);
            }
            if (this.kind == 'scorpion') {
                this.inventory.addItem(enums_1.WeaponType.pistol, 1);
                this.inventory.addItem(enums_1.WeaponType.shotgun, 1);
                this.inventory.addItem(enums_1.WeaponType.rifle, 1);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 10);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 20);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 5);
                if (Math.random() < 0.6) {
                    this.inventory.useItem(enums_1.WeaponType.pistol);
                }
                else {
                    if (Math.random() < 0.5) {
                        this.inventory.useItem(enums_1.WeaponType.shotgun);
                    }
                    else {
                        this.inventory.useItem(enums_1.WeaponType.rifle);
                    }
                }
            }
        };
        Enemy.list[param.id] = this;
        if (param.kind)
            this.kind = param.kind;
        this.attackController.pressingAttack = true;
        this.giveWeapons();
        globalVariables_1.initPack.enemy.push(this.getInitPack());
    }
}
Enemy.globalMapControler = new MapControler_1.MapController(null);
Enemy.update = () => {
    let pack = [];
    for (let i in Enemy.list) {
        let enemy = Enemy.list[i];
        enemy.extendedUpdate();
        if (enemy.toRemove) {
            delete Enemy.list[i];
            Enemy.randomlyGenerate('forest');
            globalVariables_1.removePack.enemy.push(enemy.id);
        }
        else {
            pack.push(enemy.getUpdatePack());
        }
    }
    return pack;
};
Enemy.getAllInitPack = function () {
    let enemies = [];
    for (let i in Enemy.list) {
        enemies.push(Enemy.list[i].getInitPack());
    }
    return enemies;
};
Enemy.randomlyGenerate = function (choosenMap) {
    let map = MapControler_1.MapController.getMap(choosenMap);
    let x = Math.random() * map.width;
    let y = Math.random() * map.height;
    let position = new GeometryAndPhysics_1.Point(x, y);
    while (map.isPositionWall(position)) {
        x = Math.random() * map.width;
        y = Math.random() * map.height;
        position.changePosition(x, y);
    }
    let difficulty = 1 + Math.round(Math.random() * 2) * 0.5;
    let height = 48 * difficulty;
    let width = 48 * difficulty;
    let id = Math.random();
    let enemy;
    if (Math.random() < 0.5) {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 15 * difficulty,
            atkSpd: 0.8 * difficulty,
            map: choosenMap,
            img: 'scorpion',
            type: 'enemy',
            kind: 'scorpion',
            maxSpdX: 3,
            maxSpdY: 3
        });
    }
    else {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 5 * difficulty,
            atkSpd: 0.4 * difficulty,
            map: choosenMap,
            img: 'zombie',
            type: 'enemy',
            kind: 'zombie',
            maxSpdX: 7,
            maxSpdY: 7
        });
    }
};
Enemy.list = {};
exports.Enemy = Enemy;
//# sourceMappingURL=Enemy.js.map