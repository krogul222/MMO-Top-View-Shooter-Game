import { GameController } from './../Controllers/GameController';
import { Flame } from './../Effects/Flame';
import { Smoke } from './../Effects/Smoke';
import { initPack, removePack } from './../globalVariables';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { Actor } from "./Actor";
import { Point } from './../GeometryAndPhysics';
import { Pack } from '../Pack';
import { WeaponType, ItemType } from '../enums';
import { MapController } from '../Controllers/MapControler';
import { GameMap } from '../Map/GameMap';


export class Player extends Actor {
    private updatePack = {};
    private closeEnemiesArr: number[];
    private counter: number = 0;

    constructor(param) { 
        super(param);
        initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
        this.giveItems();

        if(Player.monsters){
            for(let i = 0 ; i <10; i++){
                Enemy.randomlyGenerate(this.map);
                Enemy.randomlyGenerate(this.map);
                Enemy.randomlyGenerate(this.map);
                Enemy.randomlyGenerate(this.map);
                }
                Player.monsters = false;
        }

    } 

    giveItems = () => {
        this.inventory.addItem(ItemType.knife,1);
        this.inventory.addItem(ItemType.pistol,1);
        this.inventory.addItem(ItemType.shotgun,1);
        this.inventory.addItem(ItemType.rifle,1);
        this.inventory.addItem(ItemType.flamethrower,1);
        this.attackController.weaponCollection.setWeaponAmmo(WeaponType.shotgun, 100);
        this.attackController.weaponCollection.setWeaponAmmo(WeaponType.pistol, 200);
        this.attackController.weaponCollection.setWeaponAmmo(WeaponType.rifle, 100);
        this.attackController.weaponCollection.setWeaponAmmo(WeaponType.flamethrower, 400);

        this.inventory.addItem(ItemType.medicalkit,4);  
        this.inventory.useItem(WeaponType.shotgun);
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
            weapon: this.attackController.activeWeapon.name,
            attackStarted: this.attackController.attackStarted,
            attackMelee: this.attackController.melee,
            ammo: this.attackController.activeWeapon.ammo,
            ammoInGun: this.attackController.activeWeapon.ammoInGun,
            burn: this.lifeAndBodyController.burn   
        };
    }

    extendedUpdate = () => {
        this.update();
        this.counter++;

        if(this.counter % 40){
            this.closeEnemiesArr = this.closeEnemies(800);
        }
    }

    getCloseEnemies = () => {
        return this.closeEnemiesArr;
    }

    getUpdatePack = () => {
        let attackStartedTmp = this.attackController.attackStarted;
        this.attackController.attackStarted = false;

        let newPack = {};
        
        this.updatePack['id'] = this.id;
        newPack['id'] = this.id;
        


        if(this.updatePack['position'] !== this.position){
            newPack['position'] = this.position;
            this.updatePack['position'] = new Point(this.position.x, this.position.y);
        }

        if(this.updatePack['hp'] !== this.lifeAndBodyController.hp){
            newPack['hp'] = this.lifeAndBodyController.hp;
            this.updatePack['hp'] = this.lifeAndBodyController.hp;
        }
        if(this.updatePack['moving'] !== this.movementController.moving){
            newPack['moving'] = this.movementController.moving;
            this.updatePack['moving'] = this.movementController.moving;
        }
        if(this.updatePack['aimAngle'] !== this.movementController.aimAngle){
            newPack['aimAngle'] = this.movementController.aimAngle;
            this.updatePack['aimAngle'] = this.movementController.aimAngle;
        }

        if(this.updatePack['attackStarted'] !== attackStartedTmp){
            newPack['attackStarted'] = attackStartedTmp;
            this.updatePack['attackStarted'] = attackStartedTmp;
        }

        if(this.updatePack['weapon'] !== this.attackController.activeWeapon.name){
            newPack['weapon'] = this.attackController.activeWeapon.name;
            this.updatePack['weapon'] = this.attackController.activeWeapon.name;
        }

        if(this.updatePack['attackMelee'] !== this.attackController.melee){
            newPack['attackMelee'] = this.attackController.melee;
            this.updatePack['attackMelee'] = this.attackController.melee;
        }

        if(this.updatePack['ammo'] !== this.attackController.activeWeapon.ammo){
            newPack['ammo'] = this.attackController.activeWeapon.ammo;
            this.updatePack['ammo'] = this.attackController.activeWeapon.ammo;
        }

        if(this.updatePack['ammoInGun'] !== this.attackController.activeWeapon.ammoInGun){
            newPack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
            this.updatePack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
        }

        if(this.updatePack['reload'] !== this.attackController.reloadCounter.isActive()){
            newPack['reload'] = this.attackController.reloadCounter.isActive();
            this.updatePack['reload'] = this.attackController.reloadCounter.isActive();
        }

        if(this.updatePack['pressingAttack'] !== this.attackController.pressingAttack){
            newPack['pressingAttack'] = this.attackController.pressingAttack;
            this.updatePack['pressingAttack'] = this.attackController.pressingAttack;
        }

        if(this.updatePack['burn'] !== this.lifeAndBodyController.burn){
            newPack['burn'] = this.lifeAndBodyController.burn;
            this.updatePack['burn'] = this.lifeAndBodyController.burn;
        }

        return newPack;
/*
        return {
            id: this.id,
            position: this.position,
            hp: this.lifeAndBodyController.hp,
            moving: this.movementController.moving,
            aimAngle: this.movementController.aimAngle,
            attackStarted: attackStartedTmp,
            weapon: this.attackController.activeWeapon.name,
            attackMelee: this.attackController.melee,
            ammo: this.attackController.activeWeapon.ammo,
            ammoInGun: this.attackController.activeWeapon.ammoInGun,
            reload: this.attackController.reloadCounter.isActive(),
            pressingAttack: this.attackController.pressingAttack,
            burn: this.lifeAndBodyController.burn   
        }*/
    }

    static onConnect = (socket, createdGame: boolean = false, gID: number = -1) => {

        let gameId: number = gID;
        console.log("Nowy SOCKET " + socket.id);


        let map = 'forest';

        if(createdGame == true) {
            let game = new GameController();
            game.addSocket(socket);
            gameId = game.id;
            map = game.map;
        } else{
            console.log("GAMEID "+gameId);
            let game: GameController = GameController.list[gameId];
            map = game.map;
        }

        let player:Player = new Player({
             id: socket.id,
             maxSpdX: 12,
             maxSpdY: 12,
             map: map,
             game: gameId,
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
            if(data.inputId == 'heal') player.inventory.useItem(ItemType.medicalkit);
            if(data.inputId == '1') player.attackController.weaponCollection.changeWeapon(WeaponType.knife);   
            if(data.inputId == '2') player.attackController.weaponCollection.changeWeapon(WeaponType.pistol); 
            if(data.inputId == '3') player.attackController.weaponCollection.changeWeapon(WeaponType.shotgun); 
            if(data.inputId == '4') player.attackController.weaponCollection.changeWeapon(WeaponType.rifle); 
            if(data.inputId == '5') player.attackController.weaponCollection.changeWeapon(WeaponType.flamethrower); 
            if(data.inputId == 'space') player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
            if(data.inputId == 'smoke') new Smoke(new Point(player.position.x -128,player.position.y -128), 150, 750, 20, player.map);
            if(data.inputId == 'map'){
                let gameMap : GameMap = MapController.getMap(data.map);
                MapController.createMap(data.map, gameMap.size, 20);
                MapController.updatePack.push(MapController.getMapPack(data.map));
                //socket.emit('mapData', MapController.getMapPack(data.map));
            } 
        });

        if(createdGame == false) {
            console.log("GAMEID "+gameId);
            let game: GameController = GameController.list[gameId];
            game.addPlayer(player);
            game.addSocket(socket);
            console.log("Socket in Player "+socket.id);
            socket.emit('init',{player: Player.getAllInitPack(),bullet:Bullet.getAllInitPack(),enemy:Enemy.getAllInitPack(),selfId:socket.id});
            socket.emit('mapData', MapController.getMapPack(game.map));
        } else {
            let game: GameController = GameController.list[gameId];
            game.addPlayer(player);
            console.log("Socket in Player "+socket.id);
            socket.emit('init',{player: Player.getAllInitPack(),bullet:Bullet.getAllInitPack(),enemy:Enemy.getAllInitPack(),selfId:socket.id});
            socket.emit('mapData', MapController.getMapPack(game.map));
        }
    }

    onDeath = () => {
        this.lifeAndBodyController.reset();

        let map = MapController.getMap(this.map);
        let x = Math.random() * map.width; 
        let y = Math.random() * map.height; 
        let position = new Point(x, y);

        while(map.isPositionWall(position)){
            x = Math.random() * map.width; 
            y = Math.random() * map.height; 
            position.updatePosition(x, y); 
        }

        this.setPosition(position); 
    }

    closeEnemies = (distance) => {
        let ids: number[] = [];
        let e: Enemy;
        for(let i in Enemy.list){
            e = Enemy.list[i];
            if(Math.abs(e.position.x - this.position.x) < distance && Math.abs(e.position.y - this.position.y) < distance){
                ids.push(e.id);
            }
        }

        return ids;
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
            player.extendedUpdate();
            pack.push(player.getUpdatePack());
        }
        return pack;
    }

    static monsters = true;

    static list = {};
}