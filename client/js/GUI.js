GUI = function(param){
   
    let self = {
        width: param.width,
        height: param.height
        
    };
    
    self.ctx = param.ctx;
    
    self.draw = function(){
        
        self.ctx.clearRect(0,0,WIDTH,HEIGHT);
        
        if(Player.list[selfId]){
            self.ctx.fillText('Score: '+Player.list[selfId].score, 0, 30);
            self.ctx.fillText('Hit points: '+Player.list[selfId].hp + '/'+Player.list[selfId].hpMax, 0, 60);
            self.ctx.fillText('Ammo: '+Player.list[selfId].ammo, 0, 90);
            self.drawFace();
            self.drawWeapon();
        }
        else{
            self.ctx.fillText('Score: ', 0, 30);
        }
    };
    
    
    self.drawFace = function(){
        let spriteRows = 2;
        let spriteColumns = 4;
        let facelook = 1;
        
        if(Player.list[selfId]){ 
            facelook = Math.round(((Player.list[selfId].hpMax-Player.list[selfId].hp)/Player.list[selfId].hpMax)*(spriteRows*spriteColumns-1));
            
            let facex = facelook % spriteColumns;
            let facey = Math.floor(facelook / spriteColumns);
            
            let frameWidth = Img["face"].width/spriteColumns;
            let frameHeight = Img["face"].height/spriteRows;
            
            self.ctx.drawImage(Img["face"], facex*frameWidth, facey*frameHeight, frameWidth, frameHeight, (self.width-80)/2, (self.height-80)/2, 80, 80);
        }
    }
    
    self.drawWeapon = function(){
        if(Player.list[selfId]){
            self.ctx.drawImage(Img[Player.list[selfId].weapon], 0, 0, Img[Player.list[selfId].weapon].width, Img[Player.list[selfId].weapon].height, (self.width-80)/4, (self.height-80)/2, 80, 80);
        }
    }
    
    self.resize = function(width, height){
        self.width = width;
        self.height = height;
    }
    return self;
}