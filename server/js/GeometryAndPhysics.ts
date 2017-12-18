import { Entity } from './Entities/Entity';
export let testCollisionRectRect = (rect1: Rectangle,rect2: Rectangle) => {
	return rect1.position.x <= rect2.position.x+rect2.size.width 
		&& rect2.position.x <= rect1.position.x+rect1.size.width
		&& rect1.position.y <= rect2.position.y + rect2.size.height
		&& rect2.position.y <= rect1.position.y + rect1.size.height;
}

export let calculateAngleBetweenEntities = (main: Entity, other: Entity) => {
    let x = main.position.x - other.position.x;
    let y = main.position.y - other.position.y;
    let angle = Math.atan2(y,x)/Math.PI * 180;
    angle = angle - 180;
    angle = (angle <0) ? (angle + 360) : angle;

    return angle;
}

export class Point {
    constructor(public x: number = 0, public y: number = 0) {}

    changePosition(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getDistance(point: Point) {
        let dx = this.x - point.x;
        let dy = this.y - point.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

export let getRandomInCircle = (position: Point, radius: number) => {

    let dist = (Math.random()*radius);

    let angle = Math.random()*360;

    let newPosition = new Point(position.x, position.y);

    newPosition.x += Math.ceil(Math.cos((angle/360)*2*Math.PI)*dist);
    newPosition.y += Math.ceil(Math.sin((angle/360)*2*Math.PI)*dist);

    return newPosition;
}

export class Size {
    constructor(public width: number = 0, public height: number = 0) {}
}

export class Rectangle {
    constructor(public position: Point, public size: Size) {}
}

export class Velocity {
    constructor(public x: number = 0, public y: number = 0) {}

    getSpeed = () => { return Math.sqrt(this.x*this.x + this.y*this.y); }
}

export class Acceleration {
    constructor(public x: number = 0, public y: number = 0) {}
}