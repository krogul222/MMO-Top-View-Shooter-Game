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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    getDistance(point) {
        let dx = this.x - point.x;
        let dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
exports.Point = Point;
exports.getRandomInCircle = (position, radius) => {
    let dist = (Math.random() * radius);
    let angle = Math.random() * 360;
    let newPosition = new Point(position.x, position.y);
    newPosition.x += Math.ceil(Math.cos((angle / 360) * 2 * Math.PI) * dist);
    newPosition.y += Math.ceil(Math.sin((angle / 360) * 2 * Math.PI) * dist);
    return newPosition;
};
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
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["knife"] = 0] = "knife";
    WeaponType[WeaponType["pistol"] = 1] = "pistol";
    WeaponType[WeaponType["shotgun"] = 2] = "shotgun";
    WeaponType[WeaponType["rifle"] = 3] = "rifle";
    WeaponType[WeaponType["flamethrower"] = 4] = "flamethrower";
    WeaponType[WeaponType["claws"] = 20] = "claws";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
;
var WeaponAmmoType;
(function (WeaponAmmoType) {
    WeaponAmmoType[WeaponAmmoType["pistol"] = 1001] = "pistol";
    WeaponAmmoType[WeaponAmmoType["shotgun"] = 1002] = "shotgun";
    WeaponAmmoType[WeaponAmmoType["rifle"] = 1003] = "rifle";
})(WeaponAmmoType = exports.WeaponAmmoType || (exports.WeaponAmmoType = {}));
;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["knife"] = 0] = "knife";
    ItemType[ItemType["pistol"] = 1] = "pistol";
    ItemType[ItemType["shotgun"] = 2] = "shotgun";
    ItemType[ItemType["rifle"] = 3] = "rifle";
    ItemType[ItemType["flamethrower"] = 4] = "flamethrower";
    ItemType[ItemType["medicalkit"] = 101] = "medicalkit";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
;
var UpgradeCategory;
(function (UpgradeCategory) {
    UpgradeCategory[UpgradeCategory["item"] = 0] = "item";
    UpgradeCategory[UpgradeCategory["ammo"] = 1] = "ammo";
})(UpgradeCategory = exports.UpgradeCategory || (exports.UpgradeCategory = {}));
var TerrainMaterial;
(function (TerrainMaterial) {
    TerrainMaterial[TerrainMaterial["dirt"] = 1] = "dirt";
    TerrainMaterial[TerrainMaterial["water"] = 2] = "water";
    TerrainMaterial[TerrainMaterial["stone"] = 3] = "stone";
})(TerrainMaterial = exports.TerrainMaterial || (exports.TerrainMaterial = {}));
var TerrainMaterialWithoutWater;
(function (TerrainMaterialWithoutWater) {
    TerrainMaterialWithoutWater[TerrainMaterialWithoutWater["dirt"] = 1] = "dirt";
    TerrainMaterialWithoutWater[TerrainMaterialWithoutWater["stone"] = 3] = "stone";
})(TerrainMaterialWithoutWater = exports.TerrainMaterialWithoutWater || (exports.TerrainMaterialWithoutWater = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["up"] = 0] = "up";
    Orientation[Orientation["right"] = 1] = "right";
    Orientation[Orientation["down"] = 2] = "down";
    Orientation[Orientation["left"] = 3] = "left";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var CornerOrientation;
(function (CornerOrientation) {
    CornerOrientation[CornerOrientation["RU"] = 0] = "RU";
    CornerOrientation[CornerOrientation["RD"] = 1] = "RD";
    CornerOrientation[CornerOrientation["LD"] = 2] = "LD";
    CornerOrientation[CornerOrientation["LU"] = 3] = "LU";
})(CornerOrientation = exports.CornerOrientation || (exports.CornerOrientation = {}));
var ParticleType;
(function (ParticleType) {
    ParticleType[ParticleType["fire"] = 0] = "fire";
})(ParticleType = exports.ParticleType || (exports.ParticleType = {}));
;
var MapObjectType;
(function (MapObjectType) {
    MapObjectType[MapObjectType["GR_LU"] = 1] = "GR_LU";
    MapObjectType[MapObjectType["GR_LD"] = 2] = "GR_LD";
    MapObjectType[MapObjectType["GR_RU"] = 3] = "GR_RU";
    MapObjectType[MapObjectType["GR_RD"] = 4] = "GR_RD";
    MapObjectType[MapObjectType["GR_L"] = 5] = "GR_L";
    MapObjectType[MapObjectType["GR_R"] = 6] = "GR_R";
    MapObjectType[MapObjectType["GR_D"] = 7] = "GR_D";
    MapObjectType[MapObjectType["GR_U"] = 8] = "GR_U";
    MapObjectType[MapObjectType["GR_EU"] = 9] = "GR_EU";
    MapObjectType[MapObjectType["GR_ED"] = 10] = "GR_ED";
    MapObjectType[MapObjectType["GR_EL"] = 11] = "GR_EL";
    MapObjectType[MapObjectType["GR_ER"] = 12] = "GR_ER";
})(MapObjectType = exports.MapObjectType || (exports.MapObjectType = {}));
function randomEnum(myEnum) {
    const enumValues = Object.keys(myEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n));
    const randomIndex = getRandomInt(0, enumValues.length);
    return enumValues[randomIndex];
}
exports.randomEnum = randomEnum;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandomInt = getRandomInt;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const FireFlameClient_1 = __webpack_require__(20);
const SmokeClient_1 = __webpack_require__(24);
const Particle_1 = __webpack_require__(12);
const Effects_1 = __webpack_require__(26);
const Filters_1 = __webpack_require__(27);
const GeometryAndPhysics_1 = __webpack_require__(0);
const canvas_1 = __webpack_require__(4);
const MapControler_1 = __webpack_require__(7);
const GameSoundManager_1 = __webpack_require__(34);
const UpgradeClient_1 = __webpack_require__(35);
const MapClient_1 = __webpack_require__(36);
const PlayerClient_1 = __webpack_require__(5);
const BulletClient_1 = __webpack_require__(37);
const EnemyClient_1 = __webpack_require__(13);
const ExplosionClient_1 = __webpack_require__(14);
const Inventory_1 = __webpack_require__(15);
const ParticleClient_1 = __webpack_require__(47);
exports.selfId = 0;
let smokeTest = false;
let flameModeOn = false;
let flameFire = false;
exports.inventory = new Inventory_1.Inventory(socket, false, 0);
MapControler_1.MapController.loadMaps();
exports.currentMap = new MapClient_1.MapClient(null, "forest");
socket.on('updateInventory', function (items) {
    exports.inventory.items = items;
    exports.inventory.refreshRender();
});
exports.gameSoundManager = new GameSoundManager_1.GameSoundManager();
exports.canvasFilters = new Filters_1.Filters(ctx);
exports.effects = new Effects_1.Effects(ctx);
let flame = new FireFlameClient_1.FireFlameClient(new GeometryAndPhysics_1.Point(250, 250), 0);
socket.on('mapData', function (data) {
    MapControler_1.MapController.updateMap(data);
    if (exports.currentMap.name == data.name) {
        exports.currentMap.reloadMap(MapControler_1.MapController.getMap(data.name));
        canvas_1.camera.updateWorldSize(exports.currentMap.map.width, exports.currentMap.map.height);
    }
});
socket.on('init', function (data) {
    if (data.selfId) {
        exports.selfId = data.selfId;
    }
    for (let i = 0, length = data.player.length; i < length; i++) {
        new PlayerClient_1.PlayerClient(data.player[i]);
    }
    if (data.smoke !== undefined) {
        for (let i = 0, length = data.smoke.length; i < length; i++) {
            new SmokeClient_1.SmokeClient(data.smoke[i]);
        }
    }
    for (let i = 0, length = data.bullet.length; i < length; i++) {
        new BulletClient_1.BulletClient(data.bullet[i]);
    }
    for (let i = 0, length = data.enemy.length; i < length; i++) {
        new EnemyClient_1.EnemyClient(data.enemy[i]);
    }
    if (data.upgrade !== undefined) {
        for (let i = 0, length = data.upgrade.length; i < length; i++) {
            new UpgradeClient_1.UpgradeClient(data.upgrade[i]);
        }
    }
    if (data.particle !== undefined) {
        for (let i = 0, length = data.particle.length; i < length; i++) {
            new ParticleClient_1.ParticleClient(data.particle[i]);
        }
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
            if (pack.weapon !== undefined) {
                p.weapon = pack.weapon;
            }
            if (pack.attackMelee !== undefined) {
                p.attackMelee = pack.attackMelee;
            }
            if (pack.moving !== undefined) {
                p.moving = pack.moving;
            }
            if (pack.aimAngle !== undefined) {
            }
            if (pack.ammo !== undefined) {
                p.ammo = pack.ammo;
            }
            if (pack.ammoInGun !== undefined) {
                p.ammoInGun = pack.ammoInGun;
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
                    if (p.reload)
                        exports.gameSoundManager.playWeaponReload(p.weapon);
                    exports.gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                    p.attackStarted = true;
                    p.bodySpriteAnimCounter = 0;
                }
            }
        }
    }
    for (let i = 0, length = data.enemy.length; i < length; i++) {
        let pack = data.enemy[i];
        let p = EnemyClient_1.EnemyClient.list[pack.id];
        if (p) {
            if (pack.position !== undefined) {
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            }
            if (pack.hp !== undefined) {
                p.hp = pack.hp;
            }
            if (pack.weapon !== undefined) {
                p.weapon = pack.weapon;
            }
            if (pack.attackMelee !== undefined) {
                p.attackMelee = pack.attackMelee;
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
                    if (p.reload)
                        exports.gameSoundManager.playWeaponReload(p.weapon);
                    exports.gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                    p.attackStarted = true;
                    p.spriteAnimCounter = 0;
                }
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
    for (let i = 0, length = data.particle.length; i < length; i++) {
        let pack = data.particle[i];
        let p = ParticleClient_1.ParticleClient.list[pack.id];
        if (p) {
            if (pack.position !== undefined) {
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            }
        }
    }
    for (let i = 0, length = data.smoke.length; i < length; i++) {
        let pack = data.smoke[i];
        let s = SmokeClient_1.SmokeClient.list[pack.id];
        if (s) {
            if (pack.radius !== undefined) {
                if (s.radius !== pack.radius) {
                    s.radius = pack.radius;
                    s.updateRadius();
                }
            }
        }
    }
    gui.draw();
    if (PlayerClient_1.PlayerClient.list[exports.selfId] !== undefined) {
        canvas_1.camera.updatePosition(PlayerClient_1.PlayerClient.list[exports.selfId].position);
        let position = canvas_1.camera.isPositionNearEdge(PlayerClient_1.PlayerClient.list[exports.selfId].position);
        if (position)
            updateMouse();
    }
});
socket.on('remove', function (data) {
    for (let i = 0, length = data.player.length; i < length; i++) {
        delete PlayerClient_1.PlayerClient.list[data.player[i]];
    }
    for (let i = 0, length = data.bullet.length; i < length; i++) {
        if (BulletClient_1.BulletClient.list[data.bullet[i].id]) {
            BulletClient_1.BulletClient.list[data.bullet[i].id].hit(data.bullet[i].hitCategory, data.bullet[i].hitEntityCategory, data.bullet[i].hitEntityId);
        }
        delete BulletClient_1.BulletClient.list[data.bullet[i].id];
    }
    for (let i = 0, length = data.enemy.length; i < length; i++) {
        exports.gameSoundManager.playDeath(EnemyClient_1.EnemyClient.list[data.enemy[i]].kind);
        delete EnemyClient_1.EnemyClient.list[data.enemy[i]];
    }
    for (let i = 0, length = data.upgrade.length; i < length; i++) {
        delete UpgradeClient_1.UpgradeClient.list[data.upgrade[i]];
    }
    for (let i = 0, length = data.particle.length; i < length; i++) {
        delete ParticleClient_1.ParticleClient.list[data.particle[i].id];
    }
    for (let i = 0, length = data.smoke.length; i < length; i++) {
        delete SmokeClient_1.SmokeClient.list[data.smoke[i]];
    }
});
setInterval(function () {
    if (!exports.selfId) {
        return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    exports.currentMap.draw();
    for (let i in PlayerClient_1.PlayerClient.list) {
        if (PlayerClient_1.PlayerClient.list[i].moving) {
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
    for (let i in UpgradeClient_1.UpgradeClient.list) {
        UpgradeClient_1.UpgradeClient.list[i].draw();
    }
    for (let i in EnemyClient_1.EnemyClient.list) {
        if (EnemyClient_1.EnemyClient.list[i].moving || EnemyClient_1.EnemyClient.list[i].attackStarted) {
            if (EnemyClient_1.EnemyClient.list[i].attackStarted) {
                EnemyClient_1.EnemyClient.list[i].spriteAnimCounter += 0.8;
            }
            else {
                EnemyClient_1.EnemyClient.list[i].spriteAnimCounter += 0.4;
            }
        }
        EnemyClient_1.EnemyClient.list[i].draw();
    }
    for (let i in ExplosionClient_1.ExplosionClient.list) {
        ExplosionClient_1.ExplosionClient.list[i].spriteAnimCounter += 0.4;
        if (ExplosionClient_1.ExplosionClient.list[i].isCompleted()) {
            delete ExplosionClient_1.ExplosionClient.list[i];
        }
        else {
            ExplosionClient_1.ExplosionClient.list[i].draw();
        }
    }
    ctx.globalCompositeOperation = "lighter";
    for (let i in ParticleClient_1.ParticleClient.list) {
        ParticleClient_1.ParticleClient.list[i].draw();
    }
    ctx.globalCompositeOperation = "source-over";
    flame.update(flameFire);
    flame.draw();
    exports.effects.draw();
    exports.effects.update();
    for (let i in SmokeClient_1.SmokeClient.list) {
        SmokeClient_1.SmokeClient.list[i].update();
        SmokeClient_1.SmokeClient.list[i].draw();
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
    else if (event.keyCode === 53)
        socket.emit('keyPress', { inputId: '5', state: true });
    else if (event.keyCode === 32) {
        socket.emit('keyPress', { inputId: 'space', state: true });
        return false;
    }
    else if (event.keyCode === 77) {
        socket.emit('keyPress', { inputId: 'map', state: true, map: exports.currentMap.map.name });
    }
    if (event.keyCode === 107) {
        exports.canvasFilters.bAdjustment++;
    }
    if (event.keyCode === 109) {
        exports.canvasFilters.bAdjustment--;
    }
    if (event.keyCode === 79) {
        if (smokeTest) {
            for (let i in Particle_1.Particle.list) {
                delete Particle_1.Particle.list[i];
            }
            smokeTest = false;
        }
        else {
            exports.effects.initSmoke(60);
            smokeTest = true;
        }
    }
    if (event.keyCode === 38) {
        if (smokeTest) {
            exports.effects.initSmoke(60);
        }
    }
    if (event.keyCode === 40) {
        if (smokeTest) {
            exports.effects.decreaseSmoke(60);
        }
    }
    if (event.keyCode === 66) {
        socket.emit('keyPress', { inputId: 'smoke' });
    }
    if (event.keyCode === 70) {
        flameModeOn = flameModeOn ? false : true;
    }
    if (event.keyCode === 80) {
        let elt = document.getElementById("gameDiv");
        console.log("Requesting fullscreen for", elt);
        if (elt.requestFullscreen) {
            elt.requestFullscreen();
        }
        else if (elt.msRequestFullscreen) {
            elt.msRequestFullscreen();
        }
        else if (elt.mozRequestFullScreen) {
            elt.mozRequestFullScreen();
        }
        else if (elt.webkitRequestFullscreen) {
            elt.webkitRequestFullscreen();
        }
        else {
            console.error("Fullscreen not available");
        }
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
    if (flameModeOn) {
        flameFire = true;
    }
    else {
        socket.emit('keyPress', { inputId: 'attack', state: true });
    }
};
document.onmouseup = function (event) {
    if (flameModeOn) {
        flameFire = false;
    }
    else {
        socket.emit('keyPress', { inputId: 'attack', state: false });
    }
};
document.onmousemove = function (event) {
    if (exports.selfId) {
        let player = PlayerClient_1.PlayerClient.list[exports.selfId];
        let position = canvas_1.camera.getScreenPosition(player.position);
        let x = event.clientX - 8 - position.x;
        let y = event.clientY - 8 - position.y;
        mouseX = event.clientX;
        mouseY = event.clientY;
        let angle = Math.atan2(y, x) / Math.PI * 180;
        player.aimAngle = angle;
        socket.emit('keyPress', { inputId: 'mouseAngle', state: angle });
    }
};
let updateMouse = () => {
    if (exports.selfId) {
        let player = PlayerClient_1.PlayerClient.list[exports.selfId];
        let position = canvas_1.camera.getScreenPosition(player.position);
        let x = mouseX - 8 - position.x;
        let y = mouseY - 8 - position.y;
        let angle = Math.atan2(y, x) / Math.PI * 180;
        player.aimAngle = angle;
        socket.emit('keyPress', { inputId: 'mouseAngle', state: angle });
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = {};
exports.Img.map = {};
exports.Img.guibackground = new Image();
exports.Img.guibackground.src = '/client/img/guibackground.jpg';
exports.Img.smoke = new Image();
exports.Img.smoke.src = '/client/img/smoke.png';
socket.on('jsonImages', function (data) {
    console.log(data.jsonGUI);
    console.log(data.jsonPlayer);
    exports.jsonPlayer = data.jsonPlayer;
    exports.jsonGUI = data.jsonGUI;
    exports.jsonIAE = data.jsonIAE;
    exports.jsonMap = data.jsonMap;
});
exports.Img.Player = new Image();
exports.Img.Player.src = '/client/TexturePacks/PlayerImages.png';
exports.Img.Map = new Image();
exports.Img.Map.src = '/client/TexturePacks/MapImages.png';
exports.Img.IAE = new Image();
exports.Img.IAE.src = '/client/TexturePacks/ItemsAndEnemiesImages.png';
exports.Img.GUI = new Image();
exports.Img.GUI.src = '/client/TexturePacks/GUIImages.png';


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = __webpack_require__(21);
const GUI_1 = __webpack_require__(22);
gui = new GUI_1.GUI({ ctx: ctxui, width: WIDTH, height: HEIGHTUI });
exports.camera = new Camera_1.Camera(canvas, WIDTH, HEIGHT);
let resizeCanvas = function () {
    WIDTH = window.innerWidth - 4;
    HEIGHT = window.innerHeight - 48 - HEIGHTUI;
    exports.camera.resize(WIDTH, HEIGHT);
    canvasui.width = WIDTH;
    canvasui.height = HEIGHTUI;
    ctxui.font = '30px Arial';
    ctxui.mozImageSmoothingEnabled = false;
    ctxui.msImageSmoothingEnabled = false;
    ctxui.imageSmoothingEnabled = false;
    gui.resize(canvasui.width, canvasui.height);
    gui.draw();
};
resizeCanvas();
window.addEventListener('resize', function () {
    resizeCanvas();
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const GeometryAndPhysics_1 = __webpack_require__(0);
const game_1 = __webpack_require__(2);
const canvas_1 = __webpack_require__(4);
const images_2 = __webpack_require__(3);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
exports.imageName = {};
exports.mapTileImageName = {};
exports.mapTileSideImageName = {};
exports.mapTileCornerImageName = {};
exports.mapObjectImageName = {};
exports.mapObjectCollisions = {};
exports.GAME_SPEED_TOOLINGFACTOR = 0.75;
exports.TILE_SIZE = 8;
exports.imageName[enums_1.ItemType.pistol] = "pistol";
exports.imageName[enums_1.ItemType.shotgun] = "shotgun";
exports.imageName[enums_1.ItemType.rifle] = "rifle";
exports.imageName[enums_1.ItemType.medicalkit] = "medicalkit";
exports.imageName[enums_1.ItemType.knife] = "knife";
exports.imageName[enums_1.WeaponAmmoType.pistol] = "pistolammo";
exports.imageName[enums_1.WeaponAmmoType.shotgun] = "shotgunammo";
exports.imageName[enums_1.WeaponAmmoType.rifle] = "rifleammo";
exports.mapTileImageName[enums_1.TerrainMaterial.dirt] = "dirt";
exports.mapTileImageName[enums_1.TerrainMaterial.water] = "water";
exports.mapTileImageName[enums_1.TerrainMaterial.stone] = "stone";
exports.mapTileSideImageName[enums_1.Orientation.left] = {};
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.stone] = "stoneL";
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.dirt] = "dirtL";
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.water] = "waterL";
exports.mapTileSideImageName[enums_1.Orientation.right] = {};
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.stone] = "stoneR";
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.dirt] = "dirtR";
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.water] = "waterR";
exports.mapTileSideImageName[enums_1.Orientation.up] = {};
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.stone] = "stoneU";
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.dirt] = "dirtU";
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.water] = "waterU";
exports.mapTileSideImageName[enums_1.Orientation.down] = {};
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.stone] = "stoneD";
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.dirt] = "dirtD";
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.water] = "waterD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.stone] = "stoneRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.dirt] = "dirtRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.water] = "waterRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.stone] = "stoneRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.dirt] = "dirtRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.water] = "waterRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.stone] = "stoneLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.dirt] = "dirtLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.water] = "waterLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.stone] = "stoneLD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.dirt] = "dirtLD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.water] = "waterLD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_D] = "groundRingD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_U] = "groundRingU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_L] = "groundRingL";
exports.mapObjectImageName[enums_1.MapObjectType.GR_R] = "groundRingR";
exports.mapObjectImageName[enums_1.MapObjectType.GR_RU] = "groundRingRU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_LU] = "groundRingLU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_RD] = "groundRingRD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_LD] = "groundRingLD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_EU] = "groundRingUenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_ED] = "groundRingDenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_EL] = "groundRingLenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_ER] = "groundRingRenter";
exports.mapObjectCollisions[enums_1.MapObjectType.GR_D] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_U] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_L] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_R] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_RD] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_LD] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_RU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_LU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_EU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_ED] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_EL] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_ER] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const SpawnObjectMapChecker_1 = __webpack_require__(28);
const GroundRing_1 = __webpack_require__(29);
const GameMap_1 = __webpack_require__(32);
const MapTile_1 = __webpack_require__(33);
const enums_1 = __webpack_require__(1);
const GeometryAndPhysics_1 = __webpack_require__(0);
const Constants_1 = __webpack_require__(6);
class MapController {
    constructor(param) {
    }
    static reloadMaps(maps) {
        MapController.maps = {};
        MapController.maps = maps;
    }
}
MapController.maps = {};
MapController.updatePack = [];
MapController.getMap = (map) => {
    for (let i in MapController.maps) {
        if (map == MapController.maps[i].name) {
            return MapController.maps[i];
        }
    }
};
MapController.getMapPack = (map) => {
    for (let i in MapController.maps) {
        if (map == MapController.maps[i].name) {
            let gameMap = MapController.maps[i];
            let material = "";
            let sides = "";
            let objects = "";
            for (let i = 0; i < gameMap.size; i++) {
                for (let j = 0; j < gameMap.size; j++) {
                    material += gameMap.mapTiles[i][j].material + ",";
                    for (let k = 0; k < 4; k++) {
                        sides += gameMap.mapTiles[i][j].sides[k];
                        sides += (k < 3) ? "," : ";";
                    }
                    for (let k = 0, length = gameMap.mapTiles[i][j].objects.length; k < length; k++) {
                        objects += gameMap.mapTiles[i][j].objects[k];
                        objects += (k < length - 1) ? "," : ";";
                    }
                }
            }
            return { material: material, name: MapController.maps[i].name, sides: sides, objects: objects };
        }
    }
};
MapController.loadMaps = () => {
    console.log("Pierwsza Map");
    MapController.createMap("forest", 16, 20);
};
MapController.updateMap = (param) => {
    if (param !== undefined) {
        for (let i in MapController.maps) {
            if (param.name == MapController.maps[i].name) {
                let gameMap = MapController.maps[i];
                let str = param.material;
                let materialArr = str.split(",");
                let counter = 0;
                str = param.sides;
                let sidesArr = str.split(";");
                let smallsidesArr;
                str = param.objects;
                let objectsArr = str.split(";");
                let smallobjectsArr;
                console.log("MAPA OBJECTS: " + param.objects);
                for (let i = 0; i < gameMap.size; i++) {
                    for (let j = 0; j < gameMap.size; j++) {
                        gameMap.mapTiles[i][j].objects.length = 0;
                        gameMap.mapTiles[i][j].updateMaterial(materialArr[counter]);
                        str = sidesArr[counter];
                        smallsidesArr = str.split(",");
                        str = objectsArr[counter];
                        smallobjectsArr = str.split(",");
                        counter++;
                        for (let k = 0; k < 4; k++) {
                            gameMap.mapTiles[i][j].sides[k] = smallsidesArr[k];
                        }
                        for (let k = 0; k < smallobjectsArr.length; k++) {
                            gameMap.mapTiles[i][j].addObject(smallobjectsArr[k], false);
                        }
                    }
                }
            }
        }
    }
};
MapController.createMap = (name, size, seeds) => {
    let mapTiles;
    mapTiles = [];
    let seedPosition = [];
    let seedx = 0;
    let seedy = 0;
    let seedMaterial = [];
    let seedM = enums_1.TerrainMaterial.dirt;
    let waterSeeds = Math.floor(seeds / 10);
    for (let i = 0; i < seeds - waterSeeds; i++) {
        seedx = enums_1.getRandomInt(1, size);
        seedy = enums_1.getRandomInt(1, size);
        seedM = enums_1.randomEnum(enums_1.TerrainMaterialWithoutWater);
        seedPosition[i] = new GeometryAndPhysics_1.Point(seedx, seedy);
        seedMaterial[i] = seedM;
    }
    for (let i = seeds - waterSeeds; i < seeds; i++) {
        seedx = enums_1.getRandomInt(1, size);
        seedy = enums_1.getRandomInt(1, size);
        seedM = enums_1.TerrainMaterial.water;
        seedPosition[i] = new GeometryAndPhysics_1.Point(seedx, seedy);
        seedMaterial[i] = seedM;
    }
    let distance = 10000;
    let closestSeed = 0;
    for (let i = 0; i < size; i++) {
        mapTiles[i] = [];
        for (let j = 0; j < size; j++) {
            distance = 10000;
            closestSeed = 0;
            for (let k = 0; k < seeds; k++) {
                if (MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x) < distance) {
                    distance = MapController.getTileDistance(i, j, seedPosition[k].y, seedPosition[k].x);
                    closestSeed = k;
                }
            }
            mapTiles[i][j] = new MapTile_1.MapTile(Constants_1.TILE_SIZE, Constants_1.TILE_SIZE, seedMaterial[closestSeed]);
            if (j > 0) {
                if (mapTiles[i][j].material !== mapTiles[i][j - 1].material) {
                    if (mapTiles[i][j - 1].material < mapTiles[i][j].material) {
                        mapTiles[i][j].sides[enums_1.Orientation.left] = mapTiles[i][j - 1].material;
                    }
                    else {
                        mapTiles[i][j - 1].sides[enums_1.Orientation.right] = mapTiles[i][j].material;
                    }
                }
            }
            if (i > 0) {
                if (mapTiles[i][j].material !== mapTiles[i - 1][j].material) {
                    if (mapTiles[i - 1][j].material < mapTiles[i][j].material) {
                        mapTiles[i][j].sides[enums_1.Orientation.up] = mapTiles[i - 1][j].material;
                    }
                    else {
                        mapTiles[i - 1][j].sides[enums_1.Orientation.down] = mapTiles[i][j].material;
                    }
                }
            }
        }
    }
    MapController.generateGroundRings(mapTiles, seedMaterial, seedPosition);
    MapController.maps[name] = (new GameMap_1.GameMap(name, mapTiles));
};
MapController.getTileDistance = (x, y, tx, ty) => {
    return Math.sqrt((x - tx) * (x - tx) + (y - ty) * (y - ty));
};
MapController.loadObject = (mapObject, mapTiles, position) => {
    for (let i in mapObject.objectTiles) {
        let object = mapObject.objectTiles[i];
        mapTiles[position.y + object.position.y][position.x + object.position.x].addObject(object.type, true);
    }
};
MapController.generateGroundRings = (mapTiles, seedMaterial, seedPosition) => {
    let grCheckers = [];
    grCheckers[2] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(3, 3));
    grCheckers[1] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(4, 3));
    grCheckers[0] = new SpawnObjectMapChecker_1.SpawnObjectMapChecker(mapTiles, enums_1.TerrainMaterial.dirt, new GeometryAndPhysics_1.Point(5, 3));
    let grSpawnPosition;
    let gr;
    let enter;
    let seeds = seedMaterial.length;
    for (let k = 0; k < seeds; k++) {
        if (seedMaterial[k] == enums_1.TerrainMaterial.dirt) {
            for (let i = 0; i < grCheckers.length; i++) {
                grSpawnPosition = grCheckers[i].search(seedPosition[k]);
                console.log("Pozycja: " + grSpawnPosition.x + " " + grSpawnPosition.y);
                if (grSpawnPosition.x > -1 && grSpawnPosition.y > -1) {
                    enter = enums_1.randomEnum(enums_1.Orientation);
                    gr = new GroundRing_1.GroundRing(grCheckers[i].size.x, grCheckers[i].size.y, enter);
                    if (!gr.isColliding(mapTiles, new GeometryAndPhysics_1.Point(grSpawnPosition.x, grSpawnPosition.y))) {
                        MapController.loadObject(gr, mapTiles, new GeometryAndPhysics_1.Point(grSpawnPosition.x, grSpawnPosition.y));
                    }
                }
            }
        }
    }
};
exports.MapController = MapController;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Pack_1 = __webpack_require__(41);
exports.initPack = new Pack_1.Pack();
exports.removePack = new Pack_1.Pack();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = __webpack_require__(16);
const GeometryAndPhysics_1 = __webpack_require__(0);
const globalVariables_1 = __webpack_require__(8);
const enums_1 = __webpack_require__(1);
const MapControler_1 = __webpack_require__(7);
class Enemy extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.toRemove = false;
        this.kind = "";
        this.counter = 0;
        this.extendedUpdate = () => {
            this.update();
            if (this.playerToKill == undefined || this.counter % 40 === 0)
                this.playerToKill = this.getClosestPlayer(10000, 360);
            let diffX = 0;
            let diffY = 0;
            if (this.playerToKill) {
                diffX = this.playerToKill.position.x - this.position.x;
                diffY = this.playerToKill.position.y - this.position.y;
            }
            if (this.counter % 10 === 0) {
                this.updateAim(this.playerToKill, diffX, diffY);
                this.updateKeyPress(this.playerToKill, diffX, diffY);
            }
            this.updateAttack(this.playerToKill, diffX, diffY);
            this.counter++;
        };
        this.updateAim = (player, diffX, diffY) => {
            this.movementController.aimAngle = Math.atan2(diffY, diffX) / Math.PI * 180;
        };
        this.updateKeyPress = (player, diffX, diffY) => {
            let safeDistance = 20;
            safeDistance = (this.attackController.melee) ? 30 : 100;
            this.movementController.pressingRight = diffX > safeDistance;
            this.movementController.pressingLeft = diffX < -safeDistance;
            this.movementController.pressingDown = diffY > safeDistance;
            this.movementController.pressingUp = diffY < -safeDistance;
        };
        this.updateAttack = (player, diffX, diffY) => {
            this.attackController.pressingAttack = false;
            if (this.attackController.melee && Math.sqrt(diffX * diffX + diffY * diffY) < 50) {
                this.attackController.pressingAttack = true;
            }
            if (!this.attackController.melee && Math.sqrt(diffX * diffX + diffY * diffY) < 500) {
                this.attackController.pressingAttack = true;
            }
        };
        this.onDeath = () => {
            this.toRemove = true;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                kind: this.kind,
                attackStarted: this.attackController.attackStarted,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.giveWeapons = () => {
            if (this.kind == 'zombie') {
                this.inventory.addItem(enums_1.WeaponType.claws, 1);
                this.inventory.useItem(enums_1.WeaponType.claws);
            }
            if (this.kind == 'scorpion') {
                this.inventory.addItem(enums_1.WeaponType.pistol, 1);
                this.inventory.addItem(enums_1.WeaponType.shotgun, 1);
                this.inventory.addItem(enums_1.WeaponType.rifle, 1);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 10);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 20);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 5);
                if (Math.random() < 0.6) {
                    this.inventory.useItem(enums_1.WeaponType.pistol);
                }
                else {
                    if (Math.random() < 0.5) {
                        this.inventory.useItem(enums_1.WeaponType.shotgun);
                    }
                    else {
                        this.inventory.useItem(enums_1.WeaponType.rifle);
                    }
                }
            }
        };
        Enemy.list[param.id] = this;
        if (param.kind)
            this.kind = param.kind;
        this.attackController.pressingAttack = true;
        this.giveWeapons();
        globalVariables_1.initPack.enemy.push(this.getInitPack());
    }
}
Enemy.globalMapControler = new MapControler_1.MapController(null);
Enemy.update = () => {
    let pack = [];
    for (let i in Enemy.list) {
        let enemy = Enemy.list[i];
        enemy.extendedUpdate();
        if (enemy.toRemove) {
            delete Enemy.list[i];
            Enemy.randomlyGenerate('forest');
            globalVariables_1.removePack.enemy.push(enemy.id);
        }
        else {
            pack.push(enemy.getUpdatePack());
        }
    }
    return pack;
};
Enemy.getAllInitPack = function () {
    let enemies = [];
    for (let i in Enemy.list) {
        enemies.push(Enemy.list[i].getInitPack());
    }
    return enemies;
};
Enemy.randomlyGenerate = function (choosenMap) {
    let map = MapControler_1.MapController.getMap(choosenMap);
    let x = Math.random() * map.width;
    let y = Math.random() * map.height;
    let position = new GeometryAndPhysics_1.Point(x, y);
    while (map.isPositionWall(position) !== 0) {
        x = Math.random() * map.width;
        y = Math.random() * map.height;
        position.updatePosition(x, y);
    }
    let difficulty = 1 + Math.round(Math.random() * 2) * 0.5;
    let height = 48 * difficulty;
    let width = 48 * difficulty;
    let id = Math.random();
    let enemy;
    if (Math.random() < 0.5) {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 15 * difficulty,
            atkSpd: 0.8 * difficulty,
            map: choosenMap,
            img: 'scorpion',
            type: 'enemy',
            kind: 'scorpion',
            maxSpdX: 3,
            maxSpdY: 3
        });
    }
    else {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 5 * difficulty,
            atkSpd: 0.4 * difficulty,
            map: choosenMap,
            img: 'zombie',
            type: 'enemy',
            kind: 'zombie',
            maxSpdX: 7,
            maxSpdY: 7
        });
    }
};
Enemy.list = {};
exports.Enemy = Enemy;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
class WeaponTypes {
    constructor(param) {
        this.name = "";
        this.meleeDmg = 0;
        this.shootDmg = 0;
        this.shootSpeed = 0;
        this.attackRadius = 0;
        this.attackSpd = 30;
        this.attackMelee = true;
        this.reloadSpd = 30;
        this.recoil = false;
        this.maxSpd = 8;
        this.reloadAmmo = 0;
        this._weapon = (param.weapon !== undefined) ? param.weapon : enums_1.WeaponType.knife;
        this.attackRadius = (param.attackRadius !== undefined) ? param.attackRadius : 0;
        this.attackSpd = (param.attackSpd !== undefined) ? param.attackSpd : 0;
        this.attackMelee = (param.attackMelee !== undefined) ? param.attackMelee : true;
        this.shootDmg = (param.shootDmg !== undefined) ? param.shootDmg : 0;
        this.meleeDmg = (param.meleeDmg !== undefined) ? param.meleeDmg : 0;
        this.maxSpd = (param.maxSpd !== undefined) ? param.maxSpd : 8;
        this.shootSpeed = (param.shootSpeed !== undefined) ? param.shootSpeed : 0;
        this.reloadAmmo = (param.reloadAmmo !== undefined) ? param.reloadAmmo : 0;
        this.reloadSpd = (param.reloadSpd !== undefined) ? param.reloadSpd : 0;
        this.recoil = (param.recoil !== undefined) ? param.recoil : false;
        this.name = (param.name !== undefined) ? param.name : "knife";
        WeaponTypes.list[param.weapon] = this;
    }
    get weapon() { return this._weapon; }
}
WeaponTypes.getWeaponParameters = (weapon) => {
    for (let i in WeaponTypes.list) {
        let weaponFromBank = WeaponTypes.list[i];
        if (weaponFromBank.weapon == weapon) {
            return weaponFromBank;
        }
    }
    return WeaponTypes.list[0];
};
WeaponTypes.getWeaponIdbyName = (name) => {
    for (let i in WeaponTypes.list) {
        let weaponFromBank = WeaponTypes.list[i];
        if (weaponFromBank.name == name) {
            return weaponFromBank.weapon;
        }
    }
    return enums_1.WeaponType.knife;
};
WeaponTypes.list = {};
exports.WeaponTypes = WeaponTypes;
new WeaponTypes({ weapon: enums_1.WeaponType.pistol, name: "pistol",
    attackRadius: 0,
    attackSpd: 4,
    attackMelee: false,
    shootDmg: 2,
    meleeDmg: 2,
    maxSpd: 10,
    shootSpeed: 30,
    reloadAmmo: 6,
    reloadSpd: 5,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.flamethrower, name: "flamethrower",
    attackRadius: 0,
    attackSpd: 4,
    attackMelee: false,
    shootDmg: 2,
    meleeDmg: 2,
    maxSpd: 10,
    shootSpeed: 30,
    reloadAmmo: 0,
    reloadSpd: -1,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.shotgun, name: "shotgun",
    attackRadius: 3,
    attackSpd: 2,
    attackMelee: false,
    shootDmg: 3,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 25,
    reloadAmmo: 2,
    reloadSpd: 2,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.knife, name: "knife",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 8,
    maxSpd: 11,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.rifle, name: "rifle",
    attackRadius: 0,
    attackSpd: 1,
    attackMelee: false,
    shootDmg: 15,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 40,
    reloadAmmo: 1,
    reloadSpd: 2,
    recoil: true
});
new WeaponTypes({ weapon: enums_1.WeaponType.claws, name: "claws",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 5,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Flame_1 = __webpack_require__(39);
const Smoke_1 = __webpack_require__(46);
const globalVariables_1 = __webpack_require__(8);
const Enemy_1 = __webpack_require__(9);
const Bullet_1 = __webpack_require__(18);
const Actor_1 = __webpack_require__(16);
const GeometryAndPhysics_1 = __webpack_require__(0);
const enums_1 = __webpack_require__(1);
const MapControler_1 = __webpack_require__(7);
class Player extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.giveItems = () => {
            this.inventory.addItem(enums_1.ItemType.knife, 1);
            this.inventory.addItem(enums_1.ItemType.pistol, 1);
            this.inventory.addItem(enums_1.ItemType.shotgun, 1);
            this.inventory.addItem(enums_1.ItemType.rifle, 1);
            this.inventory.addItem(enums_1.ItemType.flamethrower, 1);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 100);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 200);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 100);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.flamethrower, 100);
            this.inventory.addItem(enums_1.ItemType.medicalkit, 4);
            this.inventory.useItem(enums_1.WeaponType.shotgun);
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                weapon: this.attackController.activeWeapon.name,
                attackStarted: this.attackController.attackStarted,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.onDeath = () => {
            this.lifeAndBodyController.reset();
            let map = MapControler_1.MapController.getMap(this.map);
            let x = Math.random() * map.width;
            let y = Math.random() * map.height;
            let position = new GeometryAndPhysics_1.Point(x, y);
            while (map.isPositionWall(position)) {
                x = Math.random() * map.width;
                y = Math.random() * map.height;
                position.updatePosition(x, y);
            }
            this.setPosition(position);
        };
        globalVariables_1.initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
        this.giveItems();
        for (let i = 0; i < 1; i++) {
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
        }
    }
}
Player.onConnect = (socket) => {
    let map = 'forest';
    let player = new Player({
        id: socket.id,
        maxSpdX: 12,
        maxSpdY: 12,
        map: map,
        img: 'player',
        atkSpd: 7,
        width: 50,
        height: 50,
        type: "player",
        hp: 40,
        socket: socket
    });
    let flame = new Flame_1.Flame({ parent: player, map: map, offset: 50, life: 30 });
    socket.on('changeWeapon', function (data) {
        if (data.state == 'next') {
            player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
        }
        if (data.state == 'prev') {
            player.attackController.weaponCollection.choosePrevWeaponWithAmmo();
        }
    });
    socket.on('keyPress', function (data) {
        if (data.inputId == 'left')
            player.movementController.pressingLeft = data.state;
        if (data.inputId == 'right')
            player.movementController.pressingRight = data.state;
        if (data.inputId == 'up')
            player.movementController.pressingUp = data.state;
        if (data.inputId == 'down')
            player.movementController.pressingDown = data.state;
        if (data.inputId == 'attack')
            player.attackController.pressingAttack = data.state;
        if (data.inputId == 'mouseAngle')
            player.movementController.aimAngle = data.state;
        if (data.inputId == 'heal')
            player.inventory.useItem(enums_1.ItemType.medicalkit);
        if (data.inputId == '1')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.knife);
        if (data.inputId == '2')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.pistol);
        if (data.inputId == '3')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.shotgun);
        if (data.inputId == '4')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.rifle);
        if (data.inputId == '5')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.flamethrower);
        if (data.inputId == 'space')
            player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
        if (data.inputId == 'smoke')
            new Smoke_1.Smoke(new GeometryAndPhysics_1.Point(player.position.x - 128, player.position.y - 128), 150, 750, 20, player.map);
        if (data.inputId == 'map') {
            let gameMap = MapControler_1.MapController.getMap(data.map);
            MapControler_1.MapController.createMap(data.map, gameMap.size, 20);
            MapControler_1.MapController.updatePack.push(MapControler_1.MapController.getMapPack(data.map));
        }
    });
    socket.emit('init', { player: Player.getAllInitPack(), bullet: Bullet_1.Bullet.getAllInitPack(), enemy: Enemy_1.Enemy.getAllInitPack(), selfId: socket.id });
    socket.emit('mapData', MapControler_1.MapController.getMapPack("forest"));
};
Player.getAllInitPack = () => {
    let players = [];
    for (let i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }
    return players;
};
Player.onDisconnect = (socket) => {
    delete Player.list[socket.id];
    globalVariables_1.removePack.player.push(socket.id);
};
Player.update = () => {
    let pack = [];
    for (let i in Player.list) {
        let player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
};
Player.list = {};
exports.Player = Player;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
class Particle {
    constructor(ctx) {
        this.ctx = ctx;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.radius = 5;
        this.maxLifeTime = 100;
        this.draw = () => {
            if (this.image) {
                this.ctx.globalAlpha = this.lifeTime / this.maxLifeTime;
                this.ctx.drawImage(this.image, this.position.x - 128, this.position.y - 128);
                this.ctx.globalAlpha = 1.0;
                return;
            }
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
            this.ctx.fill();
            this.ctx.closePath();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            if (this.position.x >= WIDTH) {
                this.velocity.x = -this.velocity.x;
                this.position.x = WIDTH;
            }
            else if (this.position.x <= 0) {
                this.velocity.x = -this.velocity.x;
                this.position.x = 0;
            }
            if (this.position.y >= HEIGHT) {
                this.velocity.y = -this.velocity.y;
                this.position.y = HEIGHT;
            }
            else if (this.position.y <= 0) {
                this.velocity.y = -this.velocity.y;
                this.position.y = 0;
            }
            this.lifeTime--;
        };
        this.setImage = (image) => {
            this.image = image;
        };
        let id = Math.random();
        Particle.list[id] = this;
        this.maxLifeTime += Math.random() * 800;
        this.lifeTime = this.maxLifeTime;
    }
}
Particle.list = {};
exports.Particle = Particle;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const canvas_1 = __webpack_require__(4);
const PlayerClient_1 = __webpack_require__(5);
const GeometryAndPhysics_1 = __webpack_require__(0);
const game_1 = __webpack_require__(2);
class EnemyClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
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
            let frameWidth = 32;
            let frameHeight = 32;
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
                this.drawTopViewSprite(this.position.x, this.position.y, aimAngle);
            }
            else {
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
            let spriteColumns = framesAttack[this.kind];
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
            let walkingMod = Math.floor(this.spriteAnimCounter) % framesMove[this.kind];
            let frame = images_1.jsonIAE["frames"][this.kind + "_move.png"]["frame"];
            let frameWidth = frame["w"] / framesMove[this.kind];
            let frameHeight = frame["h"];
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, aimAngle, 0, walkingMod, x, y, this.width, this.height, frame["x"], frame["y"]);
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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const GeometryAndPhysics_1 = __webpack_require__(0);
const PlayerClient_1 = __webpack_require__(5);
const game_1 = __webpack_require__(2);
const canvas_1 = __webpack_require__(4);
class ExplosionClient {
    constructor(param) {
        this.id = Math.random();
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.width = 32;
        this.height = 32;
        this.spriteAnimCounter = 0;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let frame = images_1.jsonIAE["frames"][this.img + ".png"]["frame"];
            let frameWidth = frame["w"] / this.animColumns;
            let frameHeight = frame["h"] / this.animRows;
            let spriteColumn = Math.floor(this.spriteAnimCounter) % this.animColumns;
            let spriteRow = Math.floor(this.spriteAnimCounter / this.animColumns);
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, 0, spriteRow, spriteColumn, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height, frame["x"], frame["y"]);
        };
        this.isCompleted = () => {
            if (this.spriteAnimCounter > (this.animRows * this.animColumns))
                return true;
            else
                return false;
        };
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? param.img : this.img;
        this.category = param.category ? param.category : this.category;
        this.animRows = param.spriteRows ? param.spriteRows : this.animRows;
        this.animColumns = param.spriteColumns ? param.spriteColumns : this.animColumns;
        ExplosionClient.list[this.id] = this;
    }
}
ExplosionClient.list = {};
exports.ExplosionClient = ExplosionClient;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __webpack_require__(38);
const Player_1 = __webpack_require__(11);
class Inventory {
    constructor(socket, server, owner) {
        this.items = [];
        this.socket = 0;
        this.server = false;
        this.addItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount += amount;
                    Item_1.Item.list[id].add(this.owner, amount);
                    this.refreshRender();
                    return;
                }
            }
            this.items.push({ id: id, amount: amount });
            Item_1.Item.list[id].add(this.owner, amount);
            this.refreshRender();
        };
        this.removeItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount -= amount;
                    Item_1.Item.list[id].remove(this.owner, amount);
                    if (this.items[i].amount <= 0)
                        this.items.splice(i, 1);
                    this.refreshRender();
                    return;
                }
            }
        };
        this.hasItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount >= amount;
                }
            }
            return false;
        };
        this.useItem = (id) => {
            if (this.hasItem(id, 1)) {
                Item_1.Item.list[id].event(this.owner);
            }
        };
        this.getItemAmount = (id) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount;
                }
            }
            return 0;
        };
        this.refreshRender = () => {
            if (this.server) {
                if (!this.socket) {
                    return;
                }
                this.socket.emit('updateInventory', this.items);
                return;
            }
            let inventory = document.getElementById("inventory");
            inventory.innerHTML = "";
            let addButton = function (data, socket) {
                let item = Item_1.Item.list[data.id];
                let button = document.createElement('button');
                button.onclick = function () {
                    socket.emit("useItem", item.id);
                };
                button.innerText = item.name + " x" + data.amount;
                inventory.appendChild(button);
            };
            for (let i = 0; i < this.items.length; i++) {
                let item = Item_1.Item.list[this.items[i].id];
                addButton(this.items[i], this.socket);
            }
        };
        this.socket = socket ? socket : 0;
        this.server = server ? server : false;
        this.owner = owner ? owner : 0;
        if (this.server && this.socket) {
            let currentInventory = this;
            this.socket.on("useItem", function (itemId) {
                if (!currentInventory.hasItem(itemId, 1)) {
                    console.log("Cheater!");
                    return;
                }
                let item = Item_1.Item.list[itemId];
                item.event(Player_1.Player.list[currentInventory.socket.id]);
            });
        }
    }
}
exports.Inventory = Inventory;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = __webpack_require__(15);
const MapControler_1 = __webpack_require__(7);
const MovementController_1 = __webpack_require__(42);
const AttackControler_1 = __webpack_require__(43);
const LifeAndBodyController_1 = __webpack_require__(45);
const Entity_1 = __webpack_require__(19);
const Player_1 = __webpack_require__(11);
const Enemy_1 = __webpack_require__(9);
const GeometryAndPhysics_1 = __webpack_require__(0);
class Actor extends Entity_1.Entity {
    constructor(param) {
        super(param);
        this.update = () => {
            this.movementController.updateSpd();
            this.attackController.update();
            this.updatePosition();
        };
        this.getClosestPlayer = (distance, angleLimit) => {
            let closestEnemyIndex = "0";
            let closestEnemyDistance = 100000;
            let pangle = this.movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            for (let i in Player_1.Player.list) {
                let enemy = Player_1.Player.list[i];
                if (enemy !== this) {
                    let angle = GeometryAndPhysics_1.calculateAngleBetweenEntities(this, enemy);
                    let maxDistance = Math.sqrt(enemy.width * enemy.width / 4 + enemy.height * enemy.height / 4) + distance;
                    let distanceFromEnemy = this.getDistance(enemy);
                    if (distanceFromEnemy < maxDistance) {
                        if ((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)) {
                            if (closestEnemyDistance > distanceFromEnemy) {
                                closestEnemyDistance = distanceFromEnemy;
                                closestEnemyIndex = i;
                            }
                        }
                    }
                }
            }
            if (closestEnemyIndex == "-1")
                return null;
            return Player_1.Player.list[closestEnemyIndex];
        };
        this.getClosestEnemy = (distance, angleLimit) => {
            let closestEnemyIndex = "-1";
            let closestEnemyDistance = 100000;
            let pangle = this.movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            for (let i in Enemy_1.Enemy.list) {
                let enemy = Enemy_1.Enemy.list[i];
                let angle = GeometryAndPhysics_1.calculateAngleBetweenEntities(this, enemy);
                let maxDistance = Math.sqrt(enemy.width * enemy.width / 4 + enemy.height * enemy.height / 4) + distance;
                let distanceFromEnemy = this.getDistance(enemy);
                if (distanceFromEnemy < maxDistance) {
                    if ((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)) {
                        if (closestEnemyDistance > distanceFromEnemy) {
                            closestEnemyDistance = distanceFromEnemy;
                            closestEnemyIndex = i;
                        }
                    }
                }
            }
            if (closestEnemyIndex == "-1")
                return null;
            return Enemy_1.Enemy.list[closestEnemyIndex];
        };
        this.getClosestPlayerorEnemy = (distance, angleLimit) => {
            let enemy = this.getClosestEnemy(distance, angleLimit);
            let player = this.getClosestPlayer(distance, angleLimit);
            if (this.getDistance(enemy) < this.getDistance(player)) {
                if (enemy !== null) {
                    return enemy;
                }
                else {
                    return null;
                }
            }
            else {
                if (player !== null) {
                    return player;
                }
                else {
                    return null;
                }
            }
        };
        this.onDeath = () => { };
        this.lifeAndBodyController = new LifeAndBodyController_1.LifeAndBodyController(this, param);
        this.attackController = new AttackControler_1.AttackController(this, param);
        this.movementController = new MovementController_1.MovementController(this, param);
        this.mapController = new MapControler_1.MapController(param);
        this.inventory = new Inventory_1.Inventory(param.socket, true, this);
    }
}
exports.Actor = Actor;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor(max, inc = 1, _value = 0, active = false) {
        this.max = max;
        this.inc = inc;
        this._value = _value;
        this.active = active;
        this.count = () => this._value += this.inc;
        this.resetIfMax = () => {
            if (this._value >= this.max && this.active) {
                this._value = 0;
                return true;
            }
            else {
                return false;
            }
        };
        this.setInc = (inc) => this.inc = inc;
        this.reset = () => this._value = 0;
        this.activate = () => {
            this.active = true;
            this._value = 0;
        };
        this.deactivate = () => this.active = false;
        this.isActive = () => { return this.active; };
    }
    get value() { return this._value; }
    ;
}
exports.Counter = Counter;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Enemy_1 = __webpack_require__(9);
const Player_1 = __webpack_require__(11);
const Entity_1 = __webpack_require__(19);
const globalVariables_1 = __webpack_require__(8);
const MapControler_1 = __webpack_require__(7);
class Bullet extends Entity_1.Entity {
    constructor(param) {
        super(Bullet.updateParam(param));
        this.combatType = 'player';
        this.angle = 0;
        this.spdX = 1;
        this.spdY = 1;
        this.timer = 0;
        this.toRemove = false;
        this.hitCategory = 0;
        this.hitEntityCategory = "";
        this.hitEntityId = -1;
        this.update = () => {
            this.updatePosition();
            if (this.timer++ > 100)
                this.toRemove = true;
            switch (this.combatType) {
                case 'player': {
                    let player = Player_1.Player.list[this.parent];
                    for (let key in Enemy_1.Enemy.list) {
                        let enemy = Enemy_1.Enemy.list[key];
                        if (this.testCollision(enemy)) {
                            this.toRemove = true;
                            enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                            this.setHitProperties(1, "enemy", enemy.id);
                        }
                    }
                    for (let key in Player_1.Player.list) {
                        if (Player_1.Player.list[key].id !== this.parent) {
                            let enemyPlayer = Player_1.Player.list[key];
                            if (this.testCollision(enemyPlayer)) {
                                this.toRemove = true;
                                enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                                this.setHitProperties(1, "player", enemyPlayer.id);
                            }
                        }
                    }
                    break;
                }
                case 'enemy': {
                    let enemy = Enemy_1.Enemy.list[this.parent];
                    for (let key in Player_1.Player.list) {
                        let player = Player_1.Player.list[key];
                        if (this.testCollision(player)) {
                            this.toRemove = true;
                            this.setHitProperties(1, "player", player.id);
                            (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);
                        }
                    }
                    break;
                }
            }
            let map = MapControler_1.MapController.getMap(this.map);
            if (map.isPositionWall(this.position) > 2) {
                this.toRemove = true;
                this.hitCategory = 2;
            }
        };
        this.setHitProperties = (hitCategory, hitEntityCategory, hitEntityId) => {
            this.hitCategory = hitCategory;
            this.hitEntityCategory = hitEntityCategory;
            this.hitEntityId = hitEntityId;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                combatType: this.combatType,
                hitCategory: this.hitCategory
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                hitCategory: this.hitCategory
            };
        };
        this.mapController = new MapControler_1.MapController(null);
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.angle = param.angle ? param.angle : this.angle;
        if (param.shootspeed !== undefined) {
            this.spdX = param.shootspeed ? Math.cos(this.angle / 180 * Math.PI) * param.shootspeed : Math.cos(this.angle / 180 * Math.PI);
            this.spdY = param.shootspeed ? Math.sin(this.angle / 180 * Math.PI) * param.shootspeed : Math.sin(this.angle / 180 * Math.PI);
        }
        this.setSpdX(this.spdX);
        this.setSpdY(this.spdY);
        this.parent = param.parent ? param.parent : -1;
        globalVariables_1.initPack.bullet.push(this.getInitPack());
        Bullet.list[this.id] = this;
    }
}
Bullet.update = () => {
    let pack = [];
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove) {
            delete Bullet.list[i];
            globalVariables_1.removePack.bullet.push({ id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId });
        }
        else {
            pack.push(bullet.getUpdatePack());
        }
    }
    return pack;
};
Bullet.getAllInitPack = function () {
    let bullets = [];
    for (let i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
};
Bullet.updateParam = (param) => {
    param.id = Math.random();
    return param;
};
Bullet.list = {};
exports.Bullet = Bullet;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const globalVariables_1 = __webpack_require__(8);
const Constants_1 = __webpack_require__(6);
class Entity {
    constructor(param) {
        this._position = new GeometryAndPhysics_1.Point(250, 250);
        this._width = 32;
        this._height = 32;
        this._speed = new GeometryAndPhysics_1.Velocity(0, 0);
        this._id = Math.random();
        this._map = "forest";
        this._type = "entity";
        this._img = "";
        this.updatePosition = () => this._position.changePosition(this._speed.x * Constants_1.GAME_SPEED_TOOLINGFACTOR, this._speed.y * Constants_1.GAME_SPEED_TOOLINGFACTOR);
        this.update = () => this.updatePosition();
        this.getDistance = (entity) => {
            if (entity == null)
                return 10000000;
            return this._position.getDistance(entity.position);
        };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this._position.x - (this._width / 4), this._position.y - (this._height / 4));
            let pos2 = new GeometryAndPhysics_1.Point(entity._position.x - (entity._width / 4), entity._position.y - (entity._height / 4));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this._width / 2, this._height / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity._width / 2, entity._height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.setSpdX = (speedX) => { this._speed.x = speedX; };
        this.setSpdY = (speedY) => { this._speed.y = speedY; };
        if (param) {
            this._position = param.position ? param.position : this._position;
            this._width = param.width ? param.width : this._width;
            this._height = param.height ? param.height : this._height;
            this._speed = param.speed ? param.speed : this._speed;
            this._id = param.id ? param.id : this._id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this._img = param.img ? param.img : this._img;
        }
    }
    get type() { return this._type; }
    get position() { return this._position; }
    get width() { return this._width; }
    get height() { return this._height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    get id() { return this._id; }
    get img() { return this._img; }
    setPosition(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}
Entity.getFrameUpdateData = () => { return { removePack: globalVariables_1.removePack, initPack: globalVariables_1.initPack }; };
exports.Entity = Entity;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(2);
const PlayerClient_1 = __webpack_require__(5);
const GeometryAndPhysics_1 = __webpack_require__(0);
const FireParticle_1 = __webpack_require__(23);
class FireFlameClient {
    constructor(position, angle) {
        this.particles = [];
        this.angle = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.speed = 5;
        this.draw = () => {
            ctx.globalCompositeOperation = "lighter";
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
            ctx.globalCompositeOperation = "source-over";
        };
        this.update = (create) => {
            if (create) {
                for (let i = 0; i < 10; i++) {
                    let p = new FireParticle_1.FireParticle(60);
                    let oldpos = new GeometryAndPhysics_1.Point(PlayerClient_1.PlayerClient.list[game_1.selfId].position.x, PlayerClient_1.PlayerClient.list[game_1.selfId].position.y);
                    let angle = PlayerClient_1.PlayerClient.list[game_1.selfId].aimAngle + 180;
                    oldpos.x -= Math.cos((angle * Math.PI) / 180) * 50;
                    oldpos.y -= Math.sin((angle * Math.PI) / 180) * 50;
                    p.position.updatePosition(oldpos.x, oldpos.y);
                    let flame = (0 - Math.random() * 2 * this.speed);
                    p.velocity.x = Math.cos((angle * Math.PI * 2) / 360) * flame;
                    p.velocity.y = Math.sin((angle * Math.PI * 2) / 360) * flame;
                    angle += 90;
                    flame = (Math.random() * 2 * this.speed - this.speed) / 6;
                    p.velocity.x += Math.cos((angle * Math.PI * 2) / 360) * flame;
                    p.velocity.y += Math.sin((angle * Math.PI * 2) / 360) * flame;
                    this.particles.push(p);
                }
            }
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].life >= this.particles[i].maxLife) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        };
        this.position.x = position.x;
        this.position.y = position.y;
        this.angle = angle;
    }
}
exports.FireFlameClient = FireFlameClient;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
class Camera {
    constructor(canvas, width, height, worldWidth = 1024, worldHeight = 1024) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.resize = (width, height) => {
            this.width = width;
            this.height = height;
            this.canvas.width = width;
            this.canvas.height = height;
        };
        this.updateWorldSize = (width, height) => {
            this.worldHeight = height;
            this.worldWidth = width;
        };
        this.isPositionNearEdge = (position) => {
            if (!(this.position.x + (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT > 0 && this.position.x + (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT < this.worldWidth - this.width)) {
                return true;
            }
            if (!(this.position.y + (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT > 0 && this.position.y + (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT < this.worldHeight - this.height)) {
                return true;
            }
            return false;
        };
        this.getScreenPosition = (position) => {
            let mouseXCorrection = (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT;
            let mouseYCorrection = (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT;
            let x = position.x - this.position.x;
            if (this.position.x + mouseXCorrection > 0 && this.position.x + mouseXCorrection < this.worldWidth - this.width)
                x = x - mouseXCorrection;
            else {
                if (this.position.x + mouseXCorrection <= 0)
                    x = position.x;
                if (this.position.x + mouseXCorrection >= this.worldWidth - this.width)
                    x = position.x - (this.worldWidth - this.width);
            }
            let y = position.y - this.position.y;
            if (this.position.y + mouseYCorrection > 0 && this.position.y + mouseYCorrection < this.worldHeight - this.height)
                y = y - mouseYCorrection;
            else {
                if (this.position.y + mouseYCorrection <= 0)
                    y = position.y;
                if (this.position.y + mouseYCorrection >= this.worldHeight - this.height)
                    y = position.y - (this.worldHeight - this.height);
            }
            return new GeometryAndPhysics_1.Point(x, y);
        };
        this.updatePosition = (position) => {
            this.position.x = position.x - this.width / 2;
            this.position.y = position.y - this.height / 2;
            if (this.position.x < 0)
                this.position.x = 0;
            if (this.position.y < 0)
                this.position.y = 0;
            if (this.position.x > this.worldWidth - this.width)
                this.position.x = this.worldWidth - this.width;
            if (this.position.y > this.worldHeight - this.height)
                this.position.y = this.worldHeight - this.height;
        };
        this.drawBar = (px, py, width, height, style) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                this.ctx.fillStyle = style;
                this.ctx.fillRect(position.x, position.y, width, height);
            }
        };
        this.drawSimpleImage = (img, px, py) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + 200 >= 0) && (position.y + 200 >= 0 && position.y <= this.height)) {
                this.ctx.drawImage(img, position.x, position.y);
            }
        };
        this.drawImage = (img, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height, startx = 0, starty = 0) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                if (aimAngle !== 0) {
                    this.ctx.save();
                    this.ctx.translate(position.x - width / 2, position.y - height / 2);
                    this.ctx.translate(width / 2, height / 2);
                    this.ctx.rotate(aimAngle * Math.PI / 180);
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, -width / 2, -height / 2, width, height);
                }
                else {
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);
                }
                if (aimAngle !== 0) {
                    this.ctx.restore();
                }
            }
        };
        this.drawImageFromTP = (img, startx, starty, imgWidth, imgHeight, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                if (aimAngle !== 0) {
                    this.ctx.save();
                    this.ctx.translate(position.x - width / 2, position.y - height / 2);
                    this.ctx.translate(width / 2, height / 2);
                    this.ctx.rotate(aimAngle * Math.PI / 180);
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, -width / 2, -height / 2, width, height);
                }
                else {
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);
                }
                if (aimAngle !== 0) {
                    this.ctx.restore();
                }
            }
        };
        this.ctx = canvas.getContext("2d");
    }
}
exports.Camera = Camera;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const Constants_1 = __webpack_require__(6);
const PlayerClient_1 = __webpack_require__(5);
const game_1 = __webpack_require__(2);
const enums_1 = __webpack_require__(1);
const WeaponTypes_1 = __webpack_require__(10);
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
                    if (WeaponTypes_1.WeaponTypes.list[WeaponTypes_1.WeaponTypes.getWeaponIdbyName(PlayerClient_1.PlayerClient.list[game_1.selfId].weapon)].reloadAmmo > 0) {
                        this.ctx.fillText(' x' + PlayerClient_1.PlayerClient.list[game_1.selfId].ammo + "  " + PlayerClient_1.PlayerClient.list[game_1.selfId].ammoInGun + "/" + WeaponTypes_1.WeaponTypes.list[WeaponTypes_1.WeaponTypes.getWeaponIdbyName(PlayerClient_1.PlayerClient.list[game_1.selfId].weapon)].reloadAmmo, 11 * (this.width - 0.8 * this.height) / 32 + 0.4 * this.height, (this.height) / 2 + 10);
                    }
                    else {
                        this.ctx.fillText(' x' + PlayerClient_1.PlayerClient.list[game_1.selfId].ammo, 11 * (this.width - 0.8 * this.height) / 32 + 0.4 * this.height, (this.height) / 2 + 10);
                    }
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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const canvas_1 = __webpack_require__(4);
class FireParticle {
    constructor(maxLife) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.size = 15;
        this.life = 0;
        this.maxLife = 10;
        this.draw = () => {
            ctx.fillStyle = "rgba(" + (260 - (this.life * 2)) + "," + ((this.life * 2) + 50) + "," + (this.life * 2) + "," + (((this.maxLife - this.life) / this.maxLife) * 0.4) + ")";
            ctx.beginPath();
            let pos = canvas_1.camera.getScreenPosition(this.position);
            ctx.arc(pos.x, pos.y, (this.maxLife - this.life) / this.maxLife * (this.size / 2) + (this.size / 2), 0, 2 * Math.PI);
            ctx.fill();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.life++;
        };
        this.maxLife = maxLife;
    }
}
exports.FireParticle = FireParticle;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = __webpack_require__(5);
const GeometryAndPhysics_1 = __webpack_require__(0);
const images_1 = __webpack_require__(3);
const SmokeParticle_1 = __webpack_require__(25);
const game_1 = __webpack_require__(2);
class SmokeClient {
    constructor(initPack) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.id = -1;
        this.radius = 10;
        this.maxRadius = 10;
        this.particles = [];
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        };
        this.update = () => {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
            }
        };
        this.updateRadius = () => {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].radius = this.radius;
            }
        };
        if (initPack.id)
            this.id = initPack.id;
        if (initPack.position)
            this.position = initPack.position;
        if (initPack.radius)
            this.radius = initPack.radius;
        if (initPack.maxRadius)
            this.maxRadius = initPack.maxRadius;
        if (initPack.map)
            this.map = initPack.map;
        if (initPack.time)
            this.time = initPack.time;
        for (var i = 0; i < 50; ++i) {
            let center = new GeometryAndPhysics_1.Point(this.position.x, this.position.y);
            this.particles[i] = new SmokeParticle_1.SmokeParticle(ctx, this.position, this.radius, this.maxRadius, center, this.time);
            let pos = GeometryAndPhysics_1.getRandomInCircle(this.position, this.radius);
            this.particles[i].position.x = pos.x;
            this.particles[i].position.y = pos.y;
            this.particles[i].velocity.updatePosition(Math.random() * 6 - 3, Math.random() * 6 - 3);
            this.particles[i].setImage(images_1.Img["smoke"]);
        }
        console.log("SMOKE");
        SmokeClient.list[this.id] = this;
    }
}
SmokeClient.list = {};
exports.SmokeClient = SmokeClient;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const canvas_1 = __webpack_require__(4);
class SmokeParticle {
    constructor(ctx, position, radius, maxRadius, center, time) {
        this.ctx = ctx;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.center = new GeometryAndPhysics_1.Point(0, 0);
        this.radius = 5;
        this.maxRadius = 5;
        this.maxLifeTime = 0;
        this.draw = () => {
            if (this.image) {
                this.ctx.globalAlpha = this.lifeTime / this.maxLifeTime;
                canvas_1.camera.drawSimpleImage(this.image, this.position.x, this.position.y);
                this.ctx.globalAlpha = 1.0;
                return;
            }
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
            this.ctx.fill();
            this.ctx.closePath();
        };
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            if (this.position.x >= this.center.x + this.radius) {
                this.velocity.x = -this.velocity.x;
                this.position.x = this.center.x + this.radius;
            }
            else if (this.position.x <= this.center.x - this.radius) {
                this.velocity.x = -this.velocity.x;
                this.position.x = this.center.x - this.radius;
            }
            if (this.position.y >= this.center.y + this.radius) {
                this.velocity.y = -this.velocity.y;
                this.position.y = this.center.y + this.radius;
            }
            else if (this.position.y <= this.center.y - this.radius) {
                this.velocity.y = -this.velocity.y;
                this.position.y = this.center.y - this.radius;
            }
            if (this.lifeTime > 0)
                this.lifeTime--;
        };
        this.setImage = (image) => {
            this.image = image;
        };
        let id = Math.random();
        this.position.x = position.x;
        this.position.y = position.y;
        this.center.x = center.x;
        this.center.y = center.y;
        this.radius = radius;
        this.maxRadius = maxRadius;
        SmokeParticle.list[id] = this;
        this.maxLifeTime = time;
        this.lifeTime = this.maxLifeTime;
    }
}
SmokeParticle.list = {};
exports.SmokeParticle = SmokeParticle;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = __webpack_require__(12);
const enums_1 = __webpack_require__(1);
const images_1 = __webpack_require__(3);
class Effects {
    constructor(ctx) {
        this.ctx = ctx;
        this.maxVelocity = 2;
        this.initSmoke = (particleCount) => {
            for (var i = 0; i < particleCount; ++i) {
                let particle = new Particle_1.Particle(this.ctx);
                particle.position.updatePosition(enums_1.getRandomInt(0, WIDTH), enums_1.getRandomInt(0, HEIGHT));
                particle.velocity.updatePosition(this.generateRandom(-this.maxVelocity, this.maxVelocity), this.generateRandom(-this.maxVelocity, this.maxVelocity));
                particle.setImage(images_1.Img["smoke"]);
            }
        };
        this.decreaseSmoke = (particleCount) => {
            let count = 0;
            for (let i in Particle_1.Particle.list) {
                if (count < particleCount) {
                    delete Particle_1.Particle.list[i];
                }
                else {
                    return;
                }
                count++;
            }
        };
        this.generateRandom = (min, max) => {
            return Math.random() * (max - min) + min;
        };
        this.draw = () => {
            for (let i in Particle_1.Particle.list) {
                Particle_1.Particle.list[i].draw();
            }
        };
        this.update = () => {
            for (let i in Particle_1.Particle.list) {
                Particle_1.Particle.list[i].update();
                if (Particle_1.Particle.list[i].lifeTime <= 0) {
                    delete Particle_1.Particle.list[i];
                }
            }
        };
    }
}
exports.Effects = Effects;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class Filters {
    constructor(ctx) {
        this.ctx = ctx;
        this.bAdjustment = -50;
        this.getImageFromCanvas = () => {
            this.imageData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
            this.data = this.imageData.data;
        };
        this.invert = () => {
            for (var i = 0; i < this.data.length; i += 4) {
                this.data[i] = 255 - this.data[i];
                this.data[i + 1] = 255 - this.data[i + 1];
                this.data[i + 2] = 255 - this.data[i + 2];
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
        this.bright = () => {
            for (var i = 0; i < this.data.length; i += 4) {
                this.data[i] += this.bAdjustment;
                this.data[i + 1] += this.bAdjustment;
                this.data[i + 2] += this.bAdjustment;
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
        this.blur = () => {
            let r, g, b, a;
            for (var i = 0; i < this.data.length; i += 4) {
                r = 0;
                g = 0;
                b = 0;
                for (var j = -1; j < 2; j++) {
                    for (var k = -1; k < 2; k++) {
                        if ((i + j + k * WIDTH * 4) > 0 && (i + j + k * WIDTH * 4) < this.data.length) {
                            r += this.data[i + j + k * WIDTH * 4] / 9;
                            g += this.data[i + j + k * WIDTH * 4] / 9;
                            b += this.data[i + j + k * WIDTH * 4] / 9;
                        }
                    }
                }
                this.data[i] = r;
                this.data[i + 1] = g;
                this.data[i + 2] = b;
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
    }
}
exports.Filters = Filters;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
class SpawnObjectMapChecker {
    constructor(mapTiles, desiredTerrain, size) {
        this.search = (start, maxIterations = 20) => {
            let p = new GeometryAndPhysics_1.Point(start.x, start.y);
            let iterations = 0;
            let dPosition;
            while (!this.loadCheckerArray(p)) {
                if (iterations >= maxIterations) {
                    p.updatePosition(-1, -1);
                    break;
                }
                dPosition = this.moveCheckerArray();
                p.x += dPosition.x;
                p.y += dPosition.y;
                iterations++;
            }
            console.log("ITERATIONS " + iterations);
            return p;
        };
        this.loadCheckerArray = (p) => {
            let end = true;
            for (let i = 0; i < this.checkerArray.length; i++) {
                for (let j = 0; j < this.checkerArray[0].length; j++) {
                    if (this.pointInMap(p.x + j, p.y + i)) {
                        this.checkerArray[i][j] = this.map[p.y + i][p.x + j].material;
                        if (this.checkerArray[i][j] !== this.desiredTerrain) {
                            end = false;
                        }
                    }
                    else {
                        this.checkerArray[i][j] = -1;
                        end = false;
                    }
                }
            }
            return end;
        };
        this.pointInMap = (x, y) => {
            if (x >= 0 && x < this.map[0].length && y >= 0 && y < this.map.length) {
                return true;
            }
            else {
                return false;
            }
        };
        this.moveCheckerArray = () => {
            let leftOrUp = 0;
            let rightOrDown = 0;
            let deltaPosition = new GeometryAndPhysics_1.Point(0, 0);
            for (let i = 0; i < this.checkerArray.length; i++) {
                if (this.checkerArray[i][this.size.x - 1] == this.desiredTerrain) {
                    rightOrDown++;
                }
                if (this.checkerArray[i][0] == this.desiredTerrain) {
                    leftOrUp++;
                }
                if (rightOrDown > leftOrUp) {
                    deltaPosition.x = 1;
                }
                else if (leftOrUp > rightOrDown) {
                    deltaPosition.x = -1;
                }
                else {
                    if (this.checkerArray[0][this.size.x - 1] == -1) {
                        deltaPosition.x = -1;
                    }
                    else if (this.checkerArray[0][0] == -1) {
                        deltaPosition.x = 1;
                    }
                }
            }
            leftOrUp = 0;
            rightOrDown = 0;
            for (let j = 0; j < this.checkerArray[0].length; j++) {
                if (this.checkerArray[this.size.y - 1][j] == this.desiredTerrain) {
                    rightOrDown++;
                }
                if (this.checkerArray[0][j] == this.desiredTerrain) {
                    leftOrUp++;
                }
                if (rightOrDown > leftOrUp) {
                    deltaPosition.y = 1;
                }
                else if (leftOrUp > rightOrDown) {
                    deltaPosition.y = -1;
                }
                else {
                    if (this.checkerArray[this.size.y - 1][0] == -1) {
                        deltaPosition.y = -1;
                    }
                    else if (this.checkerArray[0][0] == -1) {
                        deltaPosition.y = 1;
                    }
                }
            }
            return deltaPosition;
        };
        this.desiredTerrain = desiredTerrain;
        this.checkerArray = [];
        this.size = size;
        for (let i = 0; i < size.y; i++) {
            this.checkerArray[i] = [];
            for (let j = 0; j < size.x; j++) {
                this.checkerArray[i][j] = -1;
            }
        }
        this.map = mapTiles;
    }
}
exports.SpawnObjectMapChecker = SpawnObjectMapChecker;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const MapObject_1 = __webpack_require__(30);
const GeometryAndPhysics_1 = __webpack_require__(0);
const enums_1 = __webpack_require__(1);
class GroundRing extends MapObject_1.MapObject {
    constructor(width, height, enterOrientation) {
        super();
        this.corners = [];
        this.sidesU = [];
        this.sidesD = [];
        this.sidesL = [];
        this.sidesR = [];
        this.isColliding = (mapTiles, position) => {
            for (let i = 0; i < (this.sidesU.length + 2); i++) {
                if (mapTiles[position.y][position.x + i].collisions || mapTiles[position.y + this.sidesR.length + 1][position.x + i].collisions) {
                    return true;
                }
            }
            for (let i = 0; i < (this.sidesR.length + 2); i++) {
                if (mapTiles[position.y + i][position.x].collisions || mapTiles[position.y + i][position.x + this.sidesD.length + 1].collisions) {
                    return true;
                }
            }
            return false;
        };
        if (width > 2 && height > 2) {
            this.corners[enums_1.CornerOrientation.LU] = new GeometryAndPhysics_1.Point(0, 0);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.LU], enums_1.MapObjectType.GR_LU);
            this.corners[enums_1.CornerOrientation.LD] = new GeometryAndPhysics_1.Point(0, height - 1);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.LD], enums_1.MapObjectType.GR_LD);
            this.corners[enums_1.CornerOrientation.RU] = new GeometryAndPhysics_1.Point(width - 1, 0);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.RU], enums_1.MapObjectType.GR_RU);
            this.corners[enums_1.CornerOrientation.RD] = new GeometryAndPhysics_1.Point(width - 1, height - 1);
            this.addObjectTile(this.corners[enums_1.CornerOrientation.RD], enums_1.MapObjectType.GR_RD);
            for (let i = 0, length = width - 2; i < length; i++) {
                this.sidesU[i] = new GeometryAndPhysics_1.Point(1 + i, 0);
                this.addObjectTile(this.sidesU[i], enums_1.MapObjectType.GR_U);
                this.sidesD[i] = new GeometryAndPhysics_1.Point(1 + i, height - 1);
                this.addObjectTile(this.sidesD[i], enums_1.MapObjectType.GR_D);
            }
            for (let i = 0, length = height - 2; i < length; i++) {
                this.sidesL[i] = new GeometryAndPhysics_1.Point(0, 1 + i);
                this.addObjectTile(this.sidesL[i], enums_1.MapObjectType.GR_L);
                this.sidesR[i] = new GeometryAndPhysics_1.Point(width - 1, 1 + i);
                this.addObjectTile(this.sidesR[i], enums_1.MapObjectType.GR_R);
            }
            this.enterOrientation = enterOrientation;
            let x = enums_1.getRandomInt(1, width - 2);
            let y = enums_1.getRandomInt(1, height - 2);
            if (enterOrientation == enums_1.Orientation.down) {
                y = height - 1;
            }
            else if (enterOrientation == enums_1.Orientation.up) {
                y = 0;
            }
            if (enterOrientation == enums_1.Orientation.left) {
                x = 0;
            }
            else if (enterOrientation == enums_1.Orientation.right) {
                x = width - 1;
            }
            this.enter = new GeometryAndPhysics_1.Point(x, y);
            if (enterOrientation == enums_1.Orientation.down) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_ED);
            }
            else if (enterOrientation == enums_1.Orientation.up) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_EU);
            }
            else if (enterOrientation == enums_1.Orientation.right) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_ER);
            }
            else if (enterOrientation == enums_1.Orientation.left) {
                this.addObjectTile(this.enter, enums_1.MapObjectType.GR_EL);
            }
        }
    }
}
exports.GroundRing = GroundRing;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const ObjectTile_1 = __webpack_require__(31);
class MapObject {
    constructor() {
        this.objectTiles = [];
        this.addObjectTile = (position, type) => {
            this.objectTiles.push(new ObjectTile_1.ObjectTile(position, type));
        };
    }
}
exports.MapObject = MapObject;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(6);
class ObjectTile {
    constructor(position, type) {
        this.position = position;
        this.type = type;
        this.collisions = [];
        for (let i = 0; i < Constants_1.TILE_SIZE; i++) {
            this.collisions[i] = [];
            for (let j = 0; j < Constants_1.TILE_SIZE; j++) {
                this.collisions[i][j] = 0;
            }
        }
    }
}
exports.ObjectTile = ObjectTile;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const Constants_1 = __webpack_require__(6);
class GameMap {
    constructor(_name, mapTiles) {
        this._name = _name;
        this._width = 1280;
        this._height = 1280;
        this._size = 1;
        this.isPositionWall = (position) => {
            if (position.x < 0 || position.x >= this.width)
                return 1;
            if (position.y < 0 || position.y >= this.height)
                return 1;
            let tileX = Math.floor(position.x / (Constants_1.TILE_SIZE * 32));
            let tileY = Math.floor(position.y / (Constants_1.TILE_SIZE * 32));
            let inTileX = position.x - tileX * Constants_1.TILE_SIZE * 32;
            let inTileY = position.y - tileY * Constants_1.TILE_SIZE * 32;
            if (tileX < this._size && tileY < this._size)
                return this.mapTiles[tileY][tileX].isPositionWall(new GeometryAndPhysics_1.Point(inTileX, inTileY));
            else {
                return 0;
            }
        };
        this.mapTiles = [];
        this._size = mapTiles.length;
        for (let i = 0; i < mapTiles.length; i++) {
            this.mapTiles[i] = mapTiles[i].slice();
            for (let j = 0; j < mapTiles[i].length; j++) {
                this.mapTiles[i][j] = mapTiles[i][j];
            }
        }
        this._height = Constants_1.TILE_SIZE * 32 * this._size;
        this._width = Constants_1.TILE_SIZE * 32 * this._size;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get size() { return this._size; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(6);
const enums_1 = __webpack_require__(1);
class MapTile {
    constructor(_width, _height, material) {
        this._width = _width;
        this._height = _height;
        this.sides = [];
        this.corners = [];
        this.objects = [];
        this.convex = true;
        this.collisions = false;
        this.updateMaterial = (material) => {
            this._material = material;
        };
        this.isPositionWall = (position) => {
            let areaX = Math.floor(position.x / 32);
            let areaY = Math.floor(position.y / 32);
            if (areaX < this._width && areaY < this._height) {
                return this.grid[areaY][areaX];
            }
            else {
                return 0;
            }
        };
        this.addObject = (type, collisions) => {
            this.objects.push(type);
            if (collisions == true) {
                this.updateCollisions(type);
            }
        };
        this.updateCollisions = (type) => {
            let gridUpdate = Constants_1.mapObjectCollisions[type];
            console.log("COLLISIONS: " + Constants_1.mapObjectCollisions[type]);
            this.collisions = false;
            for (let i = 0; i < this._height; i++) {
                for (let j = 0; j < this._width; j++) {
                    this.grid[i][j] = gridUpdate[i * Constants_1.TILE_SIZE + j];
                    if (this.grid[i][j] > 0) {
                        this.collisions = true;
                    }
                }
            }
        };
        this._material = material;
        this.grid = [];
        for (let i = 0; i < this._height; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this._width; j++) {
                this.grid[i][j] = (material != enums_1.TerrainMaterial.water) ? 0 : 2;
                if (this.grid[i][j] > 0) {
                    this.collisions = true;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            this.sides[i] = 0;
            this.corners[i] = 0;
        }
        this.objects.push(0);
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}
exports.MapTile = MapTile;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class GameSoundManager {
    constructor() {
        this.loadSounds = () => {
            soundManager.onload = function () {
                soundManager.createSound('gunshot', '/client/mp3/gunshot.mp3');
                soundManager.createSound('pistol_fire', '/client/mp3/pistol_fire.mp3');
                soundManager.createSound('shotgun_fire', '/client/mp3/shotgun_fire.mp3');
                soundManager.createSound('rifle_fire', '/client/mp3/rifle_fire.mp3');
                soundManager.createSound('knife_swing', '/client/mp3/knife_swing.mp3');
                soundManager.createSound('gun_swing', '/client/mp3/gun_swing.mp3');
                soundManager.createSound('squishy1', '/client/mp3/squishy1.mp3');
                soundManager.createSound('squishy2', '/client/mp3/squishy2.mp3');
                soundManager.createSound('pain', '/client/mp3/pain.mp3');
                soundManager.createSound('death1', '/client/mp3/death.mp3');
                soundManager.createSound('shotgunreload', '/client/mp3/shotgunreload.mp3');
                soundManager.createSound('pistolreload', '/client/mp3/pistolreload.mp3');
                soundManager.createSound('riflereload', '/client/mp3/riflereload.mp3');
            };
        };
        this.playWeaponReload = (weapon) => {
            soundManager.play(weapon + "reload");
        };
        this.playWeaponAttack = (weapon, melee) => {
            if (melee) {
                (weapon == "knife" || weapon == "claws") ? soundManager.play("knife_swing") : soundManager.play("gun_swing");
            }
            else {
                soundManager.play(weapon + "_fire");
            }
        };
        this.playHit = (category) => {
            if (category == "player")
                soundManager.play("pain");
            if (category == "enemy") {
                (Math.random() < 0.5) ? soundManager.play("squishy1") : soundManager.play("squishy2");
            }
        };
        this.playDeath = (kind) => {
            console.log("KILLED " + kind);
            if (kind == "zombie")
                soundManager.play("death1");
        };
        this.loadSounds();
    }
}
exports.GameSoundManager = GameSoundManager;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const GeometryAndPhysics_1 = __webpack_require__(0);
const PlayerClient_1 = __webpack_require__(5);
const game_1 = __webpack_require__(2);
const canvas_1 = __webpack_require__(4);
class UpgradeClient {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.id = -1;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let frame = images_1.jsonIAE["frames"][this.img + ".png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height, frame["x"], frame["y"]);
        };
        this.id = param.id ? param.id : this.id;
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? param.img : this.img;
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind;
        UpgradeClient.list[this.id] = this;
    }
}
UpgradeClient.list = {};
exports.UpgradeClient = UpgradeClient;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const Constants_1 = __webpack_require__(6);
const PlayerClient_1 = __webpack_require__(5);
const game_1 = __webpack_require__(2);
const enums_1 = __webpack_require__(1);
const Constants_2 = __webpack_require__(6);
const canvas_1 = __webpack_require__(4);
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
                game_1.canvasFilters.bright(-50);
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


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __webpack_require__(3);
const game_1 = __webpack_require__(2);
const EnemyClient_1 = __webpack_require__(13);
const GeometryAndPhysics_1 = __webpack_require__(0);
const game_2 = __webpack_require__(2);
const PlayerClient_1 = __webpack_require__(5);
const ExplosionClient_1 = __webpack_require__(14);
const canvas_1 = __webpack_require__(4);
class BulletClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.map = "forest";
        this.img = images_1.Img["bullet"];
        this.width = 32;
        this.height = 32;
        this.hitCategory = 1;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_2.selfId].map !== this.map) {
                return;
            }
            let frame = images_1.jsonIAE["frames"][this.img + ".png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x, this.position.y, this.width, this.height, frame["x"], frame["y"]);
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


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
class Item {
    constructor(id, name, event, add, remove, info) {
        this.id = id;
        this.name = name;
        this.event = event;
        this.add = add;
        this.remove = remove;
        this.info = info;
        Item.list[this.id] = this;
    }
}
Item.list = {};
exports.Item = Item;
new Item(enums_1.ItemType.medicalkit, "Medical Kit", function (player) {
    player.lifeAndBodyController.heal(10);
    player.inventory.removeItem(enums_1.ItemType.medicalkit, 1);
}, function (actor, amount) { }, function (actor, amount) { }, function (actor) {
    return "";
});
new Item(enums_1.WeaponType.pistol, "Pistol", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.pistol);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.flamethrower, "Flamethrower", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.flamethrower);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.flamethrower, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.flamethrower, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.knife, "Knife", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.knife);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.knife, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.knife, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.shotgun, "Shotgun", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.shotgun);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.rifle, "Rifle", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.rifle);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.claws, "Claws", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.claws);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.claws, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.claws, amount);
}, function (actor) {
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
const GeometryAndPhysics_1 = __webpack_require__(0);
const Particle_1 = __webpack_require__(40);
class Flame {
    constructor(param) {
        this.id = Math.random();
        this.particles = {};
        this.angle = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.speed = 3;
        this.offset = 0;
        this.parent = null;
        this.life = 60;
        this.update = (create) => {
            if (create) {
                let angleInRad = 0;
                let posWithOffset = new GeometryAndPhysics_1.Point(0, 0);
                for (let i = 0; i < 5; i++) {
                    if (this.parent !== undefined) {
                        angleInRad = ((this.parent.movementController.aimAngle + 180) * Math.PI) / 180;
                        posWithOffset.x = this.parent.position.x - Math.cos(angleInRad) * this.offset;
                        posWithOffset.y = this.parent.position.y - Math.sin(angleInRad) * this.offset;
                    }
                    else {
                        angleInRad = (this.angle * Math.PI) / 180;
                        posWithOffset.x = this.position.x - Math.cos(angleInRad) * this.offset;
                        posWithOffset.y = this.position.y - Math.sin(angleInRad) * this.offset;
                    }
                    let flame = (0 - Math.random() * 2 * this.speed);
                    let velocity = new GeometryAndPhysics_1.Point(0, 0);
                    velocity.x = Math.cos(angleInRad) * flame;
                    velocity.y = Math.sin(angleInRad) * flame;
                    angleInRad += Math.PI / 2;
                    flame = (Math.random() * 2 * this.speed - this.speed) / 6;
                    velocity.x += Math.cos(angleInRad) * flame;
                    velocity.y += Math.sin(angleInRad) * flame;
                    let p = new Particle_1.Particle({ position: posWithOffset, velocity: velocity, maxLife: this.life, type: enums_1.ParticleType.fire, map: this.map });
                    this.particles[p.id] = p;
                }
            }
        };
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        this.parent = (param.parent !== undefined) ? param.parent : null;
        this.angle = (param.angle !== undefined) ? param.angle : 0;
        this.offset = (param.offset !== undefined) ? param.offset : 0;
        this.life = (param.life !== undefined) ? param.life : 60;
        this.map = (param.map !== undefined) ? param.map : 0;
        Flame.list[this.id] = this;
    }
}
Flame.list = {};
exports.Flame = Flame;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = __webpack_require__(8);
const enums_1 = __webpack_require__(1);
const GeometryAndPhysics_1 = __webpack_require__(0);
const Enemy_1 = __webpack_require__(9);
class Particle {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.size = 10;
        this.life = 0;
        this.maxLife = 10;
        this.toRemove = false;
        this.id = Math.random();
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.life++;
            if (this.life >= this.maxLife)
                this.toRemove = true;
            if (this.type == enums_1.ParticleType.fire) {
                for (let key in Enemy_1.Enemy.list) {
                    let enemy = Enemy_1.Enemy.list[key];
                    if (this.testCollision(enemy)) {
                        enemy.lifeAndBodyController.wasHit(0.03 * this.life / this.maxLife);
                    }
                }
            }
        };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this.position.x - (this.size / 4), this.position.y - (this.size / 4));
            let pos2 = new GeometryAndPhysics_1.Point(entity.position.x - (entity.width / 4), entity.position.y - (entity.height / 4));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this.size / 2, this.size / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity.width / 2, entity.height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                map: this.map,
                size: this.size,
                type: this.type,
                maxLife: this.maxLife
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                life: this.life
            };
        };
        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.type = (param.type !== undefined) ? param.type : enums_1.ParticleType.fire;
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        if (param.velocity !== undefined) {
            this.velocity.x = param.velocity.x;
            this.velocity.y = param.velocity.y;
        }
        this.map = (param.map !== undefined) ? param.map : 0;
        globalVariables_1.initPack.particle.push(this.getInitPack());
        Particle.list[this.id] = this;
    }
}
Particle.update = () => {
    let pack = [];
    for (let i in Particle.list) {
        let particle = Particle.list[i];
        particle.update();
        if (particle.toRemove) {
            delete Particle.list[i];
            globalVariables_1.removePack.particle.push({ id: particle.id });
        }
        else {
            pack.push(particle.getUpdatePack());
        }
    }
    return pack;
};
Particle.list = {};
exports.Particle = Particle;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var initPack = { player: [], bullet: [], enemy: [], upgrade: [] };
class Pack {
    constructor() {
        this.player = [];
        this.bullet = [];
        this.enemy = [];
        this.upgrade = [];
        this.smoke = [];
        this.particle = [];
    }
}
exports.Pack = Pack;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = __webpack_require__(7);
const Counter_1 = __webpack_require__(17);
const GeometryAndPhysics_1 = __webpack_require__(0);
class MovementController {
    constructor(parent, param) {
        this.parent = parent;
        this._pressingDown = false;
        this._pressingUp = false;
        this._pressingLeft = false;
        this._pressingRight = false;
        this._moving = false;
        this._recoilCounter = new Counter_1.Counter(15);
        this.collisionBounds = { Up: -16, Down: 32, Left: -10, Right: 10 };
        this.updateSpd = () => {
            let map = MapControler_1.MapController.getMap(this.parent.map);
            let x = this.parent.position.x;
            let y = this.parent.position.y;
            let leftBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Left, y);
            let rightBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Right, y);
            let upBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Up);
            let downBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Down);
            let speedX = 0;
            let speedY = 0;
            if (map.isPositionWall(rightBumper) >= 2) {
                speedX = !this._pressingRight ? -this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingRight ? this._maxSpdX : speedX;
            }
            if (map.isPositionWall(leftBumper) >= 2) {
                speedX = !this._pressingLeft ? this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingLeft ? -this._maxSpdX : speedX;
            }
            if (map.isPositionWall(downBumper) >= 2) {
                speedY = !this._pressingDown ? -this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingDown ? this._maxSpdY : speedY;
            }
            if (map.isPositionWall(upBumper) >= 2) {
                speedY = !this._pressingUp ? this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingUp ? -this._maxSpdY : speedY;
            }
            if (this._recoilCounter.isActive() && !this._recoilCounter.resetIfMax()) {
                console.log("RECOIL");
                this._recoilCounter.count();
                if (map.isPositionWall(downBumper) || map.isPositionWall(upBumper) || map.isPositionWall(leftBumper) || map.isPositionWall(rightBumper)) {
                    this._recoilCounter.deactivate();
                    this._recoilCounter.reset();
                }
                else {
                    speedX = Math.cos((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                    speedY = Math.sin((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                }
            }
            else {
                this._recoilCounter.deactivate();
            }
            if (map.isPositionWall(this.parent.position) == 1) {
                speedX = speedX / 2;
                speedY = speedY / 2;
            }
            this.parent.setSpdX(speedX);
            this.parent.setSpdY(speedY);
            this.validatePosition();
        };
        this.validatePosition = () => {
            let map = MapControler_1.MapController.getMap(this.parent.map);
            this.parent.position.x = (this.parent.position.x < this.parent.width / 2) ? this.parent.width / 2 : this.parent.position.x;
            this.parent.position.x = (this.parent.position.x > map.width - this.parent.width / 2) ? map.width - this.parent.width / 2 : this.parent.position.x;
            this.parent.position.y = (this.parent.position.y < this.parent.height / 2) ? this.parent.height / 2 : this.parent.position.y;
            this.parent.position.y = (this.parent.position.y > map.height - this.parent.height / 2) ? map.height - this.parent.height / 2 : this.parent.position.y;
        };
        this._maxSpdX = (param.maxSpdX !== undefined) ? param.maxSpdX : 10;
        this._maxSpdY = (param.maxSpdY !== undefined) ? param.maxSpdY : 10;
    }
    get pressingLeft() { return this._pressingLeft; }
    get pressingRight() { return this._pressingRight; }
    get pressingUp() { return this._pressingUp; }
    get pressingDown() { return this._pressingDown; }
    set pressingLeft(value) { this._pressingLeft = value; }
    set pressingRight(value) { this._pressingRight = value; }
    set pressingUp(value) { this._pressingUp = value; }
    set pressingDown(value) { this._pressingDown = value; }
    get aimAngle() { return this._aimAngle; }
    get moving() {
        if (this._pressingLeft || this._pressingRight || this._pressingDown || this.pressingUp) {
            this._moving = true;
        }
        else {
            this._moving = false;
        }
        return this._moving;
    }
    get recoilCounter() { return this._recoilCounter; }
    get maxSpdX() { return this._maxSpdX; }
    get maxSpdY() { return this._maxSpdY; }
    set aimAngle(value) { this._aimAngle = value; }
}
exports.MovementController = MovementController;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Bullet_1 = __webpack_require__(18);
const WeaponCollection_1 = __webpack_require__(44);
const Counter_1 = __webpack_require__(17);
const WeaponTypes_1 = __webpack_require__(10);
const GeometryAndPhysics_1 = __webpack_require__(0);
class AttackController {
    constructor(parent, param) {
        this.parent = parent;
        this._melee = true;
        this._attackStarted = false;
        this._reloadCounter = new Counter_1.Counter(50);
        this._attackCounter = new Counter_1.Counter(25);
        this._pressingAttack = false;
        this.update = () => {
            this._reloadCounter.setInc(this._activeWeapon.reloadSpd);
            this._attackCounter.setInc(this._activeWeapon.attackSpd);
            if (this._reloadCounter.resetIfMax()) {
                this._reloadCounter.deactivate();
                this._activeWeapon.reload();
            }
            this._reloadCounter.count();
            this._attackCounter.count();
            this.performAttack();
        };
        this.performAttack = () => {
            if (!this._reloadCounter.isActive() && this._pressingAttack) {
                if (this._attackCounter.resetIfMax()) {
                    this._attackStarted = true;
                    this._melee = (this._activeWeapon._ammoInGun > 0) ? WeaponTypes_1.WeaponTypes.getWeaponParameters(this._activeWeapon.weapon).attackMelee : true;
                    this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();
                }
            }
        };
        this.closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);
        this.attackCloseByEnemy = (aimAngle) => {
            let player = this.parent.getClosestPlayer(10000, 360);
            let distance = 80;
            if (player) {
                let maxDistance = Math.sqrt(player.width * player.width / 4 + player.height * player.height / 4) + distance;
                if (this.parent.getDistance(player) < maxDistance) {
                    player.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
                }
            }
        };
        this.attackCloseByPlayer = (aimAngle) => {
            let enemy = this.parent.getClosestPlayerorEnemy(20, 45);
            if (enemy) {
                enemy.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
            }
        };
        this.distanceAttack = () => {
            if (this._activeWeapon.shoot(1)) {
                let shootSpeed = this._activeWeapon.shootSpeed;
                let aimAngle = this.parent.movementController.aimAngle;
                let attackRadius = this._activeWeapon.attackRadius;
                this.shootBullet(this.parent.movementController.aimAngle, shootSpeed);
                for (let i = 0; i < attackRadius; i++) {
                    this.shootBullet(aimAngle + (i + 1) * 2, shootSpeed);
                    this.shootBullet(aimAngle - (i + 1) * 2, shootSpeed);
                }
            }
        };
        this.equip = (weapon) => {
            this.activeWeapon.equip(weapon);
            let weaponProperties = WeaponTypes_1.WeaponTypes.list[weapon];
            this._melee = weaponProperties.attackMelee;
            console.log("BRON: " + weaponProperties.name + " " + "melee:" + weaponProperties.attackMelee);
        };
        this.shootBullet = (aimAngle, shootSpeed) => {
            new Bullet_1.Bullet({
                parent: this.parent.id,
                combatType: this.parent.type,
                angle: aimAngle,
                position: new GeometryAndPhysics_1.Point(this.parent.position.x, this.parent.position.y),
                map: this.parent.map,
                img: 'bullet',
                width: 8,
                height: 8,
                shootspeed: shootSpeed
            });
        };
        this.getDamage = () => {
            let damage = 0;
            damage = (this._melee) ? this._activeWeapon.meleeDmg : this._activeWeapon.shootDmg;
            return damage;
        };
        this._weaponCollection = new WeaponCollection_1.WeaponCollection(this.parent);
        this._activeWeapon = new WeaponCollection_1.SingleWeapon(this.parent, { weapon: "0", ammo: "20", parent: this.parent });
        if (param.atkSpd)
            this._attackCounter.setInc(param.atkSpd);
        this.attackCounter.activate();
    }
    get melee() { return this._melee; }
    get pressingAttack() { return this._pressingAttack; }
    get weaponCollection() { return this._weaponCollection; }
    get activeWeapon() { return this._activeWeapon; }
    get reloadCounter() { return this._reloadCounter; }
    get attackCounter() { return this._attackCounter; }
    get attackStarted() { return this._attackStarted; }
    set pressingAttack(value) { this._pressingAttack = value; }
    set attackStarted(value) { this._attackStarted = value; }
}
exports.AttackController = AttackController;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const WeaponTypes_1 = __webpack_require__(10);
const enums_1 = __webpack_require__(1);
class WeaponCollection {
    constructor(owner) {
        this.weapons = [];
        this.shoot = (id, bullets) => {
            return true;
        };
        this.chooseNextWeaponWithAmmo = () => {
            if (!this.owner.attackController.reloadCounter.isActive()) {
                let inc = 1;
                for (let i = 0; i < this.weapons.length; i++) {
                    if (this.weapons[i].id === this.owner.attackController.activeWeapon.weapon) {
                        while (i + inc < this.weapons.length) {
                            if (this.weapons[i + inc].ammoInGun > 0) {
                                this.owner.attackController.equip(this.weapons[i + inc].id);
                                return;
                            }
                            else {
                                inc++;
                            }
                        }
                        inc = 0;
                        while (inc < i) {
                            if (this.weapons[inc].ammoInGun > 0) {
                                this.owner.attackController.equip(this.weapons[inc].id);
                                return;
                            }
                            else {
                                inc++;
                            }
                        }
                        return;
                    }
                }
            }
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
        this.setWeaponAmmo = (id, ammo) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammo = ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammoInGun = this.weapons[i].ammo;
                    }
                    if (this.owner.attackController.activeWeapon.weapon == id) {
                        if (this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0) {
                            this.owner.attackController.reloadCounter.activate();
                        }
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        };
        this.addWeaponAmmo = (id, ammo) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammo = this.weapons[i].ammo + ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammoInGun = this.weapons[i].ammo;
                    }
                    if (this.owner.attackController.activeWeapon.weapon == id) {
                        if (this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0) {
                            this.owner.attackController.reloadCounter.activate();
                        }
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        };
        this.decAmmo = (id, amount) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammoInGun = (this.weapons[i].ammoInGun > amount) ? this.weapons[i].ammoInGun - amount : 0;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(id);
                    if (weaponProperties.reloadSpd == -1) {
                        this.weapons[i].ammo = this.weapons[i].ammoInGun;
                    }
                }
            }
        };
        this.reload = (id) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].ammoInGun = (this.weapons[i].ammo > WeaponTypes_1.WeaponTypes.list[id].reloadAmmo) ? WeaponTypes_1.WeaponTypes.list[id].reloadAmmo : this.weapons[i].ammo;
                    this.weapons[i].ammo = this.weapons[i].ammo - this.weapons[i].ammoInGun;
                }
            }
        };
        this.removeWeapon = (id, amount) => {
        };
        this.hasWeapon = (id, amount) => {
            for (var i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    return this.weapons[i].amount >= amount;
                }
            }
            return false;
        };
        this.changeWeapon = (id) => {
            if (this.hasWeapon(id, 1) && !this.owner.attackController.reloadCounter.isActive()) {
                this.owner.attackController.equip(id);
            }
        };
        this.addWeapon = (id, amount) => {
            for (let i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({ id: id, amount: amount, ammo: 10, ammoInGun: WeaponTypes_1.WeaponTypes.list[id].reloadAmmo });
        };
        this.owner = owner;
    }
}
exports.WeaponCollection = WeaponCollection;
class SingleWeapon {
    constructor(parent, param) {
        this.parent = parent;
        this._ammoInGun = 30;
        this.name = "";
        this.reload = () => {
            this.parent.attackController.weaponCollection.reload(this._weapon);
            this._ammoInGun = (this._ammo > WeaponTypes_1.WeaponTypes.list[this._weapon].reloadAmmo) ? WeaponTypes_1.WeaponTypes.list[this._weapon].reloadAmmo : this._ammo;
            this._ammo = this._ammo - this._ammoInGun;
        };
        this.decAmmo = (amount) => {
            this._ammoInGun = (this._ammoInGun - amount >= 0) ? this._ammoInGun - amount : 0;
            this.parent.attackController.weaponCollection.decAmmo(this._weapon, amount);
            let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this._weapon);
            if (weaponProperties.reloadSpd == -1) {
                this._ammo = this._ammoInGun;
            }
        };
        this.updateAmmo = () => {
            let weaponCollection = this.parent.attackController.weaponCollection;
            for (let i = 0; i < weaponCollection.weapons.length; i++) {
                if (weaponCollection.weapons[i].id === this.weapon) {
                    this._ammo = weaponCollection.weapons[i].ammo;
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this.weapon);
                    if (weaponProperties.reloadSpd == -1) {
                        this._ammoInGun = this._ammo;
                    }
                }
            }
        };
        this.shoot = (bullets) => {
            if (bullets <= this._ammoInGun) {
                if (this._ammoInGun - bullets >= 0) {
                    this.decAmmo(bullets);
                }
                else {
                    this.parent.attackController.reloadCounter.activate();
                    return false;
                }
                if (this._ammoInGun == 0) {
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(this.weapon);
                    if (weaponProperties.reloadSpd > 0) {
                        this.parent.attackController.reloadCounter.activate();
                    }
                }
                if (WeaponTypes_1.WeaponTypes.list[this.weapon].recoil)
                    this.parent.movementController.recoilCounter.activate();
                return true;
            }
            return false;
        };
        this.equip = (weapon) => {
            let weaponCollection = this.parent.attackController.weaponCollection;
            for (let i = 0; i < weaponCollection.weapons.length; i++) {
                if (weaponCollection.weapons[i].id === weapon) {
                    let weaponProperties = WeaponTypes_1.WeaponTypes.getWeaponParameters(weapon);
                    this._weapon = weapon;
                    this.name = weaponProperties.name;
                    this._ammo = weaponCollection.weapons[i].ammo;
                    this._ammoInGun = weaponCollection.weapons[i].ammoInGun;
                }
            }
        };
        if (param.weapon !== undefined) {
            this._weapon = param.weapon;
            let weaponParameters = WeaponTypes_1.WeaponTypes.getWeaponParameters(this._weapon);
            this._ammoInGun = weaponParameters.reloadAmmo;
        }
        else {
            this._weapon = enums_1.WeaponType.knife;
        }
        this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
        this.name = (param.name !== undefined) ? param.name : "knife";
    }
    get ammo() { return this._ammo; }
    get weapon() { return this._weapon; }
    get ammoInGun() { return this._ammoInGun; }
    get reloadSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].reloadSpd; }
    get attackSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackSpd; }
    get attackRadius() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackRadius; }
    get shootSpeed() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootSpeed; }
    get meleeDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].meleeDmg; }
    get shootDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootDmg; }
}
exports.SingleWeapon = SingleWeapon;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class LifeAndBodyController {
    constructor(parent, param) {
        this.parent = parent;
        this._hp = 30;
        this._hpMax = 30;
        this.heal = (hp) => {
            this._hp = (this._hp + hp > this._hpMax) ? (this._hpMax) : (this._hp + hp);
        };
        this.wasHit = (damage) => {
            this._hp = this._hp - damage;
            this._hp = (this._hp >= 0) ? this._hp : 0;
            if (this._hp == 0) {
                this.parent.onDeath();
            }
        };
        this.reset = () => {
            this._hp = this._hpMax;
        };
        this._hp = (param.hp) ? param.hp : this._hp;
        this._hpMax = this._hp;
    }
    get hp() { return this._hp; }
    get hpMax() { return this._hpMax; }
}
exports.LifeAndBodyController = LifeAndBodyController;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = __webpack_require__(8);
class Smoke {
    constructor(position, maxRadius, time, speed, map) {
        this.position = position;
        this.maxRadius = maxRadius;
        this.time = time;
        this.speed = speed;
        this.map = map;
        this.id = Math.random();
        this.radius = 10;
        this.grow = true;
        this.update = () => {
            if (this.time > 0) {
                if (this.grow) {
                    if (this.radius >= this.maxRadius) {
                        this.grow = false;
                    }
                    this.radius += this.speed;
                }
                else {
                    if (this.time * this.speed - this.maxRadius <= 0 && this.radius > 0) {
                        this.radius -= this.speed;
                    }
                }
                this.time--;
            }
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                radius: this.radius,
                map: this.map,
                maxRadius: this.maxRadius,
                time: this.time
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                radius: this.radius
            };
        };
        Smoke.list[this.id] = this;
        globalVariables_1.initPack.smoke.push(this.getInitPack());
    }
}
Smoke.update = () => {
    let pack = [];
    for (let i in Smoke.list) {
        let smoke = Smoke.list[i];
        smoke.update();
        if (smoke.time == 0) {
            delete Smoke.list[i];
            globalVariables_1.removePack.smoke.push(smoke.id);
        }
        else {
            pack.push(smoke.getUpdatePack());
        }
    }
    return pack;
};
Smoke.list = {};
exports.Smoke = Smoke;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = __webpack_require__(4);
const GeometryAndPhysics_1 = __webpack_require__(0);
const enums_1 = __webpack_require__(1);
const PlayerClient_1 = __webpack_require__(5);
const game_1 = __webpack_require__(2);
class ParticleClient {
    constructor(param) {
        this.id = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.maxLife = 0;
        this.life = 0;
        this.size = 15;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            if (this.type == enums_1.ParticleType.fire)
                this.drawFireParticle();
        };
        this.drawFireParticle = () => {
            ctx.fillStyle = "rgba(" + (260 - (this.life * 2)) + "," + ((this.life * 2) + 50) + "," + (this.life * 2) + "," + (((this.maxLife - this.life) / this.maxLife) * 0.4) + ")";
            ctx.beginPath();
            let pos = canvas_1.camera.getScreenPosition(this.position);
            ctx.arc(pos.x, pos.y, (this.maxLife - this.life) / this.maxLife * (this.size / 2) + (this.size / 2), 0, 2 * Math.PI);
            ctx.fill();
        };
        this.id = (param.id !== undefined) ? param.id : 0;
        this.type = (param.type !== undefined) ? param.type : enums_1.ParticleType.fire;
        this.map = (param.map !== undefined) ? param.map : 0;
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.life = (param.life !== undefined) ? param.life : 0;
        this.size = (param.size !== undefined) ? param.size : 0;
        ParticleClient.list[this.id] = this;
    }
}
ParticleClient.list = {};
exports.ParticleClient = ParticleClient;


/***/ })
/******/ ]);