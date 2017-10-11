Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const game_1 = require("../game");
class PlayerClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.width = 0;
        this.height = 0;
        this.img = Img["player" + "pistol"];
        this.imgMeleeAttack = Img["playerknifemeeleattack"];
        this.hp = 1;
        this.hpMax = 1;
        this.map = "forest";
        this.aimAngle = 0;
        this.attackStarted = false;
        this.attackMelee = false;
        this.bodySpriteAnimCounter = 0;
        this.walkSpriteAnimCounter = 0;
        this.moving = false;
        this.reload = false;
        this.weapon = "pistol";
        this.ammo = 0;
        this.ammoInGun = 0;
        this.draw = () => {
            if (PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let spriteRows = 1;
            let spriteColumns = 20;
            let hpWidth = 30 * this.hp / this.hpMax;
            let mainPlayer = PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let px = this.position.x;
            let py = this.position.y;
            console.log("Player position: " + px + " " + py);
            let x = px - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = py - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            let aimAngle = this.aimAngle;
            aimAngle = (aimAngle < 0) ? (360 + aimAngle) : aimAngle;
            let directionMod = this.inWhichDirection(aimAngle);
            let walkingMod = Math.floor(this.walkSpriteAnimCounter) % spriteColumns;
            console.log("Walking mod " + walkingMod);
            this.drawWalk(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
            if (this.attackStarted && this.attackMelee) {
                spriteColumns = 15;
                walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                this.drawMeleeAttackBody(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
            }
            else {
                if (this.reload) {
                    walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                    this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
                }
                else {
                    this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
                }
            }
            ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
        };
        this.inWhichDirection = (aimAngle) => {
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
            return directionMod;
        };
        this.drawMeleeAttackBody = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let correction = 1.3;
            let correctionWidth = 1;
            let correctionHeight = 1;
            if (this.weapon == "pistol") {
                correction = 1.1;
            }
            if (this.weapon == "shotgun") {
                correction = 1.4;
            }
            let frameWidth = this.imgMeleeAttack.width / spriteColumns;
            let frameHeight = this.imgMeleeAttack.height / spriteRows;
            ctx.save();
            ctx.translate(x - (this.width * correctionWidth) * correction / 2, y - this.height * correction / 2);
            ctx.translate((this.width) * correction / 2, this.height * correction / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(this.imgMeleeAttack, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width * correction / 2, -this.height * correction / 2, (this.width) * correction, this.height * correction);
            ctx.restore();
            if (this.bodySpriteAnimCounter % spriteColumns >= (spriteColumns - 1)) {
                this.bodySpriteAnimCounter = 0;
                this.attackStarted = false;
            }
        };
        this.drawNormalBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frameWidth = this.img.width / spriteColumns;
            let frameHeight = this.img.height / spriteRows;
            ctx.save();
            ctx.translate(x - this.width / 2, y - this.height / 2);
            ctx.translate(this.width / 2, this.height / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(this.img, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        };
        this.drawWalk = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frameWidth = Img["walk"].width / spriteColumns;
            let frameHeight = Img["walk"].height / spriteRows;
            ctx.save();
            ctx.translate(x - this.width / 4, y - this.height / 4);
            ctx.translate(this.width / 4, this.height / 4);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(Img["walk"], walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width / 4, -this.height / 4, this.width / 2, this.height / 2);
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
        if (initPack.weapon) {
            this.img = Img["player" + initPack.weapon];
            this.weapon = initPack.weapon;
            this.imgMeleeAttack = Img["player" + initPack.weapon + "meeleattack"];
        }
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
        if (initPack.ammo)
            this.ammo = initPack.ammo;
        if (initPack.ammoInGun)
            this.ammoInGun = initPack.ammoInGun;
        PlayerClient.list[initPack.id] = this;
    }
}
PlayerClient.list = {};
exports.PlayerClient = PlayerClient;
//# sourceMappingURL=PlayerClient.js.map