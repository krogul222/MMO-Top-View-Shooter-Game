var mongojs = require('mongojs');
//var db = mongojs('localhost:27017/myGame', ['account','progress']);
var db = mongojs('mongodb://buka:buka123@ds123193.mlab.com:23193/brykiet', ['account','progress']);

db.account.insert({username:"buka", password: "buka"});

var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/',function(request,response){
    response.sendFile(__dirname+'/client/index.html');
});

app.use('/client', express.static(__dirname+'/client'));

var listener = server.listen(process.env.PORT || 2000, function(){
    console.log("Listening on port", listener.address().port);
});



console.log("Server started.");

const SOCKET_LIST = {};
const TILE_SIZE = 32;

let Entity = function(param){
    let self = {
        x: 250,
        y: 250,
        width: 32,
        height: 32,
        spdX: 0,
        spdY: 0,
        id: "",
        map: 'forest',
        img: null
    }
    
    if(param){
        if(param.x){
            self.x = param.x;
        }
        if(param.y){
            self.y = param.y;
        }
        if(param.map){
            self.map = param.map;
        }
        if(param.id){
            self.id = param.id;
        }
        if(param.img){
            self.img = param.img;
        }
        if(param.width){
            self.width = param.width;
        }
        if(param.height){
            self.height = param.height;
        }
    }
    self.update = function(){
        self.updatePosition();
    }
    self.updatePosition = function(){
        self.x += self.spdX;
        self.y += self.spdY;
    } 
    
    self.getDistance = function(pt){
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    }
    
    return self;
}

let Player = function(param){
    let self = Entity(param);    
    self.number = "" + Math.floor(10*Math.random()),
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.moving = false;
    self.mouseAngle = 0;
    self.maxSpd = 10;
    self.hp = 10;
    self.hpMax = 10;
    self.score = 0;
    
    let super_update = self.update;
    self.update = function(){
        self.updateSpd();
        
        super_update();

        if(self.pressingAttack){
            self.shootBullet(self.mouseAngle);
            self.pressingAttack = false;
        }

    }
    
    self.shootBullet = function(angle){
        Bullet({parent: self.id, angle: angle, x: self.x, y: self.y, map: self.map, img: 'bullet', width: 32, height: 32});
    }
    
    self.updateSpd = function(){
        
        let bumperRightPos = {x: self.x + 18, y: self.y};
        let bumperLeftPos = {x: self.x - 18, y: self.y};
        let bumperUpPos = {x: self.x, y: self.y - 16};
        let bumperDownPos = {x: self.x, y: self.y + 30};
        
        self.spdX = 0;
        self.spdY = 0;
        
        if(gameMaps[self.map].isPositionWall(bumperRightPos)){
            self.spdX -= self.maxSpd;
        } else{
            if(self.pressingRight)
                self.spdX = self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(bumperLeftPos)){
            self.spdX += self.maxSpd;
        } else{
            if(self.pressingLeft)
                self.spdX = -self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(bumperDownPos)){
            self.spdY -= self.maxSpd;
        } else{
            if(self.pressingDown)
                self.spdY = self.maxSpd;
        }

        if(gameMaps[self.map].isPositionWall(bumperUpPos)){
            self.spdY += self.maxSpd;
        } else{
            if(self.pressingUp)
                self.spdY = -self.maxSpd;
        }
        /*
        if(self.pressingRight && !gameMaps[self.map].isPositionWall(bumperRightPos))
            self.spdX = self.maxSpd;
        else if(self.pressingLeft  && !gameMaps[self.map].isPositionWall(bumperLeftPos))
            self.spdX = -self.maxSpd;
        else
            self.spdX = 0;
        
        if(self.pressingUp  && !gameMaps[self.map].isPositionWall(bumperUpPos))
            self.spdY = -self.maxSpd;
        else if(self.pressingDown && !gameMaps[self.map].isPositionWall(bumperDownPos))
            self.spdY = self.maxSpd;
        else
            self.spdY = 0;*/
    }
    
    self.getInitPack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           number: self.number,
           hp: self.hp,
           hpMax: self.hpMax,
           score: self.score,
           map: self.map,
           img: self.img,
           width: self.width,
           height: self.height,
           moving: self.moving,
           aimAngle: self.mouseAngle
            
        };
    }

    self.getUpdatePack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           hp: self.hp,
           moving: self.moving,
           score: self.score,
           aimAngle: self.mouseAngle
        };
    }    
    
    Player.list[self.id] = self; 
    
    initPack.player.push(self.getInitPack());
    
    return self;
}
Player.list = {};
Player.onConnect = function(socket){
    let map = 'forest';
    if(Math.random() < -0.5){
        map = 'field';
    }
    let player = Player({id: socket.id, map: map, img: 'player', width: 50, height: 70});
    
    socket.on('keyPress', function(data){
       if(data.inputId == 'left')
           player.pressingLeft = data.state;
       if(data.inputId == 'right')
           player.pressingRight = data.state;
       if(data.inputId == 'up')
           player.pressingUp = data.state;
       if(data.inputId == 'down')
           player.pressingDown = data.state;
       if(data.inputId == 'attack')
           player.pressingAttack = data.state;
       if(data.inputId == 'mouseAngle')
           player.mouseAngle = data.state;
        
        
       if(player.pressingRight || player.pressingLeft || player.pressingUp || player.pressingDown){
           player.moving = true;
       } else {
           player.moving = false;
       }
    });
    
    socket.emit('init',{player:Player.getAllInitPack(),bullet:Bullet.getAllInitPack(),selfId:socket.id});
}

Player.getAllInitPack = function(){
    let players = [];
    for(let i in Player.list){
        players.push(Player.list[i].getInitPack());
    }
    return players;
}

Player.onDisconnect = function(socket){
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
}

Player.update = function(){
    let pack =[];
    for(let i in Player.list){
        let player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
}

let Bullet = function(param){
    let self = Entity(param);
    self.id = Math.random();
    self.spdX = Math.cos(param.angle/180*Math.PI) * 20;
    self.spdY = Math.sin(param.angle/180*Math.PI) * 20;
    self.angle = param.angle;
    
    self.parent = param.parent;
    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;
    self.update = function(){
        if(self.timer++ > 100){
            self.toRemove = true;
        }
        super_update();
        
        for(let i in Player.list){
            let p = Player.list[i];
            if(self.map === p.map && self.getDistance(p) < 32 && self.parent !== p.id){
                // handle collision
                p.hp -= 1;
                
                if(p.hp <= 0){
                    let shooter = Player.list[self.parent];
                    if(shooter){
                        shooter.score += 1;
                    }
                    p.hp = p.hpMax;
                    p.x = Math.random() * gameMaps[self.map].width; 
                    p.y = Math.random() * gameMaps[self.map].height;
                    
                    while(gameMaps[self.map].isPositionWall(p)){
                        p.x = Math.random() * gameMaps[self.map].width; 
                        p.y = Math.random() * gameMaps[self.map].height;  
                    }
                    
                    
                }
                
                self.toRemove = true;
            }
            
            if(gameMaps[self.map].isPositionWall(self)){
                self.toRemove = true;
            }
        }
    }
    
    self.getInitPack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           map: self.map,
           img: self.img,
           width: self.width,
           height: self.height
        };
    }

    self.getUpdatePack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y
        };
    }    
    
    
    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());
    return self;
}

Bullet.list = {};

Bullet.update = function(){
    
    let pack =[];
    for(let i in Bullet.list){
        let bullet = Bullet.list[i];
        bullet.update();
        if(bullet.toRemove){
            delete Bullet.list[i];
            removePack.bullet.push(bullet.id);
        } else {
            pack.push(bullet.getUpdatePack());     
        }
    }
    return pack;
}

Bullet.getAllInitPack = function(){
    let bullets = [];
    for(let i in Bullet.list){
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
}

const DEBUG = true;

const USERS = {
    // username: password
}

let isValidPassword = function(data, cb){
    db.account.find({username:data.username, password:data.password}, function(err, res){
        if(res.length > 0){
            cb(true);
        } else{
            cb(false);
        }
    });
}

let isUsernameTaken = function(data, cb){
    db.account.find({username:data.username}, function(err, res){
        if(res.length > 0){
            cb(true);
        } else{
            cb(false);
        }
    });
}

let addUser = function(data, cb){
    db.account.insert({username:data.username, password:data.password}, function(err){
        cb();
    });
}



let io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log("Socket connection");
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    


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
        if(!DEBUG){
            return;
        }
 
        let res = eval(data);
        socket.emit('evalAnswer',res);
    });
    
    });

let initPack = {player:[],bullet:[]};
let removePack = {player:[],bullet:[]};

setInterval(function(){
    
    let pack = {
        player: Player.update(),
        bullet: Bullet.update()
    }
    
     for(let i in SOCKET_LIST){
            let socket = SOCKET_LIST[i];
            socket.emit('init',initPack);
            socket.emit('update',pack);
            socket.emit('remove',removePack);
     }
    initPack.player = [];
    initPack.bullet = [];
    removePack.player = [];
    removePack.bullet = [];
}, 1000/25);


Maps = function(id, grid){
        let self = {
            id: id,
            width: grid[0].length * TILE_SIZE,
            height: grid.length * TILE_SIZE,
            grid: grid
        }
        
        self.isPositionWall = function(pt){
            var gridX = Math.floor(pt.x/TILE_SIZE);
            var gridY = Math.floor(pt.y/TILE_SIZE);
            
            if(gridX < 0 || gridX >= self.grid[0].length)
                return true;
            if(gridY < 0 || gridY >=self.grid.length)
                return true;
            
            return self.grid[gridY][gridX];
        }
        
        return self;
    }

let gameMaps = {};

var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 
var array2D = [];
for(var i = 0 ; i < 40; i++){
	array2D[i] = [];
	for(var j = 0 ; j < 40; j++){
		array2D[i][j] = array[i * 40 + j];
	}
}


gameMaps['forest'] = Maps('forest', array2D); 