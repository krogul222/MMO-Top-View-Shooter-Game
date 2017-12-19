Object.defineProperty(exports, "__esModule", { value: true });
const PhysicsEngine_1 = require("./../PhysicsEngine/PhysicsEngine");
const Smoke_1 = require("./../Effects/Smoke");
const Pack_1 = require("./../Pack");
const Player_1 = require("./../Entities/Player");
const MapControler_1 = require("./MapControler");
const Enemy_1 = require("../Entities/Enemy");
const Upgrade_1 = require("./../Entities/Upgrade");
class GameController {
    constructor(param) {
        this.monsterRespawn = true;
        this.itemRespawn = true;
        this.socketList = {};
        this.players = {};
        this.enemies = {};
        this.upgrades = {};
        this.smokes = {};
        this.map = "forest";
        this.initPack = new Pack_1.Pack();
        this.removePack = new Pack_1.Pack();
        this._physicsEngine = new PhysicsEngine_1.PhysicsEngine();
        this.addSocket = (socket) => {
            this.socketList[socket.id] = socket.id;
            console.log("SOCKET ADDED " + this.socketList[socket.id]);
        };
        this.addPlayer = (player) => {
            this.players[player.id] = player;
            console.log("PLAYER ADDED TO GAME");
        };
        this.addEnemy = (enemy) => {
            this.enemies[enemy.id] = enemy;
            console.log("Enemy ADDED TO GAME");
        };
        this.addUpgrade = (upgrade) => {
            this.upgrades[upgrade.id] = upgrade;
            console.log("Upgrade ADDED TO GAME");
        };
        this.addSmoke = (smoke) => {
            this.smokes[smoke.id] = smoke;
            console.log("Enemy ADDED TO GAME");
        };
        this.id = Math.random();
        this.map = this.id;
        if (param.name !== undefined) {
            this.name = param.name;
        }
        let mapsize = 16;
        let water = 10;
        let seeds = 20;
        if (param.mapsize !== undefined) {
            mapsize = param.mapsize;
        }
        if (param.water !== undefined) {
            water = param.water;
        }
        if (param.seeds !== undefined) {
            seeds = param.seeds;
        }
        if (param.monstersrespawn !== undefined) {
            this.monsterRespawn = param.monstersrespawn == 1 ? true : false;
            console.log("MONSTER " + this.monsterRespawn);
        }
        if (param.itemsrespawn !== undefined) {
            this.itemRespawn = param.itemsrespawn == 1 ? true : false;
        }
        MapControler_1.MapController.createMap(this.map, mapsize, seeds, water);
        MapControler_1.MapController.updatePack.push(MapControler_1.MapController.getMapPack(this.map));
        GameController.list[this.id] = this;
    }
    get physicsEngine() { return this._physicsEngine; }
}
GameController.remove = (id) => {
    let game = GameController.list[id];
    for (let i in game.players) {
        if (game.players[i]) {
            delete game.players[i];
            if (Player_1.Player.list[i])
                delete Player_1.Player.list[i];
        }
    }
    for (let i in game.enemies) {
        if (game.enemies[i]) {
            delete game.enemies[i];
            if (Enemy_1.Enemy.list[i])
                delete Enemy_1.Enemy.list[i];
        }
    }
    for (let i in game.smokes) {
        if (game.smokes[i]) {
            delete game.smokes[i];
            if (Smoke_1.Smoke.list[i])
                delete Smoke_1.Smoke.list[i];
        }
    }
    for (let i in game.upgrades) {
        if (game.upgrades[i]) {
            delete game.upgrades[i];
            if (Upgrade_1.Upgrade.list[i])
                delete Upgrade_1.Upgrade.list[i];
        }
    }
    delete GameController.list[id];
};
GameController.list = {};
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map