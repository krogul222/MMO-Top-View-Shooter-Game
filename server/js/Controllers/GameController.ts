import { Smoke } from './../Effects/Smoke';
import { Pack } from './../Pack';
import { Player } from './../Entities/Player';
import { MapController } from './MapControler';
import { Enemy } from '../Entities/Enemy';

export class GameController {
 
    id: number;
    name: string;
    monsterRespawn: boolean = true;
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
        if(param.name !== undefined){
            this.name = param.name;
        }
        //create map
        let mapsize = 16;
        let water = 10;
        let seeds = 20;

        if( param.mapsize !== undefined){
            mapsize = param.mapsize;
        }

        if( param.water !== undefined){
            water = param.water;
        }

        if( param.seeds !== undefined){
            seeds = param.seeds;
        }

        if( param.monstersrespawn !== undefined){
            this.monsterRespawn = param.monstersrespawn == 1 ? true : false;
            console.log("MONSTER "+this.monsterRespawn );
        }

        MapController.createMap(this.map, mapsize, seeds, water);
        MapController.updatePack.push(MapController.getMapPack(this.map));

        GameController.list[this.id] = this;
    }

    static remove = (id) => {

        let game: GameController = GameController.list[id];

        for(let i in game.players){
            if(game.players[i]){
                delete game.players[i];
                if(Player.list[i])
                    delete Player.list[i];
            }
        }

        for(let i in game.enemies){
            if(game.enemies[i]){
                delete game.enemies[i];
                if(Enemy.list[i])
                    delete Enemy.list[i];
            }
                
        }

        for(let i in game.smokes){
            if(game.smokes[i]){
                delete game.smokes[i];
                if(Smoke.list[i])
                    delete Smoke.list[i];
            }
        }

        delete GameController.list[id];

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