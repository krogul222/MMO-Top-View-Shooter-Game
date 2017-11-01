Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./../../server/js/Constants");
const PlayerClient_1 = require("./Entities/PlayerClient");
const game_1 = require("./game");
const enums_1 = require("../../server/js/enums");
const Constants_2 = require("../../server/js/Constants");
const canvas_1 = require("./canvas");
class MapClient {
    constructor(map, name) {
        this.image = new Image();
        this.name = "";
        this.reloadMap = (map) => {
            this.map = map;
            this.name = map.name;
        };
        this.draw = () => {
            if (this.map) {
                let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
                let mainPlayerx = mainPlayer.position.x;
                let mainPlayery = mainPlayer.position.y;
                let x = WIDTH / 2 - mainPlayerx;
                x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
                let y = HEIGHT / 2 - mainPlayery;
                y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
                let size = this.map.size;
                let material = enums_1.TerrainMaterial.dirt;
                let imgWidth = 1;
                let imgHeight = 1;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        material = this.map.mapTiles[i][j].material;
                        imgWidth = Img[Constants_2.mapTileImageName[material]].width;
                        imgHeight = Img[Constants_2.mapTileImageName[material]].height;
                        canvas_1.camera.drawImage(Img[Constants_2.mapTileImageName[material]], imgWidth, imgHeight, 0, 0, 0, imgWidth * j, imgHeight * i, imgWidth, imgHeight);
                        for (let k = 0; k < 4; k++) {
                            if (this.map.mapTiles[i][j].sides[k] > 0) {
                                canvas_1.camera.drawImage(Img[Constants_1.mapTileSideImageName[k][this.map.mapTiles[i][j].sides[k]]], imgWidth, imgHeight, 0, 0, 0, imgWidth * j, imgHeight * i, imgWidth, imgHeight);
                            }
                        }
                        for (let k = 0; k < this.map.mapTiles[i][j].objects.length; k++) {
                            if (this.map.mapTiles[i][j].objects[k] > 0) {
                                canvas_1.camera.drawImage(Img[Constants_1.mapObjectImageName[this.map.mapTiles[i][j].objects[k]]], imgWidth, imgHeight, 0, 0, 0, imgWidth * j, imgHeight * i, imgWidth, imgHeight);
                            }
                        }
                    }
                }
            }
        };
        this.map = map;
        this.name = name;
    }
}
exports.MapClient = MapClient;
//# sourceMappingURL=MapClient.js.map