import { Point } from "../../server/js/GeometryAndPhysics";
import { camera } from "./canvas";

declare const WIDTH;
declare const HEIGHT;

export class Particle {

    position: Point = new Point(0, 0);  // Set the initial x and y positions
    velocity: Point = new Point(0, 0);  // Set the initial velocity
    radius: number = 5;
    image;

    constructor(private ctx){
        let id = Math.random();
        Particle.list[id] = this;
    }

    draw = () => {   // The function to draw the particle on the canvas.
        
     // If an image is set draw it
        if(this.image){
            this.ctx.drawImage(this.image, this.position.x-128, this.position.y-128);         
            return;
        }

        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "rgba(0, 255, 255, 1)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    update = () => {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x >= WIDTH) {
            this.velocity.x = -this.velocity.x;
            this.position.x = WIDTH;
        }
        // Check if has crossed the left edge
        else if (this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.position.x = 0;
        }

        if (this.position.y >= HEIGHT) {
            this.velocity.y = -this.velocity.y;
            this.position.y = HEIGHT;
        }
        // Check if has crossed the up edge
        else if (this.position.y <= 0) {
            this.velocity.y = -this.velocity.y;
            this.position.y = 0;
        }

    }

    setImage = (image) =>{
        this.image = image;
    }

    static list = {};
}