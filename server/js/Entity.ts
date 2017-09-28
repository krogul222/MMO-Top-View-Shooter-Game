import { Rectangle, testCollisionRectRect } from './../../client/js/GeometryAndPhysics';
import { Velocity, Size, Point } from "../../client/js/GeometryAndPhysics";

let initPack = {player:[],bullet:[], enemy:[], upgrade:[]};
let removePack = {player:[],bullet:[], enemy:[], upgrade:[]};


export class Entity {
    private _position: Point = new Point(250, 250);
    private _size: Size = new Size(32, 32);
    private _speed: Velocity = new Velocity(0, 0);
    private id: number = -1;
    private _map: string = "forest";
    private _type: string = "entity";
    private img: string = "";

    constructor(param){
        if(param){
            this._position = param.position ? param.position : this._position;
            this._size = param.size ? param.size : this._size;
            this._speed = param.speed ? param.speed : this._speed;
            this._size = param.size ? param.size : this._size;
            this.id = param.id ? param.id : this.id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this.img = param.img ? param.img : this.img;
        }
    }

    updatePosition = () => this._position.changePosition(this._speed.x, this._speed.y);
    
    update = () => this.updatePosition();

    getDistance = (entity: Entity) => {return this._position.getDistance(entity.position);}

    testCollision = (entity: Entity) => {
        let pos1 = new Point(this._position.x + (this._size.width/2), this._position.y + (this._size.height/2));
        let pos2 = new Point(entity._position.x + (entity._size.width/2), entity._position.y + (entity._size.height/2));
        
        let rect1 = new Rectangle(pos1, new Size(this._size.width/2, this._size.height/2));
        let rect2 = new Rectangle(pos2, new Size(entity._size.width/2, entity._size.height/2));

        return testCollisionRectRect(rect1,rect2);
    }

    get type () { return this._type; }
    get position() { return this._position; }
    get width() { return this._size.width; }
    get height() { return this._size.height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    setSpdX = ( speedX ) => { this._speed.x = speedX;}
    setSpdY = ( speedY ) => { this._speed.y = speedY;}
    static getFrameUpdateData = () => {return {removePack: removePack, initPack: initPack};}
}