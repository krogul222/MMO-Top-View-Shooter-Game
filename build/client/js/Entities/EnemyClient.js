Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./../game/game");
const FireFlameClient_1 = require("./../Effects/FireFlameClient");
const PlayerClient_1 = require("./PlayerClient");
const GeometryAndPhysics_1 = require("../../../server/js/GeometryAndPhysics");
const canvas_1 = require("../pregame/canvas");
const images_1 = require("../images");
const EnemyConstants_1 = require("../Constants/EnemyConstants");
class EnemyClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.startPosition = new GeometryAndPhysics_1.Point(250, 250);
        this.width = 0;
        this.height = 0;
        this.img = images_1.Img["zombie"];
        this.kind = "zombie";
        this.hp = 1;
        this.hpMax = 1;
        this.map = "forest";
        this.aimAngle = 0;
        this.attackStarted = false;
        this.attackMelee = false;
        this.spriteAnimCounter = 0;
        this.moving = false;
        this.reload = false;
        this.weapon = "pistol";
        this.flame = new FireFlameClient_1.FireFlameClient(this);
        this.burn = new FireFlameClient_1.FireFlameClient(this, true);
        this.draw = () => {
            let p = PlayerClient_1.PlayerClient.list[game_1.selfId];
            if (p.map !== this.map) {
                return;
            }
            if (p.position.x - this.position.x > WIDTH || p.position.y - this.position.y > HEIGHT)
                return;
            let hpWidth = 30 * this.hp / this.hpMax;
            let frameWidth = 32;
            let frameHeight = 32;
            let aimAngle = this.aimAngle;
            if (aimAngle < 0) {
                aimAngle = 360 + aimAngle;
            }
            let walkingMod = Math.floor(this.spriteAnimCounter) % 6;
            if (this.kind == 'zombie') {
                this.drawTopViewSprite(this.position.x, this.position.y, aimAngle);
            }
            else {
                let directionMod = 3;
                if (aimAngle >= 45 && aimAngle < 135) {
                    directionMod = 2;
                }
                else if (aimAngle >= 135 && aimAngle < 225) {
                    directionMod = 1;
                }
                else if (aimAngle >= 225 && aimAngle < 315) {
                    directionMod = 0;
                }
                let frame = images_1.jsonIAE["frames"][this.kind + ".png"]["frame"];
                frameWidth = frame["w"] / 6;
                frameHeight = frame["h"] / 4;
                walkingMod = Math.floor(this.spriteAnimCounter) % 6;
                canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, 0, directionMod, walkingMod, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height, frame["x"], frame["y"]);
            }
            canvas_1.camera.drawBar(this.position.x - hpWidth / 2, this.position.y - 40, hpWidth, 4, 'red');
        };
        this.drawTopViewSprite = (x, y, aimAngle) => {
            if (this.attackStarted) {
                this.drawTopViewSpriteAttack(x, y, aimAngle);
            }
            else {
                this.drawTopViewSpriteWalk(x, y, aimAngle);
            }
        };
        this.drawTopViewSpriteAttack = (x, y, aimAngle) => {
            let spriteColumns = EnemyConstants_1.framesAttack[this.kind];
            let spriteRows = 1;
            let walkingMod = Math.floor(this.spriteAnimCounter) % spriteColumns;
            let frame = images_1.jsonIAE["frames"][this.kind + "_attack.png"]["frame"];
            let frameWidth = frame["w"] / spriteColumns;
            let frameHeight = frame["h"] / spriteRows;
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, aimAngle, 0, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);
            if (this.spriteAnimCounter % spriteColumns >= (spriteColumns - 1)) {
                this.spriteAnimCounter = 0;
                this.attackStarted = false;
            }
        };
        this.drawTopViewSpriteWalk = (x, y, aimAngle) => {
            let walkingMod = Math.floor(this.spriteAnimCounter) % EnemyConstants_1.framesMove[this.kind];
            let frame = images_1.jsonIAE["frames"][this.kind + "_move.png"]["frame"];
            let frameWidth = frame["w"] / EnemyConstants_1.framesMove[this.kind];
            let frameHeight = frame["h"];
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, aimAngle, 0, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);
        };
        if (initPack.id)
            this.id = initPack.id;
        if (initPack.position)
            this.position = initPack.position;
        if (initPack.startPosition)
            this.startPosition = initPack.startPosition;
        if (initPack.width)
            this.width = initPack.width;
        if (initPack.height)
            this.height = initPack.height;
        if (initPack.weapon)
            this.weapon = initPack.weapon;
        if (initPack.img)
            this.img = images_1.Img[initPack.img];
        if (initPack.hp)
            this.hp = initPack.hp;
        if (initPack.hpMax)
            this.hpMax = initPack.hpMax;
        if (initPack.aimAngle)
            this.aimAngle = initPack.aimAngle;
        if (initPack.moving)
            this.moving = initPack.moving;
        if (initPack.attackStarted)
            this.attackStarted = initPack.attackStarted;
        if (initPack.attackMelee)
            this.attackMelee = initPack.attackMelee;
        if (initPack.kind)
            this.kind = initPack.kind;
        EnemyClient.list[initPack.id] = this;
    }
}
EnemyClient.list = {};
exports.EnemyClient = EnemyClient;
//# sourceMappingURL=EnemyClient.js.map