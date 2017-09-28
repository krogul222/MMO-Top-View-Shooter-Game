import { Point } from './../../client/js/GeometryAndPhysics';
import { Actor } from './Entities';
import { Counter } from './../../client/js/Counter';
export class MovementController {
    pressingDown: boolean = false;
	pressingUp: boolean = false;
	pressingLeft: boolean = false;
	pressingRight: boolean = false;
    moving: boolean = false; 
    recoilCounter: Counter = new Counter(15);

    collisionBounds = {Up: -16, Down: 32, Left: -10, Right: 10};

    constructor (private parent: Actor, private maxSpdX: number = 10, private maxSpdY: number = 10) {}

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
            speedX = !this.pressingRight ? -this.maxSpdX : speedX;
        } else{
            speedX = this.pressingRight ? this.maxSpdX : speedX;
        } 

        if(map.isPositionWall(leftBumper)){
            speedX = !this.pressingLeft ? this.maxSpdX : speedX;
        } else{
            speedX = this.pressingLeft ? -this.maxSpdX : speedX;
        } 

        if(map.isPositionWall(downBumper)){
            speedY = !this.pressingDown ? -this.maxSpdY : speedY;
        } else{
            speedY = this.pressingDown ? this.maxSpdY : speedY;
        } 

        if(map.isPositionWall(upBumper)){
            speedY = !this.pressingUp ? this.maxSpdY : speedY;
        } else{
            speedY = this.pressingUp ? -this.maxSpdY : speedY;
        } 

        //Recoil implementation

        if (this.recoilCounter.isActive() && !this.recoilCounter.resetIfMax()){
            if(map.isPositionWall(downBumper) || map.isPositionWall(upBumper) || map.isPositionWall(leftBumper) || map.isPositionWall(rightBumper) ){
                this.recoilCounter.deactivate();
                this.recoilCounter.reset();
            } else{
                speedX = Math.cos((this.parent.aimAngle+180)/180*Math.PI) * this.maxSpdX*1.5*(15-this.recoilCounter.value)/15;
                speedY = Math.sin((this.parent.aimAngle+180)/180*Math.PI) * this.maxSpdX*1.5*(15-this.recoilCounter.value)/15;
            }
        } else {
            this.recoilCounter.deactivate();
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
} 
