Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./Entities/PlayerClient");
const game_1 = require("./game");
class GUI {
    constructor(param) {
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            let pat = this.ctx.createPattern(Img["guibackground"], "repeat-x");
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
            }
        };
        this.resize = (width, height) => {
            this.width = width;
            this.height = height;
        };
        this.drawWeapon = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.ctx.drawImage(Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon], 0, 0, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon].width, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon].height, (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
        };
        this.drawAmmo = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                if (Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"]) {
                    this.ctx.drawImage(Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"], 0, 0, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"].width, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"].height, 11 * (this.width - 0.8 * this.height) / 32, (this.height - 0.4 * this.height) / 2, 0.4 * this.height, 0.4 * this.height);
                    this.ctx.fillText(' x' + PlayerClient_1.PlayerClient.list[game_1.selfId].ammo + "  " + PlayerClient_1.PlayerClient.list[game_1.selfId].ammoInGun + "/", 11 * (this.width - 0.8 * this.height) / 32 + 0.4 * this.height, (this.height) / 2 + 10);
                }
            }
        };
        this.drawItems = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.ctx.drawImage(Img["medicalkit"], 0, 0, Img["medicalkit"].width, Img["medicalkit"].height, 3 * (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
                this.ctx.fillText(' x' + game_1.inventory.getItemAmount("medicalkit"), 3 * (this.width - 0.8 * this.height) / 4 + 0.8 * this.height, (this.height) / 2 + 10);
            }
        };
        this.drawFace = () => {
            let spriteRows = 2;
            let spriteColumns = 4;
            let facelook = 1;
            this.ctx.drawImage(Img["faceborder"], 0, 0, Img["faceborder"].width, Img["faceborder"].height, (this.width - 0.85 * this.height) / 2, (this.height - 0.85 * this.height) / 2, 0.85 * this.height, 0.85 * this.height);
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                facelook = Math.round(((PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax - PlayerClient_1.PlayerClient.list[game_1.selfId].hp) / PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax) * (spriteRows * spriteColumns - 1));
                let facex = facelook % spriteColumns;
                let facey = Math.floor(facelook / spriteColumns);
                let frameWidth = Img["face"].width / spriteColumns;
                let frameHeight = Img["face"].height / spriteRows;
                this.ctx.drawImage(Img["face"], facex * frameWidth, facey * frameHeight, frameWidth, frameHeight, (this.width - 0.8 * this.height) / 2, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
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