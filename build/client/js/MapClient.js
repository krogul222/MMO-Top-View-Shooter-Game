Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("./images");
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
                let frame = images_1.jsonMap["frames"];
                let mapFrame = frame;
                let frameWidth = 32;
                let frameHeight = 32;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        material = this.map.mapTiles[i][j].material;
                        mapFrame = frame[Constants_2.mapTileImageName[material] + ".png"]["frame"];
                        imgWidth = mapFrame["w"];
                        imgHeight = mapFrame["h"];
                        canvas_1.camera.drawImage(images_1.Img["Map"], imgWidth, imgHeight, 0, 0, 0, (imgWidth - 1) * j, (imgHeight - 1) * i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
                        for (let k = 0; k < 4; k++) {
                            if (this.map.mapTiles[i][j].sides[k] > 0) {
                                mapFrame = frame[Constants_1.mapTileSideImageName[k][this.map.mapTiles[i][j].sides[k]] + ".png"]["frame"];
                                imgWidth = mapFrame["w"];
                                imgHeight = mapFrame["h"];
                                canvas_1.camera.drawImage(images_1.Img["Map"], imgWidth, imgHeight, 0, 0, 0, (imgWidth - 1) * j, (imgHeight - 1) * i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
                            }
                        }
                    }
                }
                game_1.canvasFilters.getImageFromCanvas();
                game_1.canvasFilters.bright();
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        for (let k = 0; k < this.map.mapTiles[i][j].objects.length; k++) {
                            if (this.map.mapTiles[i][j].objects[k] > 0) {
                                mapFrame = frame[Constants_1.mapObjectImageName[this.map.mapTiles[i][j].objects[k]] + ".png"]["frame"];
                                imgWidth = mapFrame["w"];
                                imgHeight = mapFrame["h"];
                                canvas_1.camera.drawImage(images_1.Img["Map"], imgWidth, imgHeight, 0, 0, 0, (imgWidth - 1) * j, (imgHeight - 1) * i, imgWidth, imgHeight, mapFrame["x"], mapFrame["y"]);
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