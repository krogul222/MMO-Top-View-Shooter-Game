import { ObjectTile } from "./ObjectTile";
import { Point } from "../../GeometryAndPhysics";
import { MapObjectType } from "../../enums";

export class MapObject {

    objectTiles: ObjectTile[] = [];

    constructor(){}

    addObjectTile = (position: Point, type: MapObjectType) => {
        this.objectTiles.push(new ObjectTile(position, type));
    }
}