import { PlayerClient } from './Entities/Player';

declare var ctx;
declare const WIDTH;
declare const HEIGHT;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare var mouseX: any;
declare var mouseY: any;

export var selfId: number = 0;

socket.on('init', function(data){
    if(data.selfId){
        selfId = data.selfId;
    }
   for(let i = 0, length = data.player.length; i < length; i++){
       new PlayerClient(data.player[i]);
   } 
});


socket.on('update', function(data){
   for(let i = 0, length = data.player.length; i < length ; i++){
       let pack = data.player[i];
       let p = PlayerClient.list[pack.id];
       if(p){
           if(pack.x !== undefined){
               p.x = pack.x;
           } 
           if(pack.y !== undefined){
               p.y = pack.y;
           }
           if(pack.hp !== undefined){
               p.hp = pack.hp;
           }
           if(pack.moving !== undefined){
               p.moving = pack.moving;
           } 
           if(pack.aimAngle !== undefined){
               p.aimAngle = pack.aimAngle;
           } 

           if(pack.reload !== undefined){
               if(pack.reload){
                   p.reload = true;
               } else{
                   p.reload = false;
               }
           }
           
        //gui.draw()
       }
   } 
    
});


setInterval(function(){
    if(!selfId){
        return;
    }
    
    ctx.clearRect(0,0,WIDTH,HEIGHT);
   // currentMap.draw();
  //  drawScore();
    //drawAmmo();
    for(let i in PlayerClient.list){
        if(PlayerClient.list[i].moving || PlayerClient.list[i].attackStarted){
            if(PlayerClient.list[i].reload)
                if(PlayerClient.list[i].weapon == "pistol")
                    PlayerClient.list[i].spriteAnimCounter += 1;
                else
                    PlayerClient.list[i].spriteAnimCounter += 0.5;
            else
                PlayerClient.list[i].spriteAnimCounter += 1;
        }
        PlayerClient.list[i].draw();
    } 
}, 40);


document.onkeydown = function(event){
    if(event.keyCode === 68)  //d
        socket.emit('keyPress', {inputId:'right', state:true});
    else if(event.keyCode === 83)  //s
        socket.emit('keyPress', {inputId:'down', state:true});
    else if(event.keyCode === 65)  //a
             socket.emit('keyPress', {inputId:'left', state:true});       
    else if(event.keyCode === 87)  //w
        socket.emit('keyPress', {inputId:'up', state:true});
    else if(event.keyCode === 69)  //e
        socket.emit('keyPress', {inputId:'heal', state:true});
    else if(event.keyCode === 49)  //1
        socket.emit('keyPress', {inputId:'1', state:true});
    else if(event.keyCode === 50)  //2
        socket.emit('keyPress', {inputId:'2', state:true});
    else if(event.keyCode === 51)  //3
        socket.emit('keyPress', {inputId:'3', state:true});
    else if(event.keyCode === 52)  //4
        socket.emit('keyPress', {inputId:'4', state:true});
    else if(event.keyCode === 32){
        socket.emit('keyPress', {inputId:'space', state:true});
        return false;
    }
}

document.onkeyup = function(event){
    if(event.keyCode === 68)  //d
        socket.emit('keyPress', {inputId:'right', state:false});
    else if(event.keyCode === 83)  //s
        socket.emit('keyPress', {inputId:'down', state:false});
    else if(event.keyCode === 65)  //a
        socket.emit('keyPress', {inputId:'left', state:false});
    else if(event.keyCode === 87)  //w
        socket.emit('keyPress', {inputId:'up', state:false});
}

document.onmousedown = function(event){
    socket.emit('keyPress', {inputId:'attack', state:true});
}
document.onmouseup = function(event){
    socket.emit('keyPress', {inputId:'attack', state:false});
}



document.onmousemove = function(event){
    let x = -WIDTH/2 + event.clientX - 8 - (WIDTH/2 -event.clientX)/CAMERA_BOX_ADJUSTMENT;
    let y = -HEIGHT/2 + event.clientY - 8 - (HEIGHT/2-event.clientY)/CAMERA_BOX_ADJUSTMENT;
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    let angle = Math.atan2(y,x)/Math.PI * 180;
    
    if(selfId){
        let player = PlayerClient.list[selfId];
        player.aimAngle = angle;
    }
    socket.emit('keyPress', {inputId:'mouseAngle', state: angle});
}

/*
$(document).keydown(function(e) {
if (e.which == 32) {
    return false;
    }
});*/