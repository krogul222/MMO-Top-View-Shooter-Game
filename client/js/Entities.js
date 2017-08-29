    let Player = function(initPack){
        var self = {};
        self.id = initPack.id;
        self.number = initPack.number;
        self.x = initPack.x;
        self.y = initPack.y;
        self.hp = initPack.hp;
        self.hpMax = initPack.hpMax;
        self.score = initPack.score;
        self.map = initPack.map;
        self.img = Img[initPack.img];
        self.width = initPack.width;
        self.height = initPack.height;
        self.moving = initPack.moving;
        self.aimAngle = 0;
        self.spriteAnimCounter = 0;
        
        
        self.draw = function(){
            if(Player.list[selfId].map !== self.map){
              return;  
            }
            
            let spriteRows = 1;
            let spriteColumns = 20;
            
            let hpWidth = 30 * self.hp/self.hpMax;
            
            let x = self.x - Player.list[selfId].x+WIDTH/2;
            let y = self.y - Player.list[selfId].y+HEIGHT/2;

            
            let aimAngle = self.aimAngle;
            
            if(aimAngle < 0){
                aimAngle = 360 + aimAngle;
            }
            
            let directionMod = 3;  //right
            if(aimAngle >= 45 && aimAngle <135){
                directionMod = 2;   //down
            } else if(aimAngle >= 135 && aimAngle <225){
                directionMod = 1;   //left
            } else if(aimAngle >= 225 && aimAngle <315) {
                directionMod = 0;   // up 
            }
            
            directionMod = 0;
            
            let walkingMod = Math.floor(self.spriteAnimCounter) % spriteColumns;
    
            let frameWidth = Img["walk"].width/spriteColumns;
            let frameHeight = Img["walk"].height/spriteRows;        
            
            ctx.save();
            ctx.translate(x - self.width/4,y - self.height/4);
            ctx.translate(self.width/4, self.height/4); 
            ctx.rotate(aimAngle*Math.PI/180)
            
            ctx.drawImage(Img["walk"], walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/4,-self.height/4, self.width/2, self.height/2);
            
            //ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - self.width/2, y - self.height/2, self.width, self.height);
            
            ctx.restore();            
            
            frameWidth = self.img.width/spriteColumns;
            frameHeight = self.img.height/spriteRows;
            
            
            // the alternative is to untranslate & unrotate after drawing
            ctx.save();
            ctx.translate(x - self.width/2,y - self.height/2);
            ctx.translate(self.width/2, self.height/2); 
            ctx.rotate(aimAngle*Math.PI/180)
            
            ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/2,-self.height/2, self.width, self.height);
            
            //ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - self.width/2, y - self.height/2, self.width, self.height);
            
            ctx.restore();

            ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);
            
        }
        
        Player.list[self.id] = self;
        return self;
    }
    Player.list = {};


    let Bullet = function(initPack){
        var self = {};
        self.id = initPack.id;
        self.x = initPack.x;
        self.y = initPack.y;
        self.map = initPack.map;
        self.img = Img[initPack.img];
        self.width = initPack.width;
        self.height = initPack.height;
        self.hitCategory = initPack.hitCategory;
        
        self.hit = function(category, entityCategory, entityId){

          //  console.log("Hit function");
            
        let x = self.x;
        let y = self.y;
        
        if(entityCategory == "player"){
            if(Player.list[entityId]){
                x = Player.list[entityId].x + (1-Math.round(2*Math.random())) * Math.floor(Math.random()*Player.list[entityId].width/4);
                y = Player.list[entityId].y + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*Player.list[entityId].height/4);
            }
        }   
            
        if(entityCategory == "enemy"){
            if(Enemy.list[entityId]){
                x = Enemy.list[entityId].x + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*Enemy.list[entityId].width/4);
                y = Enemy.list[entityId].y + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*Enemy.list[entityId].height/4);
            }
        }   
            
        if(category == 1){
          //  
            
            new Explosion({x: x, y: y, map: self.map, img: "blood", width: 48, height: 48, category: category, spriteRows: 1, spriteColumns: 6});
            
            } else if(category == 2){
              
                new Explosion({x: x, y: y, map: self.map, img: "explosion1", width: 64, height: 64, category: category, spriteRows: 4, spriteColumns: 10});
                
            }
        }
        
        self.draw = function(){
            if(Player.list[selfId].map !== self.map){
              return;  
            }
            
            let x = self.x - Player.list[selfId].x+WIDTH/2;
            let y = self.y - Player.list[selfId].y+HEIGHT/2;
            
            ctx.drawImage(self.img, 0, 0, self.img.width, self.img.height, x - self.width/2, y - self.height/2, self.width, self.height);

        }
        
        Bullet.list[self.id] = self;
        return self;
    }
    Bullet.list = {};  



//----------------------------------------------------------------------------------
let Enemy = function(initPack){
    let self = {};
    self.id = initPack.id;
    self.number = initPack.number;
    self.x = initPack.x;
    self.y = initPack.y;
    self.hp = initPack.hp;
    self.hpMax = initPack.hpMax;
    self.score = initPack.score;
    self.map = initPack.map;
    self.img = Img[initPack.img];
    self.width = initPack.width;
    self.height = initPack.height;
    self.moving = initPack.moving;
    self.aimAngle = 0;
    self.spriteAnimCounter = 0;
    
    self.draw = function(){
        if(Player.list[selfId].map !== self.map){
            return;  
        }

        let x = self.x - Player.list[selfId].x+WIDTH/2;
        let y = self.y - Player.list[selfId].y+HEIGHT/2;
        
        let hpWidth = 30 * self.hp/self.hpMax;
            
        let frameWidth = self.img.width/6;
        let frameHeight = self.img.height/4;
        let aimAngle = self.aimAngle;
            
        if(aimAngle < 0){
            aimAngle = 360 + aimAngle;
        }
            
        let directionMod = 3;  //right
        if(aimAngle >= 45 && aimAngle <135){
            directionMod = 2;   //down
        } else if(aimAngle >= 135 && aimAngle <225){
            directionMod = 1;   //left
        } else if(aimAngle >= 225 && aimAngle <315) {
            directionMod = 0;   // up 
        }
            
        let walkingMod = Math.floor(self.spriteAnimCounter) % 6;
            
        ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - self.width/2, y - self.height/2, self.width, self.height);

        ctx.fillStyle = 'red';
        ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);        
    }
    
    Enemy.list[self.id] = self;
    return self;
}

Enemy.list = {}; 

//-----------------------------------------------------------------------------

Upgrade = function (initPack){
    let self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.width = initPack.width;
    self.height = initPack.height;
    self.map = initPack.map;
    self.img = Img[initPack.img];
	self.category = initPack.category;
    
    self.draw = function(){
        if(Player.list[selfId].map !== self.map){
            return;  
        }

        let x = self.x - Player.list[selfId].x+WIDTH/2;
        let y = self.y - Player.list[selfId].y+HEIGHT/2;
		
		x -= self.width/2;
		y -= self.height/2;
		
		ctx.drawImage(self.img,
			0,0,self.img.width,self.img.height,
			x,y,self.width,self.height);
		
    }
    
	Upgrade.list[self.id] = self;
    return self;
}

Upgrade.list = {};

//------------------------------------------------------------

Explosion = function(param){
    let self = {};
    self.id = Math.random();
    self.x = param.x;
    self.y = param.y;
    self.width = param.width;
    self.height = param.height;
    self.map = param.map;
    self.img = Img[param.img];
	self.category = param.category;
    
    self.spriteAnimCounter = 0;
    self.animRows = param.spriteRows;
    self.animColumns = param.spriteColumns;

    self.draw = function(){
        if(Player.list[selfId].map !== self.map){
            return;  
        }
        let frameWidth = self.img.width/self.animColumns;
        let frameHeight = self.img.height/self.animRows;

        let x = self.x - Player.list[selfId].x+WIDTH/2;
        let y = self.y - Player.list[selfId].y+HEIGHT/2;
		
		x -= self.width/2;
		y -= self.height/2;
		
        let spriteColumn = Math.floor(self.spriteAnimCounter) % self.animColumns;
        let spriteRow = Math.floor(self.spriteAnimCounter/self.animColumns);
        
		ctx.drawImage(self.img,
			frameWidth*spriteColumn,frameHeight*spriteRow,frameWidth,frameHeight,
			x,y,self.width,self.height);
		
    }
    
    self.isCompleted = function(){
        if(self.spriteAnimCounter > (self.animRows*self.animColumns))
            return true;
        else
            return false;
    }
    
	Explosion.list[self.id] = self;
    return self;
}

Explosion.list = {};