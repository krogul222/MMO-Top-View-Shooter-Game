Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./../Entities/PlayerClient");
const Particle_1 = require("./../../../server/js/Effects/Particle/Particle");
const ParticleClient_1 = require("./../Effects/ParticleClient");
const UpgradeClient_1 = require("./../Entities/UpgradeClient");
const BulletClient_1 = require("./../Entities/BulletClient");
const GameSoundManager_1 = require("./../sound/GameSoundManager");
const Inventory_1 = require("../../../server/js/Inventory/Inventory");
const MapControler_1 = require("../../../server/js/Controllers/MapControler");
const MapClient_1 = require("./MapClient");
const Filters_1 = require("../Effects/Filters");
const Effects_1 = require("../Effects/Effects");
const canvas_1 = require("../pregame/canvas");
const SmokeClient_1 = require("../Effects/SmokeClient");
const EnemyClient_1 = require("../Entities/EnemyClient");
const ExplosionClient_1 = require("../Entities/ExplosionClient");
let menuDuringGameDiv = document.getElementById("menuDuringGameDiv");
let enemyDrawList = [];
exports.selfId = 0;
let smokeTest = false;
let frame = 0;
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
socket.on('mapData', function (data) {
    MapControler_1.MapController.createMap(data.name, data.size, 20);
    MapControler_1.MapController.updateMap(data);
    exports.currentMap.reloadMap(MapControler_1.MapController.getMap(data.name));
    canvas_1.camera.updateWorldSize(exports.currentMap.map.width, exports.currentMap.map.height);
    gui.createMinimap();
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
    if (data.bullet !== undefined) {
        for (let i = 0, length = data.bullet.length; i < length; i++) {
            let b = new BulletClient_1.BulletClient(data.bullet[i]);
            b.hit(data.bullet[i].hitCategory, data.bullet[i].hitEntityCategory, data.bullet[i].hitEntityId);
        }
    }
    for (let i = 0, length = data.enemy.length; i < length; i++) {
        console.log("NOWY STWOR");
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
            if (pack.burn !== undefined) {
                p.burn.create = pack.burn;
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
            if (pack.fragEnemy !== undefined) {
                p.fragEnemy = pack.fragEnemy;
            }
            if (pack.fragPlayer !== undefined) {
                p.fragPlayer = pack.fragPlayer;
            }
            if (pack.reload !== undefined) {
                if (pack.reload) {
                    p.reload = true;
                }
                else {
                    p.reload = false;
                }
            }
            if (pack.pressingAttack !== undefined) {
                console.log("Pressing attack " + pack.pressingAttack);
                if (p.weapon == "flamethrower" && !p.attackMelee) {
                    p.flame.create = pack.pressingAttack;
                }
                else {
                    p.flame.create = false;
                }
            }
            if (pack.attackStarted !== undefined) {
                if (pack.attackStarted) {
                    if (p.reload)
                        exports.gameSoundManager.playWeaponReload(p.weapon);
                    exports.gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                    p.attackStarted = pack.attackStarted;
                    p.bodySpriteAnimCounter = 0;
                }
            }
        }
    }
    if (data.enemy !== undefined) {
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
                if (pack.burn !== undefined) {
                    p.burn.create = pack.burn;
                }
                if (pack.moving !== undefined) {
                    p.moving = pack.moving;
                }
                if (pack.aimAngle !== undefined) {
                    p.aimAngle = pack.aimAngle;
                }
                if (pack.pressingAttack !== undefined) {
                    console.log("Pressing attack " + pack.pressingAttack);
                    if (p.weapon == "flamethrower" && !p.attackMelee) {
                        p.flame.create = pack.pressingAttack;
                    }
                    else {
                        p.flame.create = false;
                    }
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
                        p.attackStarted = pack.attackStarted;
                        p.spriteAnimCounter = 0;
                    }
                }
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
        if (EnemyClient_1.EnemyClient.list[data.enemy[i]] !== undefined) {
            exports.gameSoundManager.playDeath(EnemyClient_1.EnemyClient.list[data.enemy[i]].kind);
        }
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
    frame++;
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
        if (BulletClient_1.BulletClient.list[i].toRemove) {
            delete BulletClient_1.BulletClient.list[i];
        }
        else {
            BulletClient_1.BulletClient.list[i].update();
        }
    }
    for (let i in UpgradeClient_1.UpgradeClient.list) {
        UpgradeClient_1.UpgradeClient.list[i].draw();
    }
    for (let k in enemyDrawList) {
        let i = enemyDrawList[k];
        if (EnemyClient_1.EnemyClient.list[i] !== undefined) {
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
        console.log("Enemy draw " + i);
    }
    for (let i in ExplosionClient_1.ExplosionClient.list) {
        ExplosionClient_1.ExplosionClient.list[i].spriteAnimCounter += 1;
        if (ExplosionClient_1.ExplosionClient.list[i].isCompleted()) {
            delete ExplosionClient_1.ExplosionClient.list[i];
        }
        else {
            ExplosionClient_1.ExplosionClient.list[i].draw();
        }
    }
    for (let i in PlayerClient_1.PlayerClient.list) {
        PlayerClient_1.PlayerClient.list[i].flame.update();
        PlayerClient_1.PlayerClient.list[i].flame.draw();
        PlayerClient_1.PlayerClient.list[i].burn.update();
        PlayerClient_1.PlayerClient.list[i].burn.draw();
    }
    for (let k in enemyDrawList) {
        let i = enemyDrawList[k];
        if (EnemyClient_1.EnemyClient.list[i] !== undefined) {
            EnemyClient_1.EnemyClient.list[i].flame.update();
            EnemyClient_1.EnemyClient.list[i].flame.draw();
            EnemyClient_1.EnemyClient.list[i].burn.update();
            EnemyClient_1.EnemyClient.list[i].burn.draw();
        }
    }
    for (let i in SmokeClient_1.SmokeClient.list) {
        SmokeClient_1.SmokeClient.list[i].update();
        SmokeClient_1.SmokeClient.list[i].draw();
    }
    console.log("FRAME " + frame % 40);
    if ((frame % 40) == 0) {
        console.log("UPDATE LIST");
        enemyDrawList = updateEnemyDrawList();
    }
}, 40);
let updateEnemyDrawList = () => {
    if (!exports.selfId) {
        return [];
    }
    let p = PlayerClient_1.PlayerClient.list[exports.selfId];
    console.log("Wynik " + p.getEnemies(500));
    return p.getEnemies(1000);
};
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
        console.log("MENU");
        if (menuDuringGameDiv.style.display == 'none') {
            menuDuringGameDiv.style.display = 'block';
        }
        else {
            menuDuringGameDiv.style.display = 'none';
        }
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
    socket.emit('keyPress', { inputId: 'attack', state: true });
};
document.onmouseup = function (event) {
    socket.emit('keyPress', { inputId: 'attack', state: false });
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
exports.leaveGame = () => {
    for (let i in PlayerClient_1.PlayerClient.list) {
        delete PlayerClient_1.PlayerClient.list[i];
    }
    for (let i in EnemyClient_1.EnemyClient.list) {
        delete EnemyClient_1.EnemyClient.list[i];
    }
    for (let i in UpgradeClient_1.UpgradeClient.list) {
        delete UpgradeClient_1.UpgradeClient.list[i];
    }
    for (let i in SmokeClient_1.SmokeClient.list) {
        delete SmokeClient_1.SmokeClient.list[i];
    }
    for (let i in BulletClient_1.BulletClient.list) {
        delete BulletClient_1.BulletClient.list[i];
    }
    exports.selfId = 0;
    menuDuringGameDiv.style.display = 'none';
};
exports.enableSound = (sound) => {
    exports.gameSoundManager.turnSound(sound);
};
//# sourceMappingURL=game.js.map