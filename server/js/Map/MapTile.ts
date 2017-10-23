import { TerrainMaterial } from "../enums";

export class MapTile {

    public grid: any;
    public _material: TerrainMaterial;

    constructor(private _width: number, private _height: number, material: TerrainMaterial) {
        this._material = material;
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}