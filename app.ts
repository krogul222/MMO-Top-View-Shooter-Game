import { GameController } from './server/js/Controllers/GameController';
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
var path = require('path');

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

var listener = server.listen(process.env.PORT || 5000, function() {
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
                socket.emit('signInResponse',{success: true});
           } else{
                socket.emit('signInResponse',{success: false});
           }
        });
    });   

    socket.on('joinedGame',function(data){
        if(data.gameId !== undefined){
            Player.onConnect(socket, false, data.gameId);
        } else{
            Player.onConnect(socket);
        }

    });

    socket.on('createdGame',function(data){
        Player.onConnect(socket, true, -1, data);
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

    socket.on('getListOfGames',function(data){
        let pack: any[] =[];
        for(let i in GameController.list){
            let game: GameController = GameController.list[i];
            pack.push({id: game.id,
            name: game.name});
        }

        socket.emit('ListOfGames',pack);
    });
});

MapController.loadMaps();

setInterval(function(){
    
    let packs = Entity.getFrameUpdateData();
    
    Particle.update();
    Bullet.update();
   // Upgrade.update();
   /* let pack = {
        player: Player.update(),
     //   bullet: Bullet.update(),
    //    particle: Particle.update(),
        enemy: Enemy.update(),
        smoke: Smoke.update()
       // upgrade: Upgrade.update()
    }*/

    frameCount++;


     // Game Controller
     for(let i in GameController.list){
        let game: GameController = GameController.list[i];

        let pack = {
            player: Player.updateSpecific(game.players),
            enemy: Enemy.updateSpecific(game.enemies),
            smoke: Smoke.updateSpecific(game.smokes)
        }


        let flag:boolean = true;
        for(let j in game.socketList){
            flag = false;
            let socket = SOCKET_LIST[j];
            if(socket !== undefined){
    
                socket.emit('init',game.initPack);
                socket.emit('update',pack);
                socket.emit('remove',game.removePack);
            }
    
        }

        if(flag){
            GameController.remove(i);
            console.log("REMUWUJEMY");
        }
    }


    
    MapController.updatePack.length = 0;
    /*
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
    */
    for(let i in GameController.list){
        let game: GameController = GameController.list[i];
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

}, 1000/25);