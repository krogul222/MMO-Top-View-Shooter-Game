Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./Entities/PlayerClient");
const game_1 = require("./game");
const enums_1 = require("../../server/js/enums");
const Constants_1 = require("../../server/js/Constants");
class MapClient {
    constructor(map) {
        this.image = new Image();
        this.reloadMap = (map) => {
            this.map = map;
        };
        this.draw = () => {
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let x = WIDTH / 2 - mainPlayerx;
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = HEIGHT / 2 - mainPlayery;
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            let size = this.map.size;
            let material = enums_1.TerrainMaterial.grass;
            let imgWidth = 1;
            let imgHeight = 1;
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    material = this.map.mapTiles[i][j].material;
                    imgWidth = Img[Constants_1.mapTileImageName[material]].width;
                    imgHeight = Img[Constants_1.mapTileImageName[material]].height;
                    ctx.drawImage(Img[Constants_1.mapTileImageName[material]], 0, 0, imgWidth, imgHeight, x + imgWidth * i, y + imgHeight * j, imgWidth, imgHeight);
                }
            }
        };
        this.map = map;
    }
}
exports.MapClient = MapClient;
//# sourceMappingURL=MapClient.js.map