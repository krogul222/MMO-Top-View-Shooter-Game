Object.defineProperty(exports, "__esModule", { value: true });
const Smoke_1 = require("./../Effects/Smoke");
const Pack_1 = require("./../Pack");
const Player_1 = require("./../Entities/Player");
const MapControler_1 = require("./MapControler");
const Enemy_1 = require("../Entities/Enemy");
class GameController {
    constructor(param) {
        this.socketList = {};
        this.players = {};
        this.enemies = {};
        this.smokes = {};
        this.map = "forest";
        this.initPack = new Pack_1.Pack();
        this.removePack = new Pack_1.Pack();
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
        this.addSmoke = (smoke) => {
            this.smokes[smoke.id] = smoke;
            console.log("Enemy ADDED TO GAME");
        };
        this.id = Math.random();
        this.map = this.id;
        MapControler_1.MapController.createMap(this.map, 16, 20);
        MapControler_1.MapController.updatePack.push(MapControler_1.MapController.getMapPack(this.map));
        GameController.list[this.id] = this;
    }
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
    delete GameController.list[id];
};
GameController.list = {};
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map