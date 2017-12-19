import { Point, Velocity, Acceleration } from './../GeometryAndPhysics';
import { GameController } from '../Controllers/GameController';
export class PhysicsEntity{

    private _id = Math.random();
    private _type;
    private collision;
    private _width: number;
    private _height: number;
    private _halfWidth: number;
    private _halfHeight: number; 
    private _position: Point;
    private _velocity: Velocity;
    private _acceleration: Acceleration;
    private _restitution: number;
    private _alive: boolean;
    private _moveable: boolean;
    
    private Collision = {
           // Elastic collisions refer to the simple cast where
           // two entities collide and a transfer of energy is
           // performed to calculate the resulting speed
           // We will follow Box2D's example of using
           // _restitution to represent "bounciness"
        
           elastic: function(_restitution) {
               this._restitution = _restitution || .2;
           },
        
           displace: function() {
               // While not supported in this engine
                  // the displacement collisions could include
               // friction to slow down entities as they slide
               // across the colliding entity
           }
       };

       
    constructor(param){
        // Setup the defaults if no parameters are given
        // Type represents the collision detector's handling
        this._type = (param.type !== undefined) ? param.type : PhysicsEntity.DYNAMIC;
    
        this._id = (param.id !== undefined) ? param.id : this._id;
        
        // Collision represents the type of collision
        // another object will receive upon colliding
        this.collision = (param.collisionName !== undefined) ? param.collisionName : PhysicsEntity.ELASTIC;

        // Take in a width and height
        this._width  = (param.width !== undefined) ? param.width : 20;
        this._height  = (param.height !== undefined) ? param.height : 20;

        //
        this._alive  = (param.alive !== undefined) ? param.alive : true;
        //
        this._moveable  = (param.moveable !== undefined) ? param.moveable : true;

        // Store a half size for quicker calculations
        this._halfWidth = this._width * .5;
        this._halfHeight = this._height * .5;

        let collision = this.Collision[this.collision];
        collision.call(this);
    
        // Position
        this._position = new Point(0,0);
     
        // Velocity
        this._velocity = new Velocity(0,0);
     
        // Acceleration
        this._acceleration = new Acceleration(0,0);
     
        // Update the bounds of the object to recalculate
        // the half sizes and any other pieces
        this.updateBounds();

        PhysicsEntity.fullList[this._id] = this;
    
        if(this.alive == true) PhysicsEntity.aliveList[this._id] = this;

        if(this.moveable == true) PhysicsEntity.moveableList[this._id] = this;

        if(param.game !== undefined){
            if(GameController.list[param.game] !== undefined){
                GameController.list[param.game].physicsEngine.addEntity(this);
            }
        }
    }

    // Update bounds includes the rect's
    // boundary updates
    updateBounds = () => {
        this._halfWidth = this._width * .5;
        this._halfHeight = this._height * .5;
    }

     // Getters for the mid point of the rect
     getMidX = () => {
        return this._halfWidth + this.position.x;
    }
 
    getMidY = () => {
        return this._halfHeight + this.position.y;
    }
 
    // Getters for the top, left, right, and bottom
    // of the rectangle
    getTop = () => {
        return this.position.y;
    }

    getLeft = () => {
        return this.position.x;
    }

    getRight = () => {
        return this.position.x + this._width;
    }

    getBottom = () => {
        return this.position.y + this._height;
    }

    get halfWidth() { return this._halfWidth }
    get halfHeight() { return this._halfHeight }
    get restitution () { return this._restitution; }
    get width() { return this.width; }
    get height() { return this.height; }
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    get type() { return this._type; }
    get alive() { return this._alive; }
    get moveable() { return this._moveable; }
    get id() { return this._id }

    // Constants
    
    // Engine Constants
    
    // These constants represent the 3 different types of
    // entities acting in this engine
    // These types are derived from Box2D's engine that
    // model the behaviors of its own entities/bodies
    
    // Kinematic entities are not affected by gravity, and
    // will not allow the solver to solve these elements
    static KINEMATIC = 'kinematic';

    // Dynamic entities will be completely changing and are
    // affected by all aspects of the physics system
    static DYNAMIC   = 'dynamic';

    // Solver Constants

    // These constants represent the different methods our
    // solver will take to resolve collisions

    // The displace resolution will only move an entity
    // outside of the space of the other and zero the
    // velocity in that direction
    static DISPLACE = 'displace';

    // The elastic resolution will displace and also bounce
    // the colliding entity off by reducing the velocity by
    // its restituion coefficient
    static ELASTIC = 'elastic';

    static fullList = {};

    static moveableList = {};

    static aliveList = {};
}