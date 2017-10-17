import { MapTile } from './MapTile';
import { Point } from "./GeometryAndPhysics";

export class GameMap {

    mapTiles: MapTile[];

    constructor(private _name: string, private _width: number, private _height: number) {}

    isPositionWall = (position: Point) =>{

        if(position.x < 0 || position.x >= this.width)
            return 1;
        if(position.y < 0 || position.y >= this.height)
            return 1;
        
        return 0;    
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}