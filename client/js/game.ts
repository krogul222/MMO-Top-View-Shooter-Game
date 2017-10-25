import { GameMap } from './../../server/js/Map/GameMap';
import { AttackController } from './../../server/js/Controllers/AttackControler';
import { MapController } from './../../server/js/Controllers/MapControler';
import { GameSoundManager } from './GameSoundManager';
import { UpgradeClient } from './Entities/UpgradeClient';
import { MapClient } from './MapClient';
import { GUI } from './GUI';
import { PlayerClient } from "./Entities/PlayerClient";
import { BulletClient } from "./Entities/BulletClient";
import { EnemyClient } from './Entities/EnemyClient';
import { ExplosionClient } from './Entities/ExplosionClient';
import { Inventory } from '../../server/js/Inventory/Inventory';

declare var ctx;
declare const WIDTH;
declare const HEIGHT;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare var mouseX: any;
declare var mouseY: any;
declare var gui: GUI;

export var selfId: number = 0;


export let inventory = new Inventory(socket, false, 0);

let mapController: MapController = new MapController({});
MapController.loadMaps();
let currentMap = new MapClient(MapController.getMap("forest"));


socket.on('updateInventory', function(items){
   inventory.items = items;
    inventory.refreshRender();
});

export let gameSoundManager = new GameSoundManager();

socket.on('mapData', function(data){
    MapController.updateMap(data);
    if(currentMap.map.name == data.name)
        currentMap.reloadMap(MapController.getMap(data.name));

});

socket.on('init', function(data){
    if(data.selfId){
        selfId = data.selfId;
    }
   for(let i = 0, length = data.player.length; i < length; i++){
       new PlayerClient(data.player[i]);
   } 

   for(let i = 0, length = data.bullet.length; i < length; i++){
        new BulletClient(data.bullet[i]);  
    } 

    for(let i = 0, length = data.enemy.length; i < length; i++){
        new EnemyClient(data.enemy[i]);  
    } 

    if(data.upgrade !== undefined){
        for(let i = 0, length = data.upgrade.length; i < length; i++){
            new UpgradeClient(data.upgrade[i]);  
        } 
    }

});


socket.on('update', function(data){
   for(let i = 0, length = data.player.length; i < length ; i++){
       let pack = data.player[i];
       let p:PlayerClient = PlayerClient.list[pack.id];
       if(p){
           if(pack.position !== undefined){
               p.position.x = pack.position.x;
               p.position.y = pack.position.y;
           } 

           if(pack.hp !== undefined){
               p.hp = pack.hp;
           }

           if(pack.weapon !== undefined){
            p.weapon = pack.weapon
            p.img = Img["player"+pack.weapon];
            p.imgMeleeAttack = Img["player" + pack.weapon + "meeleattack"];
            p.imgReload = Img["player" + pack.weapon + "reload"];
            }

           if(pack.attackMelee !== undefined){
            p.attackMelee = pack.attackMelee;
            }

           if(pack.moving !== undefined){
               p.moving = pack.moving;
           } 
           if(pack.aimAngle !== undefined){
               p.aimAngle = pack.aimAngle;
           } 

           if(pack.ammo !== undefined){
            p.ammo = pack.ammo;
            }
            
            if(pack.ammoInGun !== undefined){
                p.ammoInGun = pack.ammoInGun;
            } 

           if(pack.reload !== undefined){
               if(pack.reload){
                   p.reload = true;
               } else{
                   p.reload = false;
               }
            }

            if(pack.attackStarted !== undefined){
                if(pack.attackStarted){
                    if(p.reload) gameSoundManager.playWeaponReload(p.weapon);
                    gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                    p.attackStarted = true;
                    p.bodySpriteAnimCounter = 0;
                }
            }
           
       }
    }

    for(let i = 0, length = data.enemy.length; i < length ; i++){
        let pack = data.enemy[i];
        let p:EnemyClient = EnemyClient.list[pack.id];
        if(p){
            if(pack.position !== undefined){
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            } 
 
            if(pack.hp !== undefined){
                p.hp = pack.hp;
            }
 
            if(pack.weapon !== undefined){
             p.weapon = pack.weapon
             }
 
            if(pack.attackMelee !== undefined){
             p.attackMelee = pack.attackMelee;
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
 
             if(pack.attackStarted !== undefined){
                // console.log("Attack started " + pack.attackStarted);
                 if(pack.attackStarted){
                    if(p.reload) gameSoundManager.playWeaponReload(p.weapon);
                    gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                     p.attackStarted = true;
                     p.spriteAnimCounter = 0;
                 }
             }
            

        }
    }

    for(let i = 0, length = data.bullet.length; i < length ; i++){
        let pack = data.bullet[i];
        let b = BulletClient.list[pack.id];
        if(b){
            if(pack.position !== undefined){
                b.position.x = pack.position.x;
                b.position.y = pack.position.y;
            } 
        }
    }

    gui.draw();
    
});

socket.on('remove', function(data){
    for(let i = 0, length = data.player.length; i < length; i++){
        delete PlayerClient.list[data.player[i]];
        //soundManager.play('death');
    } 
    for(let i = 0, length = data.bullet.length; i < length; i++){
        if(BulletClient.list[data.bullet[i].id]){
             BulletClient.list[data.bullet[i].id].hit(data.bullet[i].hitCategory, data.bullet[i].hitEntityCategory,data.bullet[i].hitEntityId);
        }
        delete BulletClient.list[data.bullet[i].id];
    } 
    for(let i = 0, length = data.enemy.length; i < length; i++){
        gameSoundManager.playDeath(EnemyClient.list[data.enemy[i]].kind);
        delete EnemyClient.list[data.enemy[i]];
    } 
    
    for(let i = 0, length = data.upgrade.length; i < length; i++){
        delete UpgradeClient.list[data.upgrade[i]];
    } 
 });

setInterval(function(){
    if(!selfId){
        return;
    }
    
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    currentMap.draw();

    for(let i in PlayerClient.list){
        if(PlayerClient.list[i].moving){
            PlayerClient.list[i].walkSpriteAnimCounter += 1;
        }

        if(PlayerClient.list[i].attackStarted){
            if(PlayerClient.list[i].reload){
                if(PlayerClient.list[i].weapon == "pistol")
                    PlayerClient.list[i].bodySpriteAnimCounter += 1;
                else
                    PlayerClient.list[i].bodySpriteAnimCounter += 0.5;
            }
            else
                PlayerClient.list[i].bodySpriteAnimCounter += 1;
        }
        PlayerClient.list[i].draw();
    }
    
    for(let i in BulletClient.list){
        BulletClient.list[i].draw();
    }  

    for(let i in UpgradeClient.list){
        UpgradeClient.list[i].draw();
    }
    
    for(let i in EnemyClient.list){
        if(EnemyClient.list[i].moving || EnemyClient.list[i].attackStarted){
            if(EnemyClient.list[i].attackStarted){
                EnemyClient.list[i].spriteAnimCounter += 0.8;
            } else{
                EnemyClient.list[i].spriteAnimCounter += 0.4;
            }

        }
        EnemyClient.list[i].draw();
    }

    for(let i in ExplosionClient.list){
        ExplosionClient.list[i].spriteAnimCounter += 0.4;
    
        if(ExplosionClient.list[i].isCompleted()){
            delete ExplosionClient.list[i];
        }
        else{
            ExplosionClient.list[i].draw();
        } 
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
    else if(event.keyCode === 77){
        socket.emit('keyPress', {inputId:'map', state:true, map: currentMap.map.name});
    }
    else if(event.keyCode === 80){
        let elt = document.getElementById("gameDiv");
            console.log("Requesting fullscreen for", elt);
            if (elt.requestFullscreen) {
              elt.requestFullscreen();
            } else if (elt.msRequestFullscreen) {
              elt.msRequestFullscreen();
            } else if (elt.mozRequestFullScreen) {
              elt.mozRequestFullScreen();
            } else if (elt.webkitRequestFullscreen) {
              elt.webkitRequestFullscreen();
            } else {
                console.error("Fullscreen not available");
            }
        
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
   // console.log("Left click PRESSED");
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