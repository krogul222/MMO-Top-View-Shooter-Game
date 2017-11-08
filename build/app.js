Object.defineProperty(exports, "__esModule", { value: true });
const Smoke_1 = require("./server/js/Effects/Smoke");
const MapControler_1 = require("./server/js/Controllers/MapControler");
const Player_1 = require("./server/js/Entities/Player");
const Entity_1 = require("./server/js/Entities/Entity");
const Bullet_1 = require("./server/js/Entities/Bullet");
const Enemy_1 = require("./server/js/Entities/Enemy");
var express = require('express');
var mongojs = require('mongojs');
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
                Player_1.Player.onConnect(socket);
                socket.emit('signInResponse', { success: true });
            }
            else {
                socket.emit('signInResponse', { success: false });
            }
        });
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
});
MapControler_1.MapController.loadMaps();
setInterval(function () {
    let packs = Entity_1.Entity.getFrameUpdateData();
    let pack = {
        player: Player_1.Player.update(),
        bullet: Bullet_1.Bullet.update(),
        enemy: Enemy_1.Enemy.update(),
        smoke: Smoke_1.Smoke.update()
    };
    exports.frameCount++;
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i];
        socket.emit('init', packs.initPack);
        socket.emit('update', pack);
        socket.emit('remove', packs.removePack);
        for (let i = 0, length = MapControler_1.MapController.updatePack.length; i < length; i++) {
            socket.emit('mapData', MapControler_1.MapController.updatePack[i]);
        }
    }
    MapControler_1.MapController.updatePack.length = 0;
    packs.initPack.player = [];
    packs.initPack.bullet = [];
    packs.initPack.enemy = [];
    packs.initPack.smoke = [];
    packs.initPack.upgrade = [];
    packs.removePack.player = [];
    packs.removePack.bullet = [];
    packs.removePack.enemy = [];
    packs.removePack.upgrade = [];
    packs.removePack.smoke = [];
}, 1000 / 25);
//# sourceMappingURL=app.js.map