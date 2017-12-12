import { Pack } from './../Pack';
import { Player } from './../Entities/Player';
import { MapController } from './MapControler';
import { Enemy } from '../Entities/Enemy';

export class GameController {
 
    id: number;
    socketList = {};
    players = {};
    enemies = {};
    smokes = {};
    map: string = "forest";
    initPack = new Pack();
    removePack = new Pack();

    constructor(param){
        this.id = Math.random();
        this.map = this.id;
        //create map
        MapController.createMap(this.map, 16, 20);
        MapController.updatePack.push(MapController.getMapPack(this.map));

        GameController.list[this.id] = this;
    }

    addSocket = (socket) => {
        this.socketList[socket.id] = socket.id;
        console.log("SOCKET ADDED " + this.socketList[socket.id]);
    }
    
    addPlayer = (player) => {
        this.players[player.id] = player;
        console.log("PLAYER ADDED TO GAME");
    }

    addEnemy = (enemy) => {
        this.enemies[enemy.id] = enemy;
        console.log("Enemy ADDED TO GAME");
    }
    
    addSmoke = (smoke) => {
        this.smokes[smoke.id] = smoke;
        console.log("Enemy ADDED TO GAME");
    }
    

    static list = {};
}