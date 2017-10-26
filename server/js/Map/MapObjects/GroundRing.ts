import { MapObject } from './MapObject';
import { Point } from './../../GeometryAndPhysics';
import { Orientation, CornerOrientation, getRandomInt, MapObjectType } from '../../enums';

export class GroundRing extends MapObject{

    corners: Point[] = [];
    sidesU: Point[] = [];
    sidesD: Point[] = [];
    sidesL: Point[] = [];
    sidesR: Point[] = [];
    enter: Point;
    enterOrientation: Orientation;

    constructor(width: number, height: number, enterOrientation: Orientation){
        super();

        if(width > 2 && height > 2){
            this.corners[CornerOrientation.LU] = new Point(0, 0);
            this.addObjectTile(this.corners[CornerOrientation.LU], MapObjectType.GR_LU);

            this.corners[CornerOrientation.LD] = new Point(0,height-1);
            this.addObjectTile(this.corners[CornerOrientation.LD], MapObjectType.GR_LD);

            this.corners[CornerOrientation.RU] = new Point(width-1, 0);
            this.addObjectTile(this.corners[CornerOrientation.RU], MapObjectType.GR_RU);

            this.corners[CornerOrientation.RD] = new Point(width-1, height-1);
            this.addObjectTile(this.corners[CornerOrientation.RD], MapObjectType.GR_RD);

            for(let i = 0, length = width-2; i < length; i++){
                this.sidesU[i] = new Point(1+i,0);
                this.addObjectTile(this.sidesU[i], MapObjectType.GR_U);
                this.sidesD[i] = new Point(1+i,height-1);
                this.addObjectTile(this.sidesD[i], MapObjectType.GR_D);
            }
            
            for(let i = 0, length = height-2; i < length; i++){
                this.sidesL[i] = new Point(0,1+i);
                this.addObjectTile(this.sidesL[i], MapObjectType.GR_L);
                this.sidesR[i] = new Point(width-1,1+i);
                this.addObjectTile(this.sidesR[i], MapObjectType.GR_R);
            }            

            this.enterOrientation = enterOrientation;
            
            let x = getRandomInt(1, width-2)
            let y = getRandomInt(1, height-2);

            if(enterOrientation == Orientation.down){
                y = height -1;
            } else if(enterOrientation == Orientation.up){
                y = 0;
            }

            this.enter = new Point(x,y);

            if(enterOrientation == Orientation.down){
                this.addObjectTile(this.enter, MapObjectType.GR_ED);
            } else if(enterOrientation == Orientation.up){
                this.addObjectTile(this.enter, MapObjectType.GR_EU);
            }            

            
        }

    }

}