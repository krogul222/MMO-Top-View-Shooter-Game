import { initPack, removePack } from './../globalVariables';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { Actor } from "./Actor";
import { Point } from './../GeometryAndPhysics';
import { Pack } from '../Pack';

export class Player extends Actor {

    constructor(param) { 
        super(param);
        initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
    } 

    getInitPack = () => {
        return {
            id: this.id,
            position: this.position,
            hp: this.lifeAndBodyController.hp,
            hpMax: this.lifeAndBodyController.hpMax,
            map: this.map,
            width: this.width,
            height: this.height,
            moving: this.movementController.moving,
            aimAngle: this.movementController.aimAngle,
            weapon: this.attackController.activeWeapon.weapon,
            attackStarted: this.attackController.attackStarted,
            attackMelee: this.attackController.melee,
            ammo: this.attackController.activeWeapon.ammo,
            ammoInGun: this.attackController.activeWeapon.ammoInGun
        };
    }

    getUpdatePack = () => {
        let attackStartedTmp = this.attackController.attackStarted;
        this.attackController.attackStarted = false;

        return {
            id: this.id,
            position: this.position,
            hp: this.lifeAndBodyController.hp,
            moving: this.movementController.moving,
            aimAngle: this.movementController.aimAngle,
            attackStarted: attackStartedTmp,
            weapon: this.attackController.activeWeapon.weapon,
            attackMelee: this.attackController.melee,
            ammo: this.attackController.activeWeapon.ammo,
            ammoInGun: this.attackController.activeWeapon.ammoInGun,
            reload: this.attackController.reloadCounter.isActive()
        }
    }

    static onConnect = (socket) => {
        let map = 'forest';
        let player = new Player({
             id: socket.id,
             maxSpdX: 12,
             maxSpdY: 12,
             map: map,
             img: 'player',
             atkSpd: 7,
             width: 50, 
             height: 50, 
             type: "player", 
             hp: 40, 
             socket: socket});

        socket.on('changeWeapon', function(data){
            if(data.state == 'next') { player.attackController.weaponCollection.chooseNextWeaponWithAmmo() }
            if(data.state == 'prev') { player.attackController.weaponCollection.choosePrevWeaponWithAmmo() }
        });

        socket.on('keyPress', function(data){
            if(data.inputId == 'left') player.movementController.pressingLeft = data.state;
            if(data.inputId == 'right') player.movementController.pressingRight = data.state;
            if(data.inputId == 'up') player.movementController.pressingUp = data.state;
            if(data.inputId == 'down') player.movementController.pressingDown = data.state;

            if(data.inputId == 'attack') player.attackController.pressingAttack = data.state;
            if(data.inputId == 'mouseAngle') player.movementController.aimAngle = data.state;
        });

        socket.emit('init',{player: Player.getAllInitPack(),bullet:Bullet.getAllInitPack(),enemy:Enemy.getAllInitPack(),selfId:socket.id});
        
    }

    onDeath = () => {
        this.lifeAndBodyController.reset();

        let map = this.mapController.getMap(this.map);
        let x = Math.random() * map.width; 
        let y = Math.random() * map.height; 
        let position = new Point(x, y);

        while(map.isPositionWall(position)){
            x = Math.random() * map.width; 
            y = Math.random() * map.height; 
            position.changePosition(x, y); 
        }

        this.setPosition(position); 
    }

    static getAllInitPack = () => {
        let players: any[] = [];
        for(let i in Player.list) { players.push(Player.list[i].getInitPack()); }
        return players;
    }

    static onDisconnect = (socket) => {
        delete Player.list[socket.id];
        removePack.player.push(socket.id);
    }

    static update = () => {
        let pack: any[] =[];
        for(let i in Player.list){
            let player = Player.list[i];
            player.update();
            pack.push(player.getUpdatePack());
        }
        return pack;
    }

    static list = {};
}