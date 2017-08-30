let initPack = {player:[],bullet:[], enemy:[], upgrade:[]};
let removePack = {player:[],bullet:[], enemy:[], upgrade:[]};

testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}

Entity = function(param){
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
			x:self.x-(self.width/2)/2,
			y:self.y-(self.height/2)/2,
			width:self.width/2,
			height:self.height/2,
		}
		let rect2 = {
			x:entity2.x-(entity2.width/2)/2,
			y:entity2.y-(entity2.height/2)/2,
			width:entity2.width/2,
			height:entity2.height/2,
		}
		return testCollisionRectRect(rect1,rect2);
		
	}
    
    return self;
}

Entity.getFrameUpdateData = function(){
    return {removePack: removePack,
           initPack: initPack}
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
    self.atackRadius = 0;  
    self.weapon = "knife";
  
    if(param.maxSpd){
        self.maxSpd = param.maxSpd;
    } else {
        self.maxSpd = 3;  
    }
    
    self.updateSpd  = function(){
		let leftBumper = {x:self.x - 10,y:self.y};
		let rightBumper = {x:self.x + 10,y:self.y};
		let upBumper = {x:self.x,y:self.y - 16};
		let downBumper = {x:self.x,y:self.y + 32};
		
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
	self.onDeath = function(){
        self.atackRadius = 0;
    };
	
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

Player = function(param){
    let self = Actor(param);    
    self.number = "" + Math.floor(10*Math.random()),
    self.score = 0;
    self.updateEquipment = false;
    self.weapon = "pistol";
    
    self.inventory = new Inventory(param.socket, true);
    self.inventory.addItem("knife",1);
    self.inventory.addItem("pistol",1);
    
    let super_update = self.update;
    self.update = function(){
    //    self.updateSpd();
        
        super_update();

        //console.log('atak '+self.attackCounter);
        if(self.pressingAttack && self.attackCounter > 25){
            self.attackCounter = 0;
            
            if(self.weapon == "knife"){
                
            } else{
                self.shootBullet(self.aimAngle);
            }
            
            for(let i = 0; i < self.atackRadius; i++){
                self.shootBullet(self.aimAngle+(i+1)*2);
                self.shootBullet(self.aimAngle-(i+1)*2);
            }
            
           // self.pressingAttack = false;
        }

    }
    
    self.equipWeapon = function(weapon){
        self.weapon = weapon;
        
         self.maxSpd = 10;
        
        if(self.weapon == "shotgun"){
            self.atackRadius = 3;
        }
        
        if(self.weapon == "pistol"){
            self.atackRadius = 0;
        }
        
        if(self.weapon == "knife"){
            self.atackRadius = 0;
            self.maxSpd = 13;
        }
        
        self.updateEquipment = true;
    }
    
    self.shootBullet = function(angle){
        Bullet({parent: self.id, combatType: 'player',angle: angle, x: self.x, y: self.y, map: self.map, img: 'bullet', width: 32, height: 32});
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
           aimAngle: self.aimAngle,
           weapon: self.weapon
            
        };
    }

    self.getUpdatePack = function(){
        
        if(self.updateEquipment){
            self.updateEquipment = false;
            return {
               id: self.id,
               x: self.x,
               y: self.y,
               hp: self.hp,
               moving: self.moving,
               score: self.score,
               aimAngle: self.aimAngle,
               weapon: self.weapon
            };
        } else{
            return {
               id: self.id,
               x: self.x,
               y: self.y,
               hp: self.hp,
               moving: self.moving,
               score: self.score,
               aimAngle: self.aimAngle
            }; 
        }
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
    let player = Player({id: socket.id, maxSpd: 10, map: map, img: 'player',atkSpd: 6, width: 50, height: 50, type: "player", hp: 10, socket: socket});
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
           player.aimAngle = data.state;
        
        
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

Bullet = function(param){
    let self = Entity(param);
    self.id = Math.random();
    self.spdX = Math.cos(param.angle/180*Math.PI) * 20;
    self.spdY = Math.sin(param.angle/180*Math.PI) * 20;
    self.angle = param.angle;
    self.combatType = param.combatType;
    
    self.hitCategory = 0;
    self.hitEntityCategory = "";
    self.hitEntityId = "";
    
    
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
                    
                    self.hitCategory = 1;
                    self.hitEntityCategory = "enemy";
                    self.hitEntityId = Enemy.list[key2].id;
                    
                     if(Enemy.list[key2].hp <= 0){
                        let shooter = Player.list[self.parent];
                        if(shooter){
                            shooter.score += 1; 
                        }
                     }
				}				
			}
            
            for(let i in Player.list){
                if(Player.list[i].id !== self.parent){
                    let p = Player.list[i];
                    if(self.testCollision(p)){
                        self.toRemove = true;

                        self.hitCategory = 1;
                        self.hitEntityCategory = "player";
                        self.hitEntityId = p.id;

                        p.hp -= 1;
                        if(p.hp <= 0){
                            let shooter = Player.list[self.parent];
                            if(shooter){
                                shooter.score += 1;
                            }
                            p.onDeath();
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
            
            
		} else if(self.combatType === 'enemy'){
            for(let i in Player.list){
                let p = Player.list[i];
                if(self.testCollision(p)){
                    self.toRemove = true;
                    
                    self.hitCategory = 1;
                    self.hitEntityCategory = "player";
                    self.hitEntityId = p.id;
                    
                    p.hp -= 1;
                    if(p.hp <= 0){
                        let shooter = Player.list[self.parent];
                        if(shooter){
                            shooter.score += 1;
                        }
                        p.onDeath();
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
    
        
        
    if(gameMaps[self.map].isPositionWall(self) && gameMaps[self.map].isPositionWall(self) !== 2){
        self.toRemove = true; 
        self.hitCategory = 2;
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
           combatType: self.combatType,
           hitCategory: self.hitCategory
        };
    }

    self.getUpdatePack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           hitCategory: self.hitCategory
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
            removePack.bullet.push({id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId});
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

        let diffX = 0;
        let diffY = 0;
        let player = self.getClosestPlayer();
        if(player){
            diffX = player.x - self.x;
		    diffY = player.y - self.y;
        }
        
        if(Math.sqrt(diffX*diffX+diffY*diffY)<500)
		  self.performAttack();
        
       // console.log("Right "+self.pressingRight );
	}
	self.updateAim = function(){
        let player = self.getClosestPlayer();
        
        let diffX = 0;
        let diffY = 0;
        
        if(player){
            diffX = player.x - self.x;
		    diffY = player.y - self.y;
        }

		
		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}
	self.updateKeyPress = function(){
        let player = self.getClosestPlayer();
        
        let diffX = 0;
        let diffY = 0;
        
        if(player){
            diffX = player.x - self.x;
            diffY = player.y - self.y;        
        }


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
           aimAngle: self.aimAngle,
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
    
   // Enemy.list[self.id] = self;
    initPack.enemy.push(self.getInitPack());
    return self;
}

Enemy.list = {};

Enemy.update = function(){
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

Enemy.randomlyGenerate = function(map){
	//Math.random() returns a number between 0 and 1
	let x = Math.random()*gameMaps[map].width;
	let y = Math.random()*gameMaps[map].height;
    
    while(gameMaps[map].isPositionWall({x: x, y: y})){
        x = Math.random() * gameMaps[map].width; 
        y = Math.random() * gameMaps[map].height;  
    }    
    
    let difficulty = 1+Math.round(Math.random()*2)*0.5;
	let height = 48*difficulty;
	let width = 48*difficulty;
	let id = Math.random();
    Enemy({id: id, x: x, y: y, width: width, height: height, hp: 15*difficulty, atkSpd: 0.4*difficulty, map: map, img: 'scorpion', type:'enemy'});
}

Enemy.getAllInitPack = function(){
    let enemies = [];
    for(let i in Enemy.list){
        enemies.push(Enemy.list[i].getInitPack());
    }
    return enemies;
}

Upgrade = function (param){
    
    param.type = "upgrade";
    
	var self = Entity(param);
	
	self.category = param.category;
    
    self.getInitPack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
           map: self.map,
           img: self.img,
           width: self.width,
           height: self.height,
           category: self.category
        };
    }
    
    self.getUpdatePack = function(){
        return {
           id: self.id,
           x: self.x,
           y: self.y,
        };
    }    
    
	Upgrade.list[self.id] = self;

    initPack.upgrade.push(self.getInitPack());
    return self;
}

Upgrade.list = {};

Upgrade.update = function(){
    let pack =[];
    
	if(frameCount % 50 === 0)	//every 2 sec
		Upgrade.randomlyGenerate('forest');
	for(let key in Upgrade.list){
		Upgrade.list[key].update();
        pack.push(Upgrade.list[key].getUpdatePack());  
        
        for(let i in Player.list){
            let player = Player.list[i];
        
            let isColliding = player.testCollision(Upgrade.list[key]);
            if(isColliding){
                if(Upgrade.list[key].category === 'hp'){
                    player.inventory.addItem('medicalkit', 1);
                }
                if(Upgrade.list[key].category === 'pistol'){
                    //player.atackRadius =1;
                    player.inventory.addItem('pistol', 1);
                }

                if(Upgrade.list[key].category === 'shotgun'){
                    //player.atackRadius +=1;
                    player.inventory.addItem('shotgun', 1);
                }                
                
                removePack.upgrade.push(Upgrade.list[key].id);               
                delete Upgrade.list[key];
                break;
            } 
        }   
	}
    
    return pack;
}

Upgrade.randomlyGenerate = function(map){
	//Math.random() returns a number between 0 and 1
	let x = Math.random()*gameMaps[map].width;;
	let y = Math.random()*gameMaps[map].height;
    
    while(gameMaps[map].isPositionWall({x: x, y: y})){
        x = Math.random() * gameMaps[map].width; 
        y = Math.random() * gameMaps[map].height;  
    }
    
	let height = 32;
	let width = 32;
	let id = Math.random();
	let category = 'hp';
    let img = 'hp';
	if(Math.random()<0.3){
		//category = 'score';
		//img = 'player';
	} else {
        if(Math.random()<0.5){
            category = 'pistol';
            img = 'pistol';
        } else{
            category = 'shotgun';
            img = 'shotgun';
            height = 2*height;
            width = 2*width;
        }
	}
	
	Upgrade({id: id, x: x, y: y, width: width, height: height, category: category, map: map, img: img});
}

Upgrade.getAllInitPack = function(){
    let upgrades = [];
    for(let i in Upgrade.list){
        upgrades.push(Upgrade.list[i].getInitPack());
    }
    return upgrades;
}