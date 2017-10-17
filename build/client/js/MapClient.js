Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./Entities/PlayerClient");
const game_1 = require("./game");
class MapClient {
    constructor() {
        this.image = new Image();
        this.draw = () => {
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            if (!this.image.src) {
                this.image.src = '/client/img/' + mainPlayer.map + '.png';
            }
            let x = WIDTH / 2 - mainPlayerx;
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = HEIGHT / 2 - mainPlayery;
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, x, y, this.image.width * 2, this.image.height * 2);
        };
    }
}
exports.MapClient = MapClient;
//# sourceMappingURL=MapClient.js.map