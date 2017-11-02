Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("./images");
const Constants_1 = require("./../../server/js/Constants");
const PlayerClient_1 = require("./Entities/PlayerClient");
const game_1 = require("./game");
const enums_1 = require("./../../server/js/enums");
const WeaponTypes_1 = require("../../server/js/Weapons/WeaponTypes");
class GUI {
    constructor(param) {
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            let pat = this.ctx.createPattern(images_1.Img["guibackground"], "repeat-x");
            this.ctx.fillStyle = pat;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fill();
            this.ctx.fillStyle = "#000000";
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.drawWeapon();
                this.drawAmmo();
                this.drawFace();
                this.drawItems();
                this.ctx.fillText('Hit points: ' + PlayerClient_1.PlayerClient.list[game_1.selfId].hp + '/' + PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax, 0, 0.6 * this.height);
                this.drawMinimap();
            }
        };
        this.resize = (width, height) => {
            this.width = width;
            this.height = height;
        };
        this.drawWeapon = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                let frame = images_1.jsonIAE["frames"][PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + ".png"]["frame"];
                let frameWidth = frame["w"];
                let frameHeight = frame["h"];
                this.ctx.drawImage(images_1.Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
        };
        this.drawAmmo = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                if (images_1.jsonIAE["frames"][PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo.png"] !== undefined) {
                    let frame = images_1.jsonIAE["frames"][PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo.png"]["frame"];
                    let frameWidth = frame["w"];
                    let frameHeight = frame["h"];
                    this.ctx.drawImage(images_1.Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, 11 * (this.width - 0.8 * this.height) / 32, (this.height - 0.4 * this.height) / 2, 0.4 * this.height, 0.4 * this.height);
                    this.ctx.fillText(' x' + PlayerClient_1.PlayerClient.list[game_1.selfId].ammo + "  " + PlayerClient_1.PlayerClient.list[game_1.selfId].ammoInGun + "/" + WeaponTypes_1.WeaponTypes.list[WeaponTypes_1.WeaponTypes.getWeaponIdbyName(PlayerClient_1.PlayerClient.list[game_1.selfId].weapon)].reloadAmmo, 11 * (this.width - 0.8 * this.height) / 32 + 0.4 * this.height, (this.height) / 2 + 10);
                }
            }
        };
        this.drawItems = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                let frame = images_1.jsonIAE["frames"]["medicalkit.png"]["frame"];
                let frameWidth = frame["w"];
                let frameHeight = frame["h"];
                this.ctx.drawImage(images_1.Img["IAE"], frame["x"], frame["y"], frameWidth, frameHeight, 3 * (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
                this.ctx.fillText(' x' + game_1.inventory.getItemAmount(enums_1.ItemType.medicalkit), 3 * (this.width - 0.8 * this.height) / 4 + 0.8 * this.height, (this.height) / 2 + 10);
            }
        };
        this.drawFace = () => {
            let spriteRows = 2;
            let spriteColumns = 4;
            let facelook = 1;
            let frame = images_1.jsonGUI["frames"]["faceborder.png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            this.ctx.drawImage(images_1.Img["GUI"], frame["x"], frame["y"], frameWidth, frameHeight, (this.width - 0.85 * this.height) / 2, (this.height - 0.85 * this.height) / 2, 0.85 * this.height, 0.85 * this.height);
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                facelook = Math.round(((PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax - PlayerClient_1.PlayerClient.list[game_1.selfId].hp) / PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax) * (spriteRows * spriteColumns - 1));
                let facex = facelook % spriteColumns;
                let facey = Math.floor(facelook / spriteColumns);
                let frame = images_1.jsonGUI["frames"]["face.png"]["frame"];
                let frameWidth = frame["w"] / spriteColumns;
                let frameHeight = frame["h"] / spriteRows;
                this.ctx.drawImage(images_1.Img["GUI"], frame["x"] + facex * frameWidth, frame["y"] + facey * frameHeight, frameWidth, frameHeight, (this.width - 0.8 * this.height) / 2, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
        };
        this.drawMinimap = () => {
            let sizeY = game_1.currentMap.map.mapTiles.length;
            let sizeX = game_1.currentMap.map.mapTiles[0].length;
            let imgSize = 64;
            var imgData = this.ctx.createImageData(imgSize, imgSize);
            var data = imgData.data;
            let ratio = imgSize / game_1.currentMap.map.size;
            let Ra = [];
            let Ga = [];
            let Ba = [];
            Ra[enums_1.TerrainMaterial.dirt] = 255;
            Ra[enums_1.TerrainMaterial.water] = 0;
            Ra[enums_1.TerrainMaterial.stone] = 128;
            Ga[enums_1.TerrainMaterial.dirt] = 255;
            Ga[enums_1.TerrainMaterial.water] = 0;
            Ga[enums_1.TerrainMaterial.stone] = 128;
            Ba[enums_1.TerrainMaterial.dirt] = 0;
            Ba[enums_1.TerrainMaterial.water] = 255;
            Ba[enums_1.TerrainMaterial.stone] = 128;
            let material;
            let playerPosition = PlayerClient_1.PlayerClient.list[game_1.selfId].position;
            for (let i = 0; i < imgSize; i++) {
                for (let j = 0; j < imgSize; j++) {
                    material = game_1.currentMap.map.mapTiles[Math.floor(i / ratio)][Math.floor(j / ratio)].material;
                    data[(j + i * imgSize) * 4] = Ra[material];
                    data[(j + i * imgSize) * 4 + 1] = Ga[material];
                    data[(j + i * imgSize) * 4 + 2] = Ba[material];
                    data[(j + i * imgSize) * 4 + 3] = 255;
                    if (Math.floor(playerPosition.x / (Constants_1.TILE_SIZE * 32)) == Math.floor(j / ratio) && Math.floor(playerPosition.y / (Constants_1.TILE_SIZE * 32)) == Math.floor(i / ratio)) {
                        data[(j + i * imgSize) * 4] = 255;
                        data[(j + i * imgSize) * 4 + 1] = 0;
                        data[(j + i * imgSize) * 4 + 2] = 0;
                        data[(j + i * imgSize) * 4 + 3] = 255;
                    }
                }
            }
            let px = Math.floor(PlayerClient_1.PlayerClient.list[game_1.selfId].position.x / (Constants_1.TILE_SIZE * 32 * sizeX) * imgSize);
            let py = Math.floor(PlayerClient_1.PlayerClient.list[game_1.selfId].position.y / (Constants_1.TILE_SIZE * 32 * sizeY) * imgSize);
            this.ctx.putImageData(imgData, 5 * (this.width) / 6, (this.height - imgSize) / 2);
        };
        if (param.ctx !== undefined)
            this.ctx = param.ctx;
        if (param.width !== undefined)
            this.width = param.width;
        if (param.height !== undefined)
            this.height = param.height;
    }
}
exports.GUI = GUI;
//# sourceMappingURL=GUI.js.map