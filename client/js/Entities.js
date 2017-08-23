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
            
            let hpWidth = 30 * self.hp/self.hpMax;
            
            let x = self.x - Player.list[selfId].x+WIDTH/2;
            let y = self.y - Player.list[selfId].y+HEIGHT/2;

            
            let frameWidth = self.img.width/9;
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
            
            let walkingMod = Math.floor(self.spriteAnimCounter) % 9;
            
            ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - self.width/2, y - self.height/2, self.width, self.height);

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
