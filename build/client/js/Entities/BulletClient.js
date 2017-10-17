Object.defineProperty(exports, "__esModule", { value: true });
const EnemyClient_1 = require("./EnemyClient");
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const game_1 = require("../game");
const PlayerClient_1 = require("./PlayerClient");
const ExplosionClient_1 = require("./ExplosionClient");
class BulletClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.map = "forest";
        this.img = Img["bullet"];
        this.width = 32;
        this.height = 32;
        this.hitCategory = 1;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let bx = this.position.x;
            let by = this.position.y;
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let x = bx - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = by - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x - this.width / 2, y - this.height / 2, this.width, this.height);
        };
        this.hit = (category, entityCategory, entityId) => {
            let x = this.position.x;
            let y = this.position.y;
            if (entityCategory == "player") {
                if (PlayerClient_1.PlayerClient.list[entityId]) {
                    x = PlayerClient_1.PlayerClient.list[entityId].x + (1 - Math.round(2 * Math.random())) * Math.floor(Math.random() * PlayerClient_1.PlayerClient.list[entityId].width / 4);
                    y = PlayerClient_1.PlayerClient.list[entityId].y + (1 - Math.round(2 * Math.random())) * Math.floor(Math.random() * PlayerClient_1.PlayerClient.list[entityId].height / 4);
                }
            }
            if (entityCategory == "enemy") {
                if (EnemyClient_1.EnemyClient.list[entityId]) {
                    x = EnemyClient_1.EnemyClient.list[entityId].x + (1 - Math.round(2 * Math.random())) * Math.floor(Math.random() * EnemyClient_1.EnemyClient.list[entityId].width / 4);
                    y = EnemyClient_1.EnemyClient.list[entityId].y + (1 - Math.round(2 * Math.random())) * Math.floor(Math.random() * EnemyClient_1.EnemyClient.list[entityId].height / 4);
                    if (Math.random() < 0.5) {
                    }
                    else {
                    }
                }
            }
            if (category == 1) {
                new ExplosionClient_1.ExplosionClient({ position: this.position, map: this.map, img: "blood", width: 48, height: 48, category: category, spriteRows: 1, spriteColumns: 6 });
            }
            else if (category == 2) {
                new ExplosionClient_1.ExplosionClient({ position: this.position, map: this.map, img: "explosion1", width: 64, height: 64, category: category, spriteRows: 4, spriteColumns: 10 });
            }
        };
        this.id = (initPack.id !== undefined) ? initPack.id : -1;
        this.position = (initPack.position !== undefined) ? initPack.position : new GeometryAndPhysics_1.Point(250, 250);
        this.width = (initPack.width !== undefined) ? initPack.width : 32;
        this.height = (initPack.height !== undefined) ? initPack.height : 32;
        this.hitCategory = (initPack.hitCategory !== undefined) ? initPack.hitCategory : 1;
        this.img = (initPack.img !== undefined) ? Img[initPack.img] : Img["bullet"];
        this.map = (initPack.map !== undefined) ? initPack.map : "forest";
        BulletClient.list[this.id] = this;
    }
}
BulletClient.list = {};
exports.BulletClient = BulletClient;
//# sourceMappingURL=BulletClient.js.map