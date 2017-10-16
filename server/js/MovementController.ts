import { Actor } from './Entities/Actor';
import { Counter } from './Counter';
import { Point } from './GeometryAndPhysics';
export class MovementController {
    private _pressingDown: boolean = false;
	private _pressingUp: boolean = false;
	private _pressingLeft: boolean = false;
	private _pressingRight: boolean = false;
    private _moving: boolean = false; 
    private _aimAngle: number;
    private _recoilCounter: Counter = new Counter(15);
    private _maxSpdX: number;
    private _maxSpdY: number;

    collisionBounds = {Up: -16, Down: 32, Left: -10, Right: 10};

    constructor (private parent: Actor, param) {
        this._maxSpdX = param.maxSpdX ? param.maxSpdX : 10;
        this._maxSpdY = param.maxSpdY ? param.maxSpdY : 10;
    }

    updateSpd = () => {
        let map = this.parent.mapController.getMap(this.parent.map);
        let x = this.parent.position.x;
        let y = this.parent.position.y;

        // Collision points for parent

		let leftBumper = new Point(x + this.collisionBounds.Left, y);
		let rightBumper = new Point(x + this.collisionBounds.Right, y);
		let upBumper = new Point(x, y + this.collisionBounds.Up);
		let downBumper = new Point(x, y + this.collisionBounds.Down);

        let speedX = 0;
        let speedY = 0;

        // Collisions implementation

        if(map.isPositionWall(rightBumper)){
            speedX = !this._pressingRight ? -this._maxSpdX : speedX;
        } else{
            speedX = this._pressingRight ? this._maxSpdX : speedX;
        } 

        if(map.isPositionWall(leftBumper)){
            speedX = !this._pressingLeft ? this._maxSpdX : speedX;
        } else{
            speedX = this._pressingLeft ? -this._maxSpdX : speedX;
        } 

        if(map.isPositionWall(downBumper)){
            speedY = !this._pressingDown ? -this._maxSpdY : speedY;
        } else{
            speedY = this._pressingDown ? this._maxSpdY : speedY;
        } 

        if(map.isPositionWall(upBumper)){
            speedY = !this._pressingUp ? this._maxSpdY : speedY;
        } else{
            speedY = this._pressingUp ? -this._maxSpdY : speedY;
        } 

        //Recoil implementation

        if (this._recoilCounter.isActive() && !this._recoilCounter.resetIfMax()){
            console.log("RECOIL");
            this._recoilCounter.count();
            if(map.isPositionWall(downBumper) || map.isPositionWall(upBumper) || map.isPositionWall(leftBumper) || map.isPositionWall(rightBumper) ){
                this._recoilCounter.deactivate();
                this._recoilCounter.reset();
            } else{
                speedX = Math.cos((this._aimAngle+180)/180*Math.PI) * this._maxSpdX*1.5*(15-this._recoilCounter.value)/15;
                speedY = Math.sin((this._aimAngle+180)/180*Math.PI) * this._maxSpdX*1.5*(15-this._recoilCounter.value)/15;
            }
        } else {
            this._recoilCounter.deactivate();
        }

        // Update speed

        this.parent.setSpdX(speedX);
        this.parent.setSpdY(speedY);

        // Cannot exceed map

        this.validatePosition();

    }

    validatePosition = () => {

        let map = this.parent.mapController.getMap(this.parent.map);

        this.parent.position.x = (this.parent.position.x < this.parent.width/2) ? this.parent.width/2 : this.parent.position.x;
        this.parent.position.x = (this.parent.position.x > map.width-this.parent.width/2) ? map.width-this.parent.width/2 : this.parent.position.x;

        this.parent.position.y = (this.parent.position.y < this.parent.height/2) ? this.parent.height/2 : this.parent.position.y;
        this.parent.position.y = (this.parent.position.y > map.height-this.parent.height/2) ? map.height-this.parent.height/2 : this.parent.position.y;
    }

    get pressingLeft() { return this._pressingLeft; }
    get pressingRight() { return this._pressingRight; }
    get pressingUp() { return this._pressingUp; }
    get pressingDown() { return this._pressingDown; }

    set pressingLeft(value: boolean) { this._pressingLeft = value; }
    set pressingRight(value: boolean) { this._pressingRight = value; }
    set pressingUp(value: boolean) { this._pressingUp = value; }
    set pressingDown(value: boolean) { this._pressingDown = value; }

    get aimAngle() { return this._aimAngle; }
    get moving() { if(this._pressingLeft || this._pressingRight || this._pressingDown || this.pressingUp) {
        this._moving = true;
        } else {
            this._moving = false;
        }
        return this._moving; 
    }
    get recoilCounter() { return this._recoilCounter; }
    get maxSpdX() { return this._maxSpdX; }
    get maxSpdY() { return this._maxSpdY; }

    set aimAngle(value: number) { this._aimAngle = value; }
} 
