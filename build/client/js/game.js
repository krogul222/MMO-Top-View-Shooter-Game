Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = require("./Entities/PlayerClient");
const BulletClient_1 = require("./Entities/BulletClient");
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
        if (PlayerClient_1.PlayerClient.list[i].moving || PlayerClient_1.PlayerClient.list[i].attackStarted) {
            if (PlayerClient_1.PlayerClient.list[i].reload)
                if (PlayerClient_1.PlayerClient.list[i].weapon == "pistol")
                    PlayerClient_1.PlayerClient.list[i].spriteAnimCounter += 1;
                else
                    PlayerClient_1.PlayerClient.list[i].spriteAnimCounter += 0.5;
            else
                PlayerClient_1.PlayerClient.list[i].spriteAnimCounter += 1;
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
//# sourceMappingURL=game.js.map