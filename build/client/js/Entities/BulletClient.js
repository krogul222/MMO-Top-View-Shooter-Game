Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./../game/game");
const EnemyClient_1 = require("./EnemyClient");
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const PlayerClient_1 = require("./PlayerClient");
const ExplosionClient_1 = require("./ExplosionClient");
const game_2 = require("../game/game");
const canvas_1 = require("../pregame/canvas");
const images_1 = require("../images");
class BulletClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.startPosition = new GeometryAndPhysics_1.Point(250, 250);
        this.map = "forest";
        this.img = images_1.Img["bullet"];
        this.width = 32;
        this.height = 32;
        this.hitCategory = 1;
        this.maxLife = 10;
        this.life = this.maxLife;
        this.toRemove = false;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_2.selfId].map !== this.map) {
                return;
            }
            canvas_1.camera.drawLine(this.startPosition.x, this.startPosition.y, this.position.x, this.position.y, (this.life / this.maxLife) * 4, 255, 255, 255, (this.life / this.maxLife));
        };
        this.update = () => {
            this.life--;
            if (this.life <= 0)
                this.toRemove = true;
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
                }
            }
            game_1.gameSoundManager.playHit(entityCategory);
            if (category == 1) {
                new ExplosionClient_1.ExplosionClient({ position: this.position, map: this.map, img: "blood", width: 48, height: 48, category: category, spriteRows: 1, spriteColumns: 6 });
            }
            else if (category == 2) {
                new ExplosionClient_1.ExplosionClient({ position: this.position, map: this.map, img: "explosion1", width: 64, height: 64, category: category, spriteRows: 4, spriteColumns: 10 });
            }
        };
        this.id = (initPack.id !== undefined) ? initPack.id : -1;
        this.position = (initPack.position !== undefined) ? initPack.position : new GeometryAndPhysics_1.Point(250, 250);
        this.startPosition = (initPack.startPosition !== undefined) ? initPack.startPosition : new GeometryAndPhysics_1.Point(250, 250);
        this.width = (initPack.width !== undefined) ? initPack.width : 32;
        this.height = (initPack.height !== undefined) ? initPack.height : 32;
        this.hitCategory = (initPack.hitCategory !== undefined) ? initPack.hitCategory : 1;
        this.img = (initPack.img !== undefined) ? initPack.img : "bullet";
        this.map = (initPack.map !== undefined) ? initPack.map : "forest";
        BulletClient.list[this.id] = this;
    }
}
BulletClient.list = {};
exports.BulletClient = BulletClient;
//# sourceMappingURL=BulletClient.js.map