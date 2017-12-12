Object.defineProperty(exports, "__esModule", { value: true });
const Pack_1 = require("./../Pack");
const MapControler_1 = require("./MapControler");
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
GameController.list = {};
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map