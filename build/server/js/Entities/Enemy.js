Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
const globalVariables_1 = require("../globalVariables");
const enums_1 = require("../enums");
const MapControler_1 = require("../Controllers/MapControler");
const GameController_1 = require("../Controllers/GameController");
class Enemy extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.toRemove = false;
        this.kind = "";
        this.counter = 0;
        this.updatePack = {};
        this.extendedUpdate = () => {
            if (this.playerToKill == undefined || this.counter % 40 === 0)
                this.playerToKill = this.getClosestPlayer(10000000, 360);
            let diffX = 0;
            let diffY = 0;
            if (this.playerToKill) {
                diffX = this.playerToKill.position.x - this.position.x;
                diffY = this.playerToKill.position.y - this.position.y;
            }
            if (Math.abs(diffX) < 800 && Math.abs(diffY) < 800) {
                this.update();
                if (this.counter % 10 === 0) {
                    this.updateAim(this.playerToKill, diffX, diffY);
                    this.updateKeyPress(this.playerToKill, diffX, diffY);
                }
                this.updateAttack(this.playerToKill, diffX, diffY);
            }
            this.counter++;
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
            let distance = 400;
            if (this.attackController.activeWeapon._weapon == enums_1.WeaponType.flamethrower) {
                distance = 200;
            }
            if (!this.attackController.melee && Math.sqrt(diffX * diffX + diffY * diffY) < distance) {
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
                reload: this.attackController.reloadCounter.isActive(),
                burn: this.lifeAndBodyController.burn
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            let newPack = {};
            if (this.updatePack['position'] !== this.position) {
                newPack['position'] = this.position;
                this.updatePack['position'] = new GeometryAndPhysics_1.Point(this.position.x, this.position.y);
            }
            if (this.updatePack['hp'] !== this.lifeAndBodyController.hp) {
                newPack['hp'] = this.lifeAndBodyController.hp;
                this.updatePack['hp'] = this.lifeAndBodyController.hp;
            }
            if (this.updatePack['moving'] !== this.movementController.moving) {
                newPack['moving'] = this.movementController.moving;
                this.updatePack['moving'] = this.movementController.moving;
            }
            if (this.updatePack['aimAngle'] !== this.movementController.aimAngle) {
                newPack['aimAngle'] = this.movementController.aimAngle;
                this.updatePack['aimAngle'] = this.movementController.aimAngle;
            }
            if (this.updatePack['attackStarted'] !== attackStartedTmp) {
                newPack['attackStarted'] = attackStartedTmp;
                this.updatePack['attackStarted'] = attackStartedTmp;
            }
            if (this.updatePack['weapon'] !== this.attackController.activeWeapon.name) {
                newPack['weapon'] = this.attackController.activeWeapon.name;
                this.updatePack['weapon'] = this.attackController.activeWeapon.name;
            }
            if (this.updatePack['attackMelee'] !== this.attackController.melee) {
                newPack['attackMelee'] = this.attackController.melee;
                this.updatePack['attackMelee'] = this.attackController.melee;
            }
            if (this.updatePack['reload'] !== this.attackController.reloadCounter.isActive()) {
                newPack['reload'] = this.attackController.reloadCounter.isActive();
                this.updatePack['reload'] = this.attackController.reloadCounter.isActive();
            }
            if (this.updatePack['pressingAttack'] !== this.attackController.pressingAttack) {
                newPack['pressingAttack'] = this.attackController.pressingAttack;
                this.updatePack['pressingAttack'] = this.attackController.pressingAttack;
            }
            if (this.updatePack['burn'] !== this.lifeAndBodyController.burn) {
                newPack['burn'] = this.lifeAndBodyController.burn;
                this.updatePack['burn'] = this.lifeAndBodyController.burn;
            }
            if (newPack !== {}) {
                this.updatePack['id'] = this.id;
                newPack['id'] = this.id;
            }
            return newPack;
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
                this.inventory.addItem(enums_1.WeaponType.flamethrower, 1);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 10);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 20);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 5);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.flamethrower, 200);
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
        this.attackController.accuracy = 30;
        this.giveWeapons();
        globalVariables_1.initPack.enemy.push(this.getInitPack());
        if (GameController_1.GameController.list[this.game] !== undefined) {
            GameController_1.GameController.list[this.game].initPack.enemy.push(this.getInitPack());
        }
        GameController_1.GameController.list[this.game].addEnemy(this);
    }
}
Enemy.globalMapControler = new MapControler_1.MapController(null);
Enemy.update = () => {
    let pack = [];
    let updPack;
    for (let i in Enemy.list) {
        let enemy = Enemy.list[i];
        enemy.extendedUpdate();
        if (enemy.toRemove) {
            let gameId = enemy.game;
            delete Enemy.list[i];
            Enemy.randomlyGenerate(GameController_1.GameController.list[gameId]);
            globalVariables_1.removePack.enemy.push(enemy.id);
        }
        else {
            updPack = enemy.getUpdatePack();
            if (updPack !== {}) {
                pack.push(updPack);
            }
        }
    }
    return pack;
};
Enemy.updateSpecific = (enemies) => {
    let pack = [];
    let updPack;
    for (let i in enemies) {
        let enemy = enemies[i];
        enemy.extendedUpdate();
        if (enemy.toRemove) {
            let gameId = enemy.game;
            delete Enemy.list[i];
            delete enemies[i];
            if (GameController_1.GameController.list[gameId].monsterRespawn == true) {
                Enemy.randomlyGenerate(GameController_1.GameController.list[gameId]);
            }
            globalVariables_1.removePack.enemy.push(enemy.id);
            GameController_1.GameController.list[gameId].removePack.enemy.push(enemy.id);
        }
        else {
            updPack = enemy.getUpdatePack();
            if (updPack !== {}) {
                pack.push(updPack);
            }
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
Enemy.getAllSpecificInitPack = function (game) {
    let enemies = [];
    if (GameController_1.GameController.list[game] !== undefined) {
        let e = GameController_1.GameController.list[game].enemies;
        for (let i in e) {
            enemies.push(e[i].getInitPack());
        }
    }
    console.log("ENEMYYYYY " + enemies.length);
    return enemies;
};
Enemy.randomlyGenerate = function (game) {
    let map = MapControler_1.MapController.getMap(game.map);
    let x = Math.random() * map.width;
    let y = Math.random() * map.height;
    let position = new GeometryAndPhysics_1.Point(x, y);
    while (map.isPositionWall(position) !== 0) {
        x = Math.random() * map.width;
        y = Math.random() * map.height;
        position.updatePosition(x, y);
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
            map: game.map,
            img: 'scorpion',
            type: 'enemy',
            kind: 'scorpion',
            game: game.id,
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
            map: game.map,
            game: game.id,
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