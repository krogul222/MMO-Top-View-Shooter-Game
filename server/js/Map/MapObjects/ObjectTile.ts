import { Point } from "../../GeometryAndPhysics";
import { MapObjectType } from "../../enums";
import { TILE_SIZE } from "../../Constants";

export class ObjectTile {

    position: Point;
    type: MapObjectType;
    collisions: number[][];

    constructor(position: Point, type: MapObjectType){
        this.position = position;
        this.type = type;
        this.collisions = []
        for(let i = 0; i < TILE_SIZE; i++){
            this.collisions[i] = [];
            for(let j = 0; j < TILE_SIZE; j++){
                this.collisions[i][j] = 0;
            }
        }
    }
}