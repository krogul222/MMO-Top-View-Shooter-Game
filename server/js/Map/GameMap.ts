import { MapTile } from './MapTile';
import { Point } from '../GeometryAndPhysics';


export class GameMap {

    mapTiles: MapTile[][];
    private _width: number=1280;
    private _height: number=1280;
    private _size: number = 1;

    constructor(private _name: string, mapTiles: MapTile[][]) {
        this.mapTiles = []
        this._size = mapTiles.length;
        for(let i = 0; i < mapTiles.length; i++){
            this.mapTiles[i] = mapTiles[i].slice();
            for(let j = 0; j < mapTiles[i].length; j++){
                this.mapTiles[i][j] = mapTiles[i][j];
            }
        }
        this._height = 8*32*this._size;
        this._width = 8*32*this._size;
    }

    isPositionWall = (position: Point) =>{

        if(position.x < 0 || position.x >= this.width)
            return 1;
        if(position.y < 0 || position.y >= this.height)
            return 1;
    
        let tileX = Math.floor(position.x/(8*32));
        let tileY = Math.floor(position.y/(8*32));
        
        let inTileX = position.x - tileX*8*32;
        let inTileY = position.y - tileY*8*32;

        console.log("X = "+tileX + "   Y = "+tileY);

        if(tileX < this._size && tileY < this._size )
            return this.mapTiles[tileY][tileX].isPositionWall(new Point(inTileX, inTileY));
        else {
            console.log("MAPTILE FAIL "+tileX+" "+tileY);
            return 0;
        }

      //  return 0;    
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get size() { return this._size; }
    get name() { return this._name; }
}