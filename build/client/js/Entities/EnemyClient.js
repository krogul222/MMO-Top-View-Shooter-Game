Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./PlayerClient");
const GeometryAndPhysics_1 = require("../../../server/js/GeometryAndPhysics");
const game_1 = require("../game");
class EnemyClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.width = 0;
        this.height = 0;
        this.img = Img["zombie"];
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
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let hpWidth = 30 * this.hp / this.hpMax;
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let ex = this.position.x;
            let ey = this.position.y;
            let x = ex - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = ey - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            let frameWidth = this.img.width / 6;
            let frameHeight = this.img.height / 4;
            let aimAngle = this.aimAngle;
            if (aimAngle < 0) {
                aimAngle = 360 + aimAngle;
            }
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
            let walkingMod = Math.floor(this.spriteAnimCounter) % 6;
            if (this.kind == 'zombie') {
                this.drawTopViewSprite(x, y, aimAngle);
            }
            else {
                walkingMod = Math.floor(this.spriteAnimCounter) % 6;
                ctx.drawImage(this.img, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, x - this.width / 2, y - this.height / 2, this.width, this.height);
            }
            ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
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
            let spriteColumns = framesAttack[this.kind];
            let spriteRows = 1;
            let walkingMod = Math.floor(this.spriteAnimCounter) % spriteColumns;
            let frameWidth = Img[this.kind + 'attack'].width / spriteColumns;
            let frameHeight = Img[this.kind + 'attack'].height / spriteRows;
            ctx.save();
            ctx.translate(x - (this.width) / 2, y - this.height / 2);
            ctx.translate((this.width) / 2, this.height / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(Img[this.kind + 'attack'], walkingMod * frameWidth, 0, frameWidth, frameHeight, -this.width / 2, -this.height / 2, (this.width), this.height);
            ctx.restore();
            if (this.spriteAnimCounter % spriteColumns >= (spriteColumns - 1)) {
                this.spriteAnimCounter = 0;
                this.attackStarted = false;
            }
        };
        this.drawTopViewSpriteWalk = (x, y, aimAngle) => {
            let frameWidth = this.img.width / framesMove[this.kind];
            let frameHeight = this.img.height;
            ctx.save();
            ctx.translate(x - this.width / 2, y - this.height / 2);
            ctx.translate(this.width / 2, this.height / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            let walkingMod = Math.floor(this.spriteAnimCounter) % framesMove[this.kind];
            ctx.drawImage(this.img, walkingMod * frameWidth, 0, frameWidth, frameHeight, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        };
        if (initPack.id)
            this.id = initPack.id;
        if (initPack.position)
            this.position = initPack.position;
        if (initPack.width)
            this.width = initPack.width;
        if (initPack.height)
            this.height = initPack.height;
        if (initPack.weapon)
            this.weapon = initPack.weapon;
        if (initPack.img)
            this.img = Img[initPack.img];
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