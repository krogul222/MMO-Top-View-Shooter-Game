GUI = function(param){
   
    let self = {
        width: param.width,
        height: param.height
        
    };
    
    self.ctx = param.ctx;
    
    self.draw = function(){
        
        self.ctx.clearRect(0,0,param.width,param.height);
        
        let pat = self.ctx.createPattern(Img["guibackground"],"repeat-x");
        self.ctx.fillStyle = pat;
        self.ctx.fillRect(0,0,self.width,self.height);
        self.ctx.fill();
        self.ctx.fillStyle = "#000000";
        
        if(Player.list[selfId]){
            self.ctx.fillText('Score: '+Player.list[selfId].score, 0, 0.3*self.height);
            self.ctx.fillText('Hit points: '+Player.list[selfId].hp + '/'+Player.list[selfId].hpMax, 0, 0.6*self.height);

            self.drawFace();
            self.drawWeapon();
            self.drawAmmo();
        }
        else{
            self.ctx.fillText('Score: ', 0, 0.3*self.height);
        }
    };
    
    
    self.drawFace = function(){
        let spriteRows = 2;
        let spriteColumns = 4;
        let facelook = 1;

        self.ctx.drawImage(Img["faceborder"], 0, 0, Img["faceborder"].width, Img["faceborder"].height, (self.width-0.85*self.height)/2, (self.height-0.85*self.height)/2, 0.85*self.height, 0.85*self.height);
        
        if(Player.list[selfId]){ 
            facelook = Math.round(((Player.list[selfId].hpMax-Player.list[selfId].hp)/Player.list[selfId].hpMax)*(spriteRows*spriteColumns-1));
            
            let facex = facelook % spriteColumns;
            let facey = Math.floor(facelook / spriteColumns);
            
            let frameWidth = Img["face"].width/spriteColumns;
            let frameHeight = Img["face"].height/spriteRows;
            
            self.ctx.drawImage(Img["face"], facex*frameWidth, facey*frameHeight, frameWidth, frameHeight, (self.width-0.8*self.height)/2, (self.height-0.8*self.height)/2, 0.8*self.height, 0.8*self.height);
        }
    }
    
    self.drawWeapon = function(){
        if(Player.list[selfId]){
            self.ctx.drawImage(Img[Player.list[selfId].weapon], 0, 0, Img[Player.list[selfId].weapon].width, Img[Player.list[selfId].weapon].height, (self.width-0.8*self.height)/4, (self.height-0.8*self.height)/2, 0.8*self.height, 0.8*self.height);
        }
    }
    
    self.drawAmmo = function(){
        if(Player.list[selfId]){
            if(Img[Player.list[selfId].weapon+"ammo"]){
                self.ctx.drawImage(Img[Player.list[selfId].weapon+"ammo"], 0, 0, Img[Player.list[selfId].weapon+"ammo"].width, Img[Player.list[selfId].weapon+"ammo"].height, 11*(self.width-0.8*self.height)/32, (self.height-0.4*self.height)/2, 0.4*self.height, 0.4*self.height); 
                
                self.ctx.fillText(' x'+Player.list[selfId].ammo, 11*(self.width-0.8*self.height)/32+0.4*self.height, (self.height)/2+10);
            }   
        }
        
    }
    
    self.resize = function(width, height){
        self.width = width;
        self.height = height;
    }
    return self;
}