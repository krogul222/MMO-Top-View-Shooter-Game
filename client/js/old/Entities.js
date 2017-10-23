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
        self.img = Img["player"+initPack.weapon];
        self.imgMeeleAttack = Img["player"+initPack.weapon+"meeleattack"];
        self.width = initPack.width;
        self.height = initPack.height;
        self.moving = initPack.moving;
        self.attackStarted = initPack.attackStarted;
        self.attackMeele = initPack.attackMeele;
        self.aimAngle = 0;
        self.spriteAnimCounter = 0;
        self.weapon = initPack.weapon;
        self.ammo = initPack.ammo;
        self.ammoInGun = initPack.ammoInGun;
        self.reload = false;

        self.draw = function(){
            if(Player.list[selfId].map !== self.map){
              return;  
            }
            
            let spriteRows = 1;
            let spriteColumns = 20;
            
            let hpWidth = 30 * self.hp/self.hpMax;
            
            let x = self.x - (Player.list[selfId].x-WIDTH/2);
            x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
            let y = self.y - (Player.list[selfId].y-HEIGHT/2);
            y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

            
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
            
            ctx.restore();            

            
            if(self.attackStarted && self.attackMeele){
                spriteColumns = 15;
                let correction = 1.3;
                let correctionWidth = 1;
                let correctionHeight = 1;
                
                if(self.weapon == "pistol"){
                    correction = 1.1;
                }
                
                if(self.weapon == "shotgun"){
                    correction = 1.4;
                }
                
                frameWidth = self.imgMeeleAttack.width/spriteColumns;
                frameHeight = self.imgMeeleAttack.height/spriteRows;


                // the alternative is to untranslate & unrotate after drawing
                ctx.save();
                ctx.translate(x - (self.width*correctionWidth)*correction/2,y - self.height*correction/2);
                ctx.translate((self.width)*correction/2, self.height*correction/2); 
                ctx.rotate(aimAngle*Math.PI/180)

                console.log(correction);
                
                ctx.drawImage(self.imgMeeleAttack, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width*correction/2,-self.height*correction/2, (self.width)*correction, self.height*correction);
                ctx.restore();
                
                if(self.spriteAnimCounter % spriteColumns >= (spriteColumns-1)){
                    self.spriteAnimCounter = 0;
                    self.attackStarted = false;
                }
                
            } else{
                
                if(self.reload){
                    let reloadImg = Img["player"+self.weapon+"reload"];
                    
                    if(self.weapon == "pistol")
                        spriteColumns = 15;
                    
                    frameWidth = reloadImg.width/spriteColumns;
                    frameHeight = reloadImg.height/spriteRows;


                    // the alternative is to untranslate & unrotate after drawing
                    ctx.save();
                    ctx.translate(x - self.width/2,y - self.height/2);
                    ctx.translate(self.width/2, self.height/2); 
                    ctx.rotate(aimAngle*Math.PI/180)

                    ctx.drawImage(reloadImg, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/2,-self.height/2, self.width, self.height);

                    ctx.restore();
                    
                    if(self.spriteAnimCounter % spriteColumns == (spriteColumns-1)){
                        self.spriteAnimCounter = 0;
                        self.attackStarted = false;
                        self.reload = false;
                    }
                } else{
                    frameWidth = self.img.width/spriteColumns;
                    frameHeight = self.img.height/spriteRows;


                    // the alternative is to untranslate & unrotate after drawing
                    ctx.save();
                    ctx.translate(x - self.width/2,y - self.height/2);
                    ctx.translate(self.width/2, self.height/2); 
                    ctx.rotate(aimAngle*Math.PI/180)

                    ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/2,-self.height/2, self.width, self.height);

                    ctx.restore();

                }
                
            }
            
            

            
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
                
                soundManager.play('pain');
            }
        }   
            
        if(entityCategory == "enemy"){
            if(Enemy.list[entityId]){
                x = Enemy.list[entityId].x + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*Enemy.list[entityId].width/4);
                y = Enemy.list[entityId].y + (1-Math.round(2*Math.random())) *Math.floor(Math.random()*Enemy.list[entityId].height/4);
                
                if(Math.random()<0.5){
                    soundManager.play('squishy1');
                } else{
                    soundManager.play('squishy2');
                }
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
            
            let x = self.x - (Player.list[selfId].x-WIDTH/2);
            x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;

            let y = self.y - (Player.list[selfId].y-HEIGHT/2);
            y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

            
            ctx.drawImage(self.img, 0, 0, self.img.width, self.img.height, x - self.width/2, y - self.height/2, self.width, self.height);

        }
        
        Bullet.list[self.id] = self;
        return self;
    }
    Bullet.list = {};  



//----------------------------------------------------------------------------------

let framesMove = {};
let framesAttack = {};
framesMove['zombie'] = 17;
framesAttack['zombie'] = 9;


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
    self.kind = initPack.kind;
    self.attackStarted = initPack.attackStarted;
    self.weapon = initPack.weapon;
    self.reload = false;
    self.attackMeele = initPack.attackMeele;
    
    self.draw = function(){
        if(Player.list[selfId].map !== self.map){
            return;  
        }

        let x = self.x - (Player.list[selfId].x-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;

        let y = self.y - (Player.list[selfId].y-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

        
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
        
        
        if(self.kind == 'zombie'){
            directionMod = 0;
            
            let frameWidth = self.img.width/framesMove[self.kind ];
            let frameHeight = self.img.height;
            console.log(self.attackStarted);
            
             if(self.attackStarted){
                let spriteColumns = framesAttack[self.kind];
                let spriteRows = 1;
                walkingMod = Math.floor(self.spriteAnimCounter) % spriteColumns;

                frameWidth = Img[self.kind+'attack'].width/spriteColumns;
                frameHeight = Img[self.kind+'attack'].height/spriteRows;


                // the alternative is to untranslate & unrotate after drawing
                ctx.save();
                ctx.translate(x - (self.width)/2,y - self.height/2);
                ctx.translate((self.width)/2, self.height/2); 
                ctx.rotate(aimAngle*Math.PI/180)
                
                ctx.drawImage(Img[self.kind+'attack'], walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/2,-self.height/2, (self.width), self.height);
                ctx.restore();
                
                if(self.spriteAnimCounter % spriteColumns >= (spriteColumns-1)){
                    self.spriteAnimCounter = 0;
                    self.attackStarted = false;
                }
             } else{
            
                ctx.save();
                ctx.translate(x - self.width/2,y - self.height/2);
                ctx.translate(self.width/2, self.height/2); 
                ctx.rotate(aimAngle*Math.PI/180)

                walkingMod = Math.floor(self.spriteAnimCounter) % framesMove[self.kind];

                ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, -self.width/2,-self.height/2, self.width, self.height);

                ctx.restore();
             }
            
        } else{
            
            walkingMod = Math.floor(self.spriteAnimCounter) % 6;
            
            ctx.drawImage(self.img, walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight, x - self.width/2, y - self.height/2, self.width, self.height);
        }
        
        


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

        let x = self.x - (Player.list[selfId].x-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;
        let y = self.y - (Player.list[selfId].y-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;
		
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

        let x = self.x - (Player.list[selfId].x-WIDTH/2);
        x = x - (mouseX-WIDTH/2)/CAMERA_BOX_ADJUSTMENT;

        let y = self.y - (Player.list[selfId].y-HEIGHT/2);
        y = y - (mouseY-HEIGHT/2)/CAMERA_BOX_ADJUSTMENT;

		
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