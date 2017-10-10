import { Point } from "./GeometryAndPhysics";

export class GameMap {

    constructor(private _name: string, private _width: number, private _height: number) {}

    isPositionWall = (position: Point) =>{
        return 2;    
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}