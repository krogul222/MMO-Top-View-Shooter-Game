import { PhysicsEntity } from './../PhysicsEngine/PhysicsEntity';
import { MAX_DISTANCE } from './../globalVariables';
import { Point, Size, Velocity, Rectangle, testCollisionRectRect } from './../GeometryAndPhysics';
import { Pack } from '../Pack';
import { removePack, initPack } from '../globalVariables';
import { GAME_SPEED_TOOLINGFACTOR } from '../Constants';

export class Entity {
    private _position: Point = new Point(250, 250);
    private _width: number = 32;
    private _height: number = 32;
    private _speed: Velocity = new Velocity(0, 0);
    private _id: number = Math.random();
    private _map: string = "forest";
    private _type: string = "entity";
    private _img: string = "";
    private _game: number = -1;
    private physicsEntity: PhysicsEntity;

    constructor(param){
        if(param){
            if(param.position !== undefined)  this._position = param.position; 
            if(param.width !== undefined)  this._width = param.width;
            if(param.height !== undefined)  this._height = param.height; 
            if(param.speed !== undefined)  this._speed = param.speed; 
            if(param.id !== undefined)  this._id = param.id; 
            if(param.map !== undefined)  this._map = param.map; 
            if(param.type !== undefined)  this._type = param.type; 
            if(param.img !== undefined)  this._img = param.img; 
            if(param.game !== undefined)  this._game = param.game; 

            this.physicsEntity = new PhysicsEntity({id: this.id, width: this.width/2, height: this.height/2});
        }
    }

    // add vector to current position
    updatePosition = () => this._position.changePosition(this._speed.x*GAME_SPEED_TOOLINGFACTOR, this._speed.y*GAME_SPEED_TOOLINGFACTOR);  
    
    update = () => this.updatePosition();

    getDistance = (entity: Entity) => { 
        if(entity == null) return MAX_DISTANCE;
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
    get game() { return this._game; }

    setSpdX = ( speedX ) => { this._speed.x = speedX;}
    setSpdY = ( speedY ) => { this._speed.y = speedY;}

    static getFrameUpdateData = () => {return {removePack: removePack, initPack: initPack};}

    setPosition(position: Point) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}