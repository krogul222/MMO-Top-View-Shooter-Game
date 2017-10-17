export class MapTile {

    public grid: any;
    
    constructor(private _name: string, private _width: number, private _height: number) {
        if(_name == "forest"){

        }
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}