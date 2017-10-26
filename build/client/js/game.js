Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = require("./../../server/js/Controllers/MapControler");
const GameSoundManager_1 = require("./GameSoundManager");
const UpgradeClient_1 = require("./Entities/UpgradeClient");
const MapClient_1 = require("./MapClient");
const PlayerClient_1 = require("./Entities/PlayerClient");
const BulletClient_1 = require("./Entities/BulletClient");
const EnemyClient_1 = require("./Entities/EnemyClient");
const ExplosionClient_1 = require("./Entities/ExplosionClient");
const Inventory_1 = require("../../server/js/Inventory/Inventory");
exports.selfId = 0;
exports.inventory = new Inventory_1.Inventory(socket, false, 0);
MapControler_1.MapController.loadMaps(true);
let currentMap = new MapClient_1.MapClient(null, "forest");
socket.on('updateInventory', function (items) {
    exports.inventory.items = items;
    exports.inventory.refreshRender();
});
exports.gameSoundManager = new GameSoundManager_1.GameSoundManager();
socket.on('mapData', function (data) {
    MapControler_1.MapController.updateMap(data);
    if (currentMap.name == data.name)
        currentMap.reloadMap(MapControler_1.MapController.getMap(data.name));
});
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
    for (let i = 0, length = data.enemy.length; i < length; i++) {
        new EnemyClient_1.EnemyClient(data.enemy[i]);
    }
    if (data.upgrade !== undefined) {
        for (let i = 0, length = data.upgrade.length; i < length; i++) {
            new UpgradeClient_1.UpgradeClient(data.upgrade[i]);
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
                p.img = Img["player" + pack.weapon];
                p.imgMeleeAttack = Img["player" + pack.weapon + "meeleattack"];
                p.imgReload = Img["player" + pack.weapon + "reload"];
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
    gui.draw();
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
});
setInterval(function () {
    if (!exports.selfId) {
        return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    currentMap.draw();
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
    else if (event.keyCode === 77) {
        socket.emit('keyPress', { inputId: 'map', state: true, map: currentMap.map.name });
    }
    else if (event.keyCode === 80) {
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
//# sourceMappingURL=game.js.map