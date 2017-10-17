import { GameMap } from './GameMap';

export class MapController {
    maps: GameMap[] = [];

    getMap = (map) => { 
        for (let i = 0; i < this.maps.length; i++ ) {
            if(map == this.maps[i].name) {
                return this.maps[i]; 
            }
        }
        
    }

    constructor(param) {
        this.maps.push(new GameMap("forest", 1280, 1280));
    }
}