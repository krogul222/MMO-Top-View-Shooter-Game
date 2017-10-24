import { Point } from './../GeometryAndPhysics';
import { TerrainMaterial } from "../enums";

export class MapTile {

    public grid: number[][];
    private _material: TerrainMaterial;

    constructor(private _width: number, private _height: number, material: TerrainMaterial) {
        this._material = material;
        this.grid = [];
        for(let i = 0; i < this._height; i++){
            this.grid[i] = [];
            for(let j = 0; j < this._width; j++){
                this.grid[i][j] = (material != TerrainMaterial.water) ? 0 : 2;
            }
        }
    }

    updateMaterial = (material) => {
        this._material = material;
    }

    isPositionWall = (position: Point) => {
        let areaX = Math.floor(position.x/32);
        let areaY = Math.floor(position.y/32);
        console.log("AX = "+areaX + "   areaY = "+areaY);
        if(areaX < this._width && areaY < this._height){
            console.log(this.grid[areaY][areaX]);
            return this.grid[areaY][areaX];
           // return 0;
        }
        else{
            console.log("MAPTILE FAIL "+areaX+" "+areaY);
            return 0;
        }
            
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}