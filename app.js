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
let frameCount = 0;


testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}

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
        img: null,
        type: "entity"
    }
    
    if(param){
        if(param.spdX){
            self.spdX = param.spdX;
        }
        if(param.spdY){
            self.spdY = param.spdY;
        }
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
        if(param.type){
            self.type = param.type;
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
    
    self.testCollision = function(entity2){	//return if colliding (true/false)
		let rect1 = {
			x:self.x-self.width/2,
			y:self.y-self.height/2,
			width:self.width,
			height:self.height,
		}
		let rect2 = {
			x:entity2.x-entity2.width/2,
			y:entity2.y-entity2.height/2,
			width:entity2.width,
			height:entity2.height,
		}
		return testCollisionRectRect(rect1,rect2);
		
	}
    
    return self;
}

Actor = function(param){
	var self = Entity(param);
	
	self.hp = param.hp;
	self.hpMax = param.hp;
	self.atkSpd = param.atkSpd;
	self.attackCounter = 0;
	self.aimAngle = 0;
    self.type = param.type;
	
	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;
    self.moving = false;
    
    self.maxSpd = 3;    
     
    self.updateSpd  = function(){
		let leftBumper = {x:self.x - 40,y:self.y};
		let rightBumper = {x:self.x + 40,y:self.y};
		let upBumper = {x:self.x,y:self.y - 16};
		let downBumper = {x:self.x,y:self.y + 64};
		
        self.spdX = 0;
        self.spdY = 0;
        
        if(gameMaps[self.map].isPositionWall(rightBumper)){
            self.spdX = -self.maxSpd;
        } else{
            if(self.pressingRight)
                self.spdX = self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(leftBumper)){
            self.spdX = self.maxSpd;
        } else{
            if(self.pressingLeft)
                self.spdX = -self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(downBumper)){
            self.spdY = -self.maxSpd;
        } else{
            if(self.pressingDown)
                self.spdY = self.maxSpd;
        }

        if(gameMaps[self.map].isPositionWall(upBumper)){
            self.spdY = self.maxSpd;
        } else{
            if(self.pressingUp)
                self.spdY = -self.maxSpd;
        }
		
		//ispositionvalid
		if(self.x < self.width/2)
			self.x = self.width/2;
		if(self.x > gameMaps[self.map].width-self.width/2)
			self.x = gameMaps[self.map].width - self.width/2;
		if(self.y < self.height/2)
			self.y = self.height/2;
		if(self.y > gameMaps[self.map].height - self.height/2)
			self.y = gameMaps[self.map].height - self.height/2;

	}
	
	var super_update = self.update;
	self.update = function(){
        self.updateSpd();
        
		super_update();
        
		self.attackCounter += self.atkSpd;
		if(self.hp <= 0)
			self.onDeath();
	}
	self.onDeath = function(){};
	
	self.performAttack = function(){
		if(self.attackCounter > 25){	//every 1 sec
			self.attackCounter = 0;
			Bullet.generate(self);
		}
	}
	
	self.performSpecialAttack = function(){
		if(self.attackCounter > 50){	//every 1 sec
			self.attackCounter = 0;
			/*
			for(var i = 0 ; i < 360; i++){
				Bullet.generate(self,i);
			}
			*/
			Bullet.generate(self,self.aimAngle - 5);
			Bullet.generate(self,self.aimAngle);
			Bullet.generate(self,self.aimAngle + 5);
		}
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
        Bullet({parent: self.id, combatType: 'player',angle: angle, x: self.x, y: self.y, map: self.map, img: 'bullet', width: 32, height: 32});
    }
    
    self.updateSpd = function(){
        
        let bumperRightPos = {x: self.x + 18, y: self.y};
        let bumperLeftPos = {x: self.x - 18, y: self.y};
        let bumperUpPos = {x: self.x, y: self.y - 16};
        let bumperDownPos = {x: self.x, y: self.y + 30};
        
        self.spdX = 0;
        self.spdY = 0;
        
        if(gameMaps[self.map].isPositionWall(bumperRightPos)){
            self.spdX = -self.maxSpd;
        } else{
            if(self.pressingRight)
                self.spdX = self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(bumperLeftPos)){
            self.spdX = self.maxSpd;
        } else{
            if(self.pressingLeft)
                self.spdX = -self.maxSpd;
        }
        
        if(gameMaps[self.map].isPositionWall(bumperDownPos)){
            self.spdY = -self.maxSpd;
        } else{
            if(self.pressingDown)
                self.spdY = self.maxSpd;
        }

        if(gameMaps[self.map].isPositionWall(bumperUpPos)){
            self.spdY = self.maxSpd;
        } else{
            if(self.pressingUp)
                self.spdY = -self.maxSpd;
        }
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
    let player = Player({id: socket.id, map: map, img: 'player', width: 50, height: 70, type: "player"});
    Enemy.randomlyGenerate('forest');
    Enemy.randomlyGenerate('forest');
    Enemy.randomlyGenerate('forest');
    Enemy.randomlyGenerate('forest');
    Enemy.randomlyGenerate('forest');
    
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
    
    socket.emit('init',{player:Player.getAllInitPack(),bullet:Bullet.getAllInitPack(),enemy:Enemy.getAllInitPack(),selfId:socket.id});
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
    self.combatType = param.combatType;
    
    self.parent = param.parent;
    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;
    self.update = function(){
        if(self.timer++ > 100){
            self.toRemove = true;
        }
        super_update();
        
        
        if(self.combatType === 'player'){	//bullet was shot by player
			for(let key2 in Enemy.list){
				if(self.testCollision(Enemy.list[key2])){
					self.toRemove = true;
					Enemy.list[key2].hp -= 1;
                     if(Enemy.list[key2].hp <= 0){
                        let shooter = Player.list[self.parent];
                        if(shooter){
                            shooter.score += 1;
                        }
                     }
				}				
			}
		} else if(self.combatType === 'enemy'){
            for(let i in Player.list){
                let p = Player.list[i];
                if(self.testCollision(p)){
                    self.toRemove = true;
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
                }
            }
		}
    if(gameMaps[self.map].isPositionWall(self)){
        self.toRemove = true;
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
           height: self.height,
           combatType: self.combatType
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

Bullet.generate = function(actor,aimOverwrite){
	//Math.random() returns a number between 0 and 1
	let x = actor.x;
	let y = actor.y;
	let height = 24;
	let width = 24;
	let id = Math.random();
	
	let angle;
	if(aimOverwrite !== undefined)
		angle = aimOverwrite;
	else angle = actor.aimAngle;
	
	let spdX = Math.cos(angle/180*Math.PI)*5;
	let spdY = Math.sin(angle/180*Math.PI)*5;
	//Bullet(id,x,y,spdX,spdY,width,height,actor.type);
    Bullet({combatType: actor.type, id: id, parent: actor.id, x: x, y: y, map: actor.map, img: 'bullet', width: 32, height: 32, spdX: spdX, spdY: spdY, angle: angle});
}

Enemy = function(param){
	let self = Actor(param);
	Enemy.list[param.id] = self;
	
	self.toRemove = false;
	
	var super_update = self.update; 
	self.update = function(){
		super_update();
		self.updateAim();
		self.updateKeyPress();
		self.performAttack();
        
       // console.log("Right "+self.pressingRight );
	}
	self.updateAim = function(){
        let player = self.getClosestPlayer();
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;
		
		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}
	self.updateKeyPress = function(){
        let player = self.getClosestPlayer();
		let diffX = player.x - self.x;
		let diffY = player.y - self.y;

		self.pressingRight = diffX > 3;
		self.pressingLeft = diffX < -3;
		self.pressingDown = diffY > 3;
		self.pressingUp = diffY < -3;
        
        if(self.pressingRight || self.pressingLeft || self.pressingUp || self.pressingDown){
           self.moving = true;
       } else {
           self.moving = false;
       }
	}
	
	self.onDeath = function(){
		self.toRemove = true;
	}
    
    self.getClosestPlayer = function(){
        let distance = 10000;
        let index = 0;
        for(let i in Player.list){
            if(distance > self.getDistance(Player.list[i])){
                distance = self.getDistance(Player.list[i]);
                index = i; 
            }
          //  index = i; // temporary
        }
    return Player.list[index];
    }

    self.getInitPack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           number: self.number,
           hp: self.hp,
           hpMax: self.hpMax,
           map: self.map,
           img: self.img,
           width: self.width,
           height: self.height,
           moving: self.moving,
           aimAngle: self.aimAngle
        };
    }
    
    self.getUpdatePack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           hp: self.hp,
           moving: self.moving,
           aimAngle: self.aimAngle
        };
    }    
    
    Enemy.list[self.id] = self;
    initPack.enemy.push(self.getInitPack());
    return self;
}

Enemy.list = {};

Enemy.update = function(){
	/*if(frameCount % 100 === 0)	//every 4 sec
		Enemy.randomlyGenerate();*/
    let pack =[];
    
	for(let i in Enemy.list){
		let enemy = Enemy.list[i];
        enemy.update();
        if(enemy.toRemove){
            delete Enemy.list[i];
            Enemy.randomlyGenerate('forest');
            removePack.enemy.push(enemy.id);
        } else {
            pack.push(enemy.getUpdatePack());   
        }
	}
    return pack;
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

Enemy.randomlyGenerate = function(map){
	//Math.random() returns a number between 0 and 1
	let x = Math.random()*gameMaps[map].width;
	let y = Math.random()*gameMaps[map].height;
    let difficulty = 1+Math.round(Math.random()*2)*0.5;
	let height = 48*difficulty;
	let width = 48*difficulty;
	let id = Math.random();
    Enemy({id: id, x: x, y: y, width: width, height: height, hp: 10*difficulty, atkSpd: 1*difficulty, map: map, img: 'scorpion', type:'enemy'});
}

Enemy.getAllInitPack = function(){
    let enemies = [];
    for(let i in Enemy.list){
        enemies.push(Enemy.list[i].getInitPack());
    }
    return enemies;
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

let initPack = {player:[],bullet:[], enemy:[]};
let removePack = {player:[],bullet:[], enemy:[]};

setInterval(function(){
    
    let pack = {
        player: Player.update(),
        bullet: Bullet.update(),
        enemy: Enemy.update()
    }
    
    frameCount++;
    
    for(let i in SOCKET_LIST){
            let socket = SOCKET_LIST[i];
            socket.emit('init',initPack);
            socket.emit('update',pack);
            socket.emit('remove',removePack);
     }
    initPack.player = [];
    initPack.bullet = [];
    initPack.enemy = [];
    
    removePack.player = [];
    removePack.bullet = [];
    removePack.enemy = [];
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