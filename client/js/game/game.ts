import { PlayerClient } from './../Entities/PlayerClient';
import { Particle } from './../../../server/js/Effects/Particle/Particle';
import { ParticleClient } from './../Effects/ParticleClient';
import { UpgradeClient } from './../Entities/UpgradeClient';
import { BulletClient } from './../Entities/BulletClient';
import { GameSoundManager } from './../sound/GameSoundManager';
import { GUI } from './GUI';
import { Inventory } from "../../../server/js/Inventory/Inventory";
import { MapController } from "../../../server/js/Controllers/MapControler";
import { MapClient } from "./MapClient";
import { Filters } from '../Effects/Filters';
import { Effects } from '../Effects/Effects';
import { camera } from '../pregame/canvas';
import { SmokeClient } from '../Effects/SmokeClient';
import { EnemyClient } from '../Entities/EnemyClient';
import { ExplosionClient } from '../Entities/ExplosionClient';
import { Point } from '../../../server/js/GeometryAndPhysics';


declare var ctx;
declare const WIDTH;
declare var socket;
declare const HEIGHT;
declare const CAMERA_BOX_ADJUSTMENT: any;
declare var mouseX: any;
declare var mouseY: any;
declare var gui: GUI;

let enemyDrawList: string[] = [];

export var selfId: number = 0;
let smokeTest: boolean = false;

let frame = 0;
export let inventory = new Inventory(socket, false, 0);

MapController.loadMaps();
export let currentMap = new MapClient(null, "forest");


socket.on('updateInventory', function(items){
   inventory.items = items;
    inventory.refreshRender();
});

export let gameSoundManager = new GameSoundManager();

export let canvasFilters: Filters = new Filters(ctx);
export let effects: Effects = new Effects(ctx);

socket.on('mapData', function(data){
        MapController.createMap(data.name, 16,20);
        MapController.updateMap(data);
  //  if(currentMap.name == data.name){
        currentMap.reloadMap(MapController.getMap(data.name));
        camera.updateWorldSize(currentMap.map.width, currentMap.map.height);
        gui.createMinimap();
   // }
});

socket.on('init', function(data){
    if(data.selfId){
        selfId = data.selfId;
    }
   for(let i = 0, length = data.player.length; i < length; i++){
       new PlayerClient(data.player[i]);
   } 
   if(data.smoke !== undefined){
        for(let i = 0, length = data.smoke.length; i < length; i++){
            new SmokeClient(data.smoke[i]);
        }    
    }

   for(let i = 0, length = data.bullet.length; i < length; i++){
        let b = new BulletClient(data.bullet[i]);  
        b.hit(data.bullet[i].hitCategory, data.bullet[i].hitEntityCategory,data.bullet[i].hitEntityId);
    } 

    for(let i = 0, length = data.enemy.length; i < length; i++){
        new EnemyClient(data.enemy[i]);  
    } 

    if(data.upgrade !== undefined){
        for(let i = 0, length = data.upgrade.length; i < length; i++){
            new UpgradeClient(data.upgrade[i]);  
        } 
    }
/*
    if(data.particle !== undefined){
        for(let i = 0, length = data.particle.length; i < length; i++){
            new ParticleClient(data.particle[i]);  
        } 
    }*/

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

           if(pack.burn !== undefined){
            p.burn.create = pack.burn;
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
            //   p.aimAngle = pack.aimAngle;
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


            if(pack.pressingAttack !== undefined){
                console.log("Pressing attack " + pack.pressingAttack);
                if(p.weapon == "flamethrower" && !p.attackMelee){
                    p.flame.create = pack.pressingAttack;
                } else{
                    p.flame.create = false; 
                }
            }

            if(pack.attackStarted !== undefined){
                if(pack.attackStarted){
                    if(p.reload) gameSoundManager.playWeaponReload(p.weapon);
                    gameSoundManager.playWeaponAttack(p.weapon, p.attackMelee);
                    p.attackStarted = pack.attackStarted;
                    p.bodySpriteAnimCounter = 0;
                } 
            }
           
       }
    }
    if(data.enemy !== undefined){
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
    
                 if(pack.burn !== undefined){
                    p.burn.create = pack.burn;
                }
     
                if(pack.moving !== undefined){
                    p.moving = pack.moving;
                } 
                if(pack.aimAngle !== undefined){
                    p.aimAngle = pack.aimAngle;
                } 
     
                if(pack.pressingAttack !== undefined){
                    console.log("Pressing attack " + pack.pressingAttack);
                    if(p.weapon == "flamethrower" && !p.attackMelee){
                        p.flame.create = pack.pressingAttack;
                    } else{
                        p.flame.create = false; 
                    }
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
                         p.attackStarted = pack.attackStarted;
                         p.spriteAnimCounter = 0;
                     }
                 }
                
    
            }
        }
    }

/*
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
*/
    /*
    for(let i = 0, length = data.particle.length; i < length ; i++){
        let pack = data.particle[i];
        let p = ParticleClient.list[pack.id];
        if(p){
            if(pack.position !== undefined){
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            } 
        }
    }*/

    for(let i = 0, length = data.smoke.length; i < length ; i++){
        let pack = data.smoke[i];
        let s: SmokeClient = SmokeClient.list[pack.id];
        if(s){
            if(pack.radius !== undefined){
                //console.log("Radius "+ pack.radius);
                if(s.radius !== pack.radius){
                    s.radius = pack.radius;
                    s.updateRadius();
                }
            } 
        }
    }

    gui.draw();
    if(PlayerClient.list[selfId] !== undefined){ 
        camera.updatePosition(PlayerClient.list[selfId].position);
        let position: boolean = camera.isPositionNearEdge(PlayerClient.list[selfId].position);
        if(position) updateMouse();
    }


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

    for(let i = 0, length = data.particle.length; i < length; i++){
        delete ParticleClient.list[data.particle[i].id];
    } 

    for(let i = 0, length = data.smoke.length; i < length; i++){
        delete SmokeClient.list[data.smoke[i]];
    } 
 });

setInterval(function(){
    if(!selfId){
        return;
    }

    frame++;
    
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
        if(BulletClient.list[i].toRemove){
             delete BulletClient.list[i];
        } else{
            BulletClient.list[i].update();
        }
    }  

    for(let i in UpgradeClient.list){
        UpgradeClient.list[i].draw();
    }

    //for(let i in EnemyClient.list){
    for(let k in enemyDrawList){
        let i = enemyDrawList[k];

        if(EnemyClient.list[i] !== undefined){
            if(EnemyClient.list[i].moving || EnemyClient.list[i].attackStarted){
                if(EnemyClient.list[i].attackStarted){
                    EnemyClient.list[i].spriteAnimCounter += 0.8;
                } else{
                    EnemyClient.list[i].spriteAnimCounter += 0.4;
                }
    
            }
            EnemyClient.list[i].draw();
        }
        console.log("Enemy draw " +i);
    }

    for(let i in ExplosionClient.list){
        ExplosionClient.list[i].spriteAnimCounter += 0.4;
    
        if(ExplosionClient.list[i].isCompleted()){
            delete ExplosionClient.list[i];
        }
        else{
            ExplosionClient.list[i].draw();
        } 
    }/*
    ctx.globalCompositeOperation="lighter";
    for(let i in ParticleClient.list){
        ParticleClient.list[i].draw();
    }  
    ctx.globalCompositeOperation="source-over";
*/
    for(let i in PlayerClient.list){
        PlayerClient.list[i].flame.update();
        PlayerClient.list[i].flame.draw();
        PlayerClient.list[i].burn.update();
        PlayerClient.list[i].burn.draw();
    }

   // for(let i in EnemyClient.list){
    for(let k in enemyDrawList){
        let i = enemyDrawList[k];
        if(EnemyClient.list[i] !== undefined){
            EnemyClient.list[i].flame.update();
            EnemyClient.list[i].flame.draw();
            EnemyClient.list[i].burn.update();
            EnemyClient.list[i].burn.draw();
        }
    }
    /*
    effects.draw();
    effects.update();
*/
    for(let i in SmokeClient.list){
        SmokeClient.list[i].update();
        SmokeClient.list[i].draw();
    }
    console.log("FRAME " + frame % 40);
    if((frame % 40) == 0){
        console.log("UPDATE LIST");
        enemyDrawList = updateEnemyDrawList();
    }

}, 40);

let updateEnemyDrawList = () => {
    if(!selfId){
        return [];
    }
    let p: PlayerClient = PlayerClient.list[selfId];

    console.log("Wynik " + p.getEnemies(500))
    return p.getEnemies(1000);
}


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
        else if(event.keyCode === 53)  //5
        socket.emit('keyPress', {inputId:'5', state:true});
    else if(event.keyCode === 32){
        socket.emit('keyPress', {inputId:'space', state:true});
        return false;
    }
    else if(event.keyCode === 77){
        socket.emit('keyPress', {inputId:'map', state:true, map: currentMap.map.name});
    }
    
    if(event.keyCode === 107){
        canvasFilters.bAdjustment++;
    }
    
    if(event.keyCode === 109){
        canvasFilters.bAdjustment--;
    }
    
    if(event.keyCode === 79){
        if(smokeTest){
            for(let i in Particle.list){
                delete Particle.list[i];
            }
            smokeTest = false;
        } else{
            effects.initSmoke(60);
            smokeTest = true;
        }
        
    }
    
    if(event.keyCode === 38){
        if(smokeTest){
            effects.initSmoke(60);
        }
    }
    
    if(event.keyCode === 40){
        if(smokeTest){
            effects.decreaseSmoke(60);
        }
    }

    if(event.keyCode === 66){
        socket.emit('keyPress', {inputId:'smoke'});
    }
    

    if(event.keyCode === 80){
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
        //flameFire = true;
        socket.emit('keyPress', {inputId:'attack', state:true});
}

document.onmouseup = function(event){
    //flameFire = false;
    socket.emit('keyPress', {inputId:'attack', state:false});
}



document.onmousemove = function(event){
    if(selfId){
        let player: PlayerClient = PlayerClient.list[selfId];
        let position: Point = camera.getScreenPosition(player.position);
        let x =  event.clientX - 8 - position.x;
        let y =  event.clientY - 8 - position.y;
        
        mouseX = event.clientX;
        mouseY = event.clientY;
        
        let angle = Math.atan2(y,x)/Math.PI * 180;
        player.aimAngle = angle;
        socket.emit('keyPress', {inputId:'mouseAngle', state: angle});
    }   
}

let updateMouse = () => {
    if(selfId){
        let player: PlayerClient = PlayerClient.list[selfId];
        let position: Point = camera.getScreenPosition(player.position);
        let x =  mouseX - 8 - position.x;
        let y =  mouseY - 8 - position.y;
        
        let angle = Math.atan2(y,x)/Math.PI * 180;
        player.aimAngle = angle;
        socket.emit('keyPress', {inputId:'mouseAngle', state: angle});
    }  
}

/*
$(document).keydown(function(e) {
if (e.which == 32) {
    return false;
    }
});*/