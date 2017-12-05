import { Player } from './../Entities/Player';
import { MapController } from './MapControler';


export class GameController{
 
    id: number;
    socketList = {};
    players = {};
    map: string = "forest";

    constructor(){
        this.id = Math.random();
        this.map = this.id;
        //create map
        MapController.createMap(this.map, 16, 20);
        MapController.updatePack.push(MapController.getMapPack(this.map));

        GameController.list[this.id] = this;
    }

    addSocket = (socket) => {
        this.socketList[socket.id] = socket;
    }
    
    addPlayer = (player) => {
        this.players[player.id] = player;
    }

    static list = {};
}