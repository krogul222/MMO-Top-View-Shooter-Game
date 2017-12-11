Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = require("./MapControler");
class GameController {
    constructor() {
        this.socketList = {};
        this.players = {};
        this.map = "forest";
        this.addSocket = (socket) => {
            this.socketList[socket.id] = socket.id;
            console.log("SOCKET ADDED " + this.socketList[socket.id]);
        };
        this.addPlayer = (player) => {
            this.players[player.id] = player;
            console.log("PLAYER ADDED TO GAME");
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