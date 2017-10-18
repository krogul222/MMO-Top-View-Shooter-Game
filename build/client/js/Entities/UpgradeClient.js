Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const PlayerClient_1 = require("./PlayerClient");
const game_1 = require("../game");
class UpgradeClient {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.id = -1;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let ex = this.position.x;
            let ey = this.position.y;
            let x = ex - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = ey - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            x -= this.width / 2;
            y -= this.height / 2;
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x, y, this.width, this.height);
        };
        this.id = param.id ? param.id : this.id;
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? Img[param.img] : Img[this.img];
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind;
        UpgradeClient.list[this.id] = this;
    }
}
UpgradeClient.list = {};
exports.UpgradeClient = UpgradeClient;
//# sourceMappingURL=UpgradeClient.js.map