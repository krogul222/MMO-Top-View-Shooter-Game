import { camera } from './../pregame/canvas';
import { Point } from "../../../server/js/GeometryAndPhysics";

declare var ctx: any;

export class FireParticle{
    position: Point = new Point(0, 0);  // Set the initial x and y positions
    velocity: Point = new Point(0, 0);  // Set the initial velocity
    size: number = 15;
    life: number = 0;
    maxLife: number = 10;

    constructor(param){
        if(param.maxLife !== undefined)
            this.maxLife = param.maxLife;

        if(param.size !== undefined)
            this.size = param.size;
    }

    draw = () => {
        ctx.fillStyle = "rgba("+(260-(this.life*2))+","+((this.life*2)+50)+","+(this.life*2)+","+(((this.maxLife-this.life)/this.maxLife)*0.4)+")";
        ctx.beginPath();
        let pos = camera.getScreenPosition(this.position);
        ctx.arc(pos.x,pos.y,(this.maxLife-this.life)/this.maxLife*(this.size/2)+(this.size/2),0,2*Math.PI);
        ctx.fill();
    }

    update = () => {
        this.position.x += this.velocity.x;
        this.position.y+=this.velocity.y;
        this.life++;
    }
}