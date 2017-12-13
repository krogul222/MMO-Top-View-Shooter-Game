Object.defineProperty(exports, "__esModule", { value: true });
const GameController_1 = require("./server/js/Controllers/GameController");
const Smoke_1 = require("./server/js/Effects/Smoke");
const MapControler_1 = require("./server/js/Controllers/MapControler");
const Player_1 = require("./server/js/Entities/Player");
const Entity_1 = require("./server/js/Entities/Entity");
const Bullet_1 = require("./server/js/Entities/Bullet");
const Enemy_1 = require("./server/js/Entities/Enemy");
const Particle_1 = require("./server/js/Effects/Particle/Particle");
var express = require('express');
var mongojs = require('mongojs');
var path = require('path');
var jsonGUI = require('./server/TexturePacks/GUIImages.json');
var jsonPlayer = require('./server/TexturePacks/PlayerImages.json');
var jsonMap = require('./server/TexturePacks/MapImages.json');
var jsonIAE = require('./server/TexturePacks/ItemsAndEnemiesImages.json');
var db = mongojs('mongodb://buka:buka123@ds123193.mlab.com:23193/brykiet', ['account', 'progress']);
db.account.insert({ username: "buka", password: "buka" });
var app = express();
let server = require('http').Server(app);
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
var listener = server.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port ', listener.address().port);
});
console.log("Server started.");
const SOCKET_LIST = {};
const TILE_SIZE = 32;
exports.frameCount = 0;
const DEBUG = true;
let isValidPassword = (data, cb) => {
    db.account.find({ username: data.username, password: data.password }, function (err, res) {
        (res.length > 0) ? cb(true) : cb(false);
    });
};
let isUsernameTaken = (data, cb) => {
    db.account.find({ username: data.username }, function (err, res) {
        (res.length > 0) ? cb(true) : cb(false);
    });
};
let addUser = (data, cb) => {
    db.account.insert({ username: data.username, password: data.password }, function (err) {
        cb();
    });
};
let io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {
    console.log("Socket connection");
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    socket.emit('jsonImages', { jsonGUI: jsonGUI, jsonPlayer: jsonPlayer, jsonMap: jsonMap, jsonIAE: jsonIAE });
    socket.on('signIn', function (data) {
        isValidPassword(data, function (res) {
            if (res) {
                socket.emit('signInResponse', { success: true });
            }
            else {
                socket.emit('signInResponse', { success: false });
            }
        });
    });
    socket.on('joinedGame', function (data) {
        if (data.gameId !== undefined) {
            Player_1.Player.onConnect(socket, false, data.gameId);
        }
        else {
            Player_1.Player.onConnect(socket);
        }
    });
    socket.on('createdGame', function (data) {
        Player_1.Player.onConnect(socket, true, -1, data);
    });
    socket.on('signUp', function (data) {
        isUsernameTaken(data, function (res) {
            if (res) {
                socket.emit('signUpResponse', { success: false });
            }
            else {
                addUser(data, function () {
                    socket.emit('signUpResponse', { success: true });
                });
            }
        });
    });
    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        Player_1.Player.onDisconnect(socket);
    });
    socket.on('sendMsgToServer', function (data) {
        let playerName = ("" + socket.id).slice(2, 7);
        for (let i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
        }
    });
    socket.on('evalServer', function (data) {
        if (!DEBUG) {
            return;
        }
        let res = eval(data);
        socket.emit('evalAnswer', res);
    });
    socket.on('getListOfGames', function (data) {
        let pack = [];
        for (let i in GameController_1.GameController.list) {
            let game = GameController_1.GameController.list[i];
            pack.push({ id: game.id,
                name: game.name });
        }
        socket.emit('ListOfGames', pack);
    });
});
MapControler_1.MapController.loadMaps();
setInterval(function () {
    let packs = Entity_1.Entity.getFrameUpdateData();
    Particle_1.Particle.update();
    Bullet_1.Bullet.update();
    exports.frameCount++;
    for (let i in GameController_1.GameController.list) {
        let game = GameController_1.GameController.list[i];
        let pack = {
            player: Player_1.Player.updateSpecific(game.players),
            enemy: Enemy_1.Enemy.updateSpecific(game.enemies),
            smoke: Smoke_1.Smoke.updateSpecific(game.smokes)
        };
        let flag = true;
        for (let j in game.socketList) {
            flag = false;
            let socket = SOCKET_LIST[j];
            if (socket !== undefined) {
                socket.emit('init', game.initPack);
                socket.emit('update', pack);
                socket.emit('remove', game.removePack);
            }
        }
        if (flag) {
            GameController_1.GameController.remove(i);
            console.log("REMUWUJEMY");
        }
    }
    MapControler_1.MapController.updatePack.length = 0;
    for (let i in GameController_1.GameController.list) {
        let game = GameController_1.GameController.list[i];
        game.initPack.player = [];
        game.initPack.bullet = [];
        game.initPack.enemy = [];
        game.initPack.smoke = [];
        game.initPack.particle = [];
        game.initPack.upgrade = [];
        game.removePack.player = [];
        game.removePack.bullet = [];
        game.removePack.enemy = [];
        game.removePack.upgrade = [];
        game.removePack.particle = [];
        game.removePack.smoke = [];
    }
}, 1000 / 25);
//# sourceMappingURL=app.js.map