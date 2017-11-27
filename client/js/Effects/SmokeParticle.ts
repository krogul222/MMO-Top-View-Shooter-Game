import { camera } from './../pregame/canvas';
import { Point } from "../../../server/js/GeometryAndPhysics";

declare const WIDTH;
declare const HEIGHT;

export class SmokeParticle {

    position: Point = new Point(0, 0);  // Set the initial x and y positions
    velocity: Point = new Point(0, 0);  // Set the initial velocity
    center: Point = new Point(0, 0);
    radius: number = 5;
    maxRadius: number = 5;
    maxLifeTime: number = 0;
    lifeTime: number;
    image;

    constructor(private ctx, position: Point, radius: number, maxRadius: number , center: Point, time: number){
        let id = Math.random();
        this.position.x = position.x;
        this.position.y = position.y;
        this.center.x = center.x;
        this.center.y = center.y;
        this.radius = radius;
        this.maxRadius = maxRadius;
        SmokeParticle.list[id] = this;
        this.maxLifeTime = time;
        this.lifeTime = this.maxLifeTime;
    }

    draw = () => {   // The function to draw the particle on the canvas.
        
     // If an image is set draw it
        if(this.image){
            this.ctx.globalAlpha = this.lifeTime/this.maxLifeTime;
           // this.ctx.drawImage(this.image, this.position.x-128, this.position.y-128);  
            camera.drawSimpleImage(this.image, this.position.x, this.position.y);
            this.ctx.globalAlpha = 1.0;      
            return;
        }

        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    update = () => {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

      /*  console.log("Center: "+this.center.x + " "+ this.center.y);
        console.log("Position: "+this.position.x + " "+ this.position.y);
        console.log("Radius: "+this.radius);*/
        if (this.position.x >= this.center.x+this.radius) {
            this.velocity.x = -this.velocity.x;
            this.position.x = this.center.x+this.radius;
        }
        // Check if has crossed the left edge
        else if (this.position.x <= this.center.x-this.radius) {
            this.velocity.x = -this.velocity.x;
            this.position.x = this.center.x-this.radius;
        }

        if (this.position.y >= this.center.y+this.radius) {
            this.velocity.y = -this.velocity.y;
            this.position.y = this.center.y+this.radius;
        }
        // Check if has crossed the up edge
        else if (this.position.y <= this.center.y-this.radius) {
            this.velocity.y = -this.velocity.y;
            this.position.y = this.center.y-this.radius;
        }

        if(this.lifeTime > 0)
        this.lifeTime--;
    }

    setImage = (image) =>{
        this.image = image;
    }

    static list = {};
}