import { GameMap } from './GameMap';

export class MapController {
    maps: GameMap[];

    getMap = (map) => { return this.maps[map]; }

    constructor(param) {}
}