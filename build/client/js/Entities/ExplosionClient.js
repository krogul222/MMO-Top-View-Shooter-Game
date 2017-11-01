Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const PlayerClient_1 = require("./PlayerClient");
const game_1 = require("../game");
const canvas_1 = require("../canvas");
class ExplosionClient {
    constructor(param) {
        this.id = Math.random();
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.width = 32;
        this.height = 32;
        this.spriteAnimCounter = 0;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let frameWidth = this.img.width / this.animColumns;
            let frameHeight = this.img.height / this.animRows;
            let spriteColumn = Math.floor(this.spriteAnimCounter) % this.animColumns;
            let spriteRow = Math.floor(this.spriteAnimCounter / this.animColumns);
            canvas_1.camera.drawImage(this.img, frameWidth, frameHeight, 0, spriteRow, spriteColumn, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
        };
        this.isCompleted = () => {
            if (this.spriteAnimCounter > (this.animRows * this.animColumns))
                return true;
            else
                return false;
        };
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? Img[param.img] : this.img;
        this.category = param.category ? param.category : this.category;
        this.animRows = param.spriteRows ? param.spriteRows : this.animRows;
        this.animColumns = param.spriteColumns ? param.spriteColumns : this.animColumns;
        ExplosionClient.list[this.id] = this;
    }
}
ExplosionClient.list = {};
exports.ExplosionClient = ExplosionClient;
//# sourceMappingURL=ExplosionClient.js.map