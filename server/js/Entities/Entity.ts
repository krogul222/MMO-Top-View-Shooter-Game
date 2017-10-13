import { Point, Size, Velocity, Rectangle, testCollisionRectRect } from './../GeometryAndPhysics';
import { Pack } from '../Pack';
import { removePack, initPack } from '../globalVariables';

export class Entity {
    private _position: Point = new Point(250, 250);
    //private _size: Size = new Size(32, 32);
    private _width: number = 32;
    private _height: number = 32;
    private _speed: Velocity = new Velocity(0, 0);
    private _id: number = Math.random();
    private _map: string = "forest";
    private _type: string = "entity";
    private _img: string = "";

    constructor(param){
        if(param){
            this._position = param.position ? param.position : this._position;
            this._width = param.width ? param.width : this._width;
            this._height = param.height ? param.height : this._height;
            this._speed = param.speed ? param.speed : this._speed;
            this._id = param.id ? param.id : this._id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this._img = param.img ? param.img : this._img;
        }
    }

    updatePosition = () => this._position.changePosition(this._speed.x, this._speed.y);
    
    update = () => this.updatePosition();

    getDistance = (entity: Entity) => { 
        if(entity == null) return 10000000;
        return this._position.getDistance(entity.position);
    }

    testCollision = (entity: Entity) => {

        let pos1 = new Point(this._position.x - (this._width/4), this._position.y - (this._height/4));
        let pos2 = new Point(entity._position.x - (entity._width/4), entity._position.y - (entity._height/4));
        
        let rect1 = new Rectangle(pos1, new Size(this._width/2, this._height/2));
        let rect2 = new Rectangle(pos2, new Size(entity._width/2, entity._height/2));

        return testCollisionRectRect(rect1,rect2);
    }

    get type () { return this._type; }
    get position() { return this._position; }
    get width() { return this._width; }
    get height() { return this._height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    get id() { return this._id; }
    get img() { return this._img; }
    setSpdX = ( speedX ) => { this._speed.x = speedX;}
    setSpdY = ( speedY ) => { this._speed.y = speedY;}
    static getFrameUpdateData = () => {return {removePack: removePack, initPack: initPack};}

    setPosition(position: Point) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}