Object.defineProperty(exports, "__esModule", { value: true });
const FireFlameClient_1 = require("./../FireFlameClient");
const images_1 = require("./../images");
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const game_1 = require("../game");
const canvas_1 = require("../canvas");
const images_2 = require("../images");
class PlayerClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.width = 0;
        this.height = 0;
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
        this.flame = new FireFlameClient_1.FireFlameClient(this);
        this.burn = new FireFlameClient_1.FireFlameClient(this, true);
        this.draw = () => {
            if (PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let spriteRows = 1;
            let spriteColumns = 20;
            let hpWidth = 30 * this.hp / this.hpMax;
            let aimAngle = this.aimAngle;
            let directionMod = this.inWhichDirection(aimAngle);
            let walkingMod = Math.floor(this.walkSpriteAnimCounter) % spriteColumns;
            this.drawWalk(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
            if (this.attackStarted && this.attackMelee) {
                spriteColumns = 15;
                walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                this.drawMeleeAttackBody(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
            }
            else {
                if (this.reload) {
                    if (this.weapon == "pistol")
                        spriteColumns = 15;
                    walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                    this.drawReloadBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
                }
                else {
                    this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, this.position.x, this.position.y);
                }
            }
            canvas_1.camera.drawBar(this.position.x - hpWidth / 2, this.position.y - 40, hpWidth, 4, 'red');
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
            if (this.weapon == "shotgun" || this.weapon == "flamethrower") {
                correction = 1.4;
            }
            let frame = images_1.jsonPlayer["frames"]["player_" + this.weapon + "_meeleattack.png"]["frame"];
            let frameWidth = frame["w"] / spriteColumns;
            let frameHeight = frame["h"] / spriteRows;
            canvas_1.camera.drawImage(images_2.Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width * correction, this.height * correction, frame["x"], frame["y"]);
            if (this.bodySpriteAnimCounter % spriteColumns >= (spriteColumns - 1)) {
                this.bodySpriteAnimCounter = 0;
                this.attackStarted = false;
            }
        };
        this.drawNormalBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frame = images_1.jsonPlayer["frames"]["player_" + this.weapon + ".png"]["frame"];
            let frameWidth = frame["w"] / spriteColumns;
            let frameHeight = frame["h"] / spriteRows;
            canvas_1.camera.drawImage(images_2.Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);
        };
        this.drawReloadBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frame = images_1.jsonPlayer["frames"]["player_" + this.weapon + "_reload.png"]["frame"];
            let frameWidth = frame["w"] / spriteColumns;
            let frameHeight = frame["h"] / spriteRows;
            canvas_1.camera.drawImage(images_2.Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);
        };
        this.drawWalk = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frame = images_1.jsonPlayer["frames"]["walk.png"]["frame"];
            let frameWidth = frame["w"] / spriteColumns;
            let frameHeight = frame["h"] / spriteRows;
            canvas_1.camera.drawImage(images_2.Img["Player"], frameWidth, frameHeight, aimAngle, directionMod, walkingMod, x, y, this.width / 2, this.height / 2, frame["x"], frame["y"]);
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
            this.weapon = initPack.weapon;
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