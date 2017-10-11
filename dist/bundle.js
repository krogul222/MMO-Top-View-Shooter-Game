/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = __webpack_require__(1);
const BulletClient_1 = __webpack_require__(3);
exports.selfId = 0;
socket.on('init', function (data) {
    if (data.selfId) {
        exports.selfId = data.selfId;
    }
    for (let i = 0, length = data.player.length; i < length; i++) {
        new PlayerClient_1.PlayerClient(data.player[i]);
    }
    for (let i = 0, length = data.bullet.length; i < length; i++) {
        new BulletClient_1.BulletClient(data.bullet[i]);
    }
});
socket.on('update', function (data) {
    for (let i = 0, length = data.player.length; i < length; i++) {
        let pack = data.player[i];
        let p = PlayerClient_1.PlayerClient.list[pack.id];
        if (p) {
            if (pack.position !== undefined) {
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            }
            if (pack.hp !== undefined) {
                p.hp = pack.hp;
            }
            if (pack.moving !== undefined) {
                p.moving = pack.moving;
            }
            if (pack.aimAngle !== undefined) {
                p.aimAngle = pack.aimAngle;
            }
            if (pack.reload !== undefined) {
                if (pack.reload) {
                    p.reload = true;
                }
                else {
                    p.reload = false;
                }
            }
            if (pack.attackStarted !== undefined) {
                if (pack.attackStarted) {
                    p.attackStarted = true;
                    p.spriteAnimCounter = 0;
                }
            }
        }
        for (let i = 0, length = data.bullet.length; i < length; i++) {
            let pack = data.bullet[i];
            let b = BulletClient_1.BulletClient.list[pack.id];
            if (b) {
                if (pack.position !== undefined) {
                    b.position.x = pack.position.x;
                    b.position.y = pack.position.y;
                }
            }
        }
    }
});
setInterval(function () {
    if (!exports.selfId) {
        return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i in PlayerClient_1.PlayerClient.list) {
        if (PlayerClient_1.PlayerClient.list[i].moving) {
            console.log("MOVING");
            PlayerClient_1.PlayerClient.list[i].walkSpriteAnimCounter += 1;
        }
        if (PlayerClient_1.PlayerClient.list[i].attackStarted) {
            if (PlayerClient_1.PlayerClient.list[i].reload) {
                if (PlayerClient_1.PlayerClient.list[i].weapon == "pistol")
                    PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 1;
                else
                    PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 0.5;
            }
            else
                PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 1;
        }
        PlayerClient_1.PlayerClient.list[i].draw();
    }
    for (let i in BulletClient_1.BulletClient.list) {
        BulletClient_1.BulletClient.list[i].draw();
    }
}, 40);
document.onkeydown = function (event) {
    if (event.keyCode === 68)
        socket.emit('keyPress', { inputId: 'right', state: true });
    else if (event.keyCode === 83)
        socket.emit('keyPress', { inputId: 'down', state: true });
    else if (event.keyCode === 65)
        socket.emit('keyPress', { inputId: 'left', state: true });
    else if (event.keyCode === 87)
        socket.emit('keyPress', { inputId: 'up', state: true });
    else if (event.keyCode === 69)
        socket.emit('keyPress', { inputId: 'heal', state: true });
    else if (event.keyCode === 49)
        socket.emit('keyPress', { inputId: '1', state: true });
    else if (event.keyCode === 50)
        socket.emit('keyPress', { inputId: '2', state: true });
    else if (event.keyCode === 51)
        socket.emit('keyPress', { inputId: '3', state: true });
    else if (event.keyCode === 52)
        socket.emit('keyPress', { inputId: '4', state: true });
    else if (event.keyCode === 32) {
        socket.emit('keyPress', { inputId: 'space', state: true });
        return false;
    }
};
document.onkeyup = function (event) {
    if (event.keyCode === 68)
        socket.emit('keyPress', { inputId: 'right', state: false });
    else if (event.keyCode === 83)
        socket.emit('keyPress', { inputId: 'down', state: false });
    else if (event.keyCode === 65)
        socket.emit('keyPress', { inputId: 'left', state: false });
    else if (event.keyCode === 87)
        socket.emit('keyPress', { inputId: 'up', state: false });
};
document.onmousedown = function (event) {
    socket.emit('keyPress', { inputId: 'attack', state: true });
};
document.onmouseup = function (event) {
    socket.emit('keyPress', { inputId: 'attack', state: false });
};
document.onmousemove = function (event) {
    let x = -WIDTH / 2 + event.clientX - 8 - (WIDTH / 2 - event.clientX) / CAMERA_BOX_ADJUSTMENT;
    let y = -HEIGHT / 2 + event.clientY - 8 - (HEIGHT / 2 - event.clientY) / CAMERA_BOX_ADJUSTMENT;
    mouseX = event.clientX;
    mouseY = event.clientY;
    let angle = Math.atan2(y, x) / Math.PI * 180;
    if (exports.selfId) {
        let player = PlayerClient_1.PlayerClient.list[exports.selfId];
        player.aimAngle = angle;
    }
    socket.emit('keyPress', { inputId: 'mouseAngle', state: angle });
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(2);
const game_1 = __webpack_require__(0);
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
        PlayerClient.list[initPack.id] = this;
    }
}
PlayerClient.list = {};
exports.PlayerClient = PlayerClient;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.testCollisionRectRect = (rect1, rect2) => {
    return rect1.position.x <= rect2.position.x + rect2.size.width
        && rect2.position.x <= rect1.position.x + rect1.size.width
        && rect1.position.y <= rect2.position.y + rect2.size.height
        && rect2.position.y <= rect1.position.y + rect1.size.height;
};
exports.calculateAngleBetweenEntities = (main, other) => {
    let x = main.position.x - other.position.x;
    let y = main.position.y - other.position.y;
    let angle = Math.atan2(y, x) / Math.PI * 180;
    angle = angle - 180;
    angle = (angle < 0) ? (angle + 360) : angle;
    return angle;
};
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    changePosition(x, y) {
        this.x += x;
        this.y += y;
    }
    getDistance(point) {
        let dx = this.x - point.x;
        let dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
exports.Point = Point;
class Size {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
}
exports.Size = Size;
class Rectangle {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
}
exports.Rectangle = Rectangle;
class Velocity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.getSpeed = () => { return Math.sqrt(this.x * this.x + this.y * this.y); };
    }
}
exports.Velocity = Velocity;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(2);
const game_1 = __webpack_require__(0);
const PlayerClient_1 = __webpack_require__(1);
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
            console.log("Bullet " + y + " " + x);
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x - this.width / 2, y - this.height / 2, this.width, this.height);
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


/***/ })
/******/ ]);