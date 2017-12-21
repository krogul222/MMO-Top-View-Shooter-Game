import { MapObject } from './MapObject';
import { Point, Size } from './../../GeometryAndPhysics';
import { Orientation, CornerOrientation, getRandomInt, MapObjectType } from '../../enums';
import { MapTile } from '../MapTile';

export class FlatMountain extends MapObject{

    stripe: Point[] = [];

    constructor(mountainLength: number){
        super();

        this.stripe[0] = new Point(0,0);
        this.addObjectTile(this.stripe[0], MapObjectType.FM_L);

        if(mountainLength > 2){
            for(let i = 1, length = mountainLength-1; i < length; i++){
                this.stripe[i] = new Point(i,0);
                this.addObjectTile(this.stripe[i], MapObjectType.FM_M);
            }
        }
        this.stripe[mountainLength-1] = new Point(mountainLength-1,0);
        this.addObjectTile(this.stripe[mountainLength-1], MapObjectType.FM_R);  
    }

    isColliding = (mapTiles: MapTile[][], position: Point) =>{
        for(let i = 0; i < (this.stripe.length); i++){
            if(mapTiles[position.y][position.x+i].collisions){
                return true;
            }
        }
        return false;
    }

}