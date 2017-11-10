import { Smoke } from './server/js/Effects/Smoke';
import { MapController } from './server/js/Controllers/MapControler';
import { Player } from './server/js/Entities/Player';
import { Entity } from './server/js/Entities/Entity';
import { Bullet } from './server/js/Entities/Bullet';
import { Enemy } from './server/js/Entities/Enemy';
import { Upgrade } from './server/js/Entities/Upgrade';
import { Particle } from './server/js/Effects/Particle/Particle';
import { Flame } from './server/js/Effects/Flame';
var express = require('express');
var mongojs = require('mongojs');

var jsonGUI = require('./server/TexturePacks/GUIImages.json');
var jsonPlayer = require('./server/TexturePacks/PlayerImages.json');
var jsonMap = require('./server/TexturePacks/MapImages.json');
var jsonIAE = require('./server/TexturePacks/ItemsAndEnemiesImages.json');

var db = mongojs('mongodb://buka:buka123@ds123193.mlab.com:23193/brykiet', ['account','progress']);
db.account.insert({username:"buka", password: "buka"});

var app = express();
let server = require('http').Server(app);

app.get('/',function(request,response){
    response.sendFile(__dirname+'/client/index.html');
});

app.use('/client', express.static(__dirname+'/client'));

var listener = server.listen(process.env.PORT || 2000, function() {
  console.log('Example app listening on port ', listener.address().port);
});

console.log("Server started.");

const SOCKET_LIST = {};
const TILE_SIZE = 32;
export let frameCount = 0;

const DEBUG = true;

let isValidPassword = (data, cb) => {
    db.account.find({username:data.username, password:data.password}, function(err, res){
        (res.length > 0) ? cb(true) : cb(false);
    });
}

let isUsernameTaken = (data, cb) => {
    db.account.find({username:data.username}, function(err, res){
        (res.length > 0) ? cb(true) : cb(false);
    });
}

let addUser = (data, cb) => {
    db.account.insert({username:data.username, password:data.password}, function(err){
        cb();
    });
}

let io = require('socket.io')(server,{});

io.sockets.on('connection', function(socket){
    console.log("Socket connection");
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;


    socket.emit('jsonImages', {jsonGUI: jsonGUI, jsonPlayer: jsonPlayer, jsonMap: jsonMap, jsonIAE: jsonIAE});
    

    socket.on('signIn',function(data){
        isValidPassword(data, function(res){
            if(res){
                Player.onConnect(socket);
                socket.emit('signInResponse',{success: true});
           } else{
                socket.emit('signInResponse',{success: false});
           }
        });
    });   
    
    socket.on('signUp',function(data){
        isUsernameTaken(data, function(res){
            if(res){
                socket.emit('signUpResponse',{success: false});
            } else{
                addUser(data, function(){
                    socket.emit('signUpResponse',{success: true});
                });
            }
        });
    });  
    
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });

    socket.on('sendMsgToServer',function(data){
        let playerName = ("" + socket.id).slice(2,7);
        for (let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
        }
    });

    socket.on('evalServer',function(data){
        if(!DEBUG) { return; }
        let res = eval(data);
        socket.emit('evalAnswer',res);
    });
});

MapController.loadMaps();

setInterval(function(){
    
    let packs = Entity.getFrameUpdateData();
    
    let pack = {
        player: Player.update(),
        bullet: Bullet.update(),
        particle: Particle.update(),
        enemy: Enemy.update(),
        smoke: Smoke.update()
       // upgrade: Upgrade.update()
    }

    let flame: Flame;

    for(let i in Flame.list){
        flame = Flame.list[i];
        flame.update(true);
    }
    
    frameCount++;
    
    for(let i in SOCKET_LIST){
            let socket = SOCKET_LIST[i];
            socket.emit('init',packs.initPack);
            socket.emit('update',pack);
            socket.emit('remove',packs.removePack);
            for(let i = 0, length = MapController.updatePack.length; i < length; i++) {
                socket.emit('mapData', MapController.updatePack[i]);
            }
     }
    
    MapController.updatePack.length = 0;
    packs.initPack.player = [];
    packs.initPack.bullet = [];
    packs.initPack.enemy = [];
    packs.initPack.smoke = [];
    packs.initPack.particle = [];
    packs.initPack.upgrade = [];
    
    packs.removePack.player = [];
    packs.removePack.bullet = [];
    packs.removePack.enemy = [];
    packs.removePack.upgrade = [];
    packs.removePack.particle = [];
    packs.removePack.smoke = [];
}, 1000/25);