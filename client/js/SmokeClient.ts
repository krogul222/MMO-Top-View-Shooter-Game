import { PlayerClient } from './Entities/PlayerClient';
import { Point, getRandomInCircle } from "../../server/js/GeometryAndPhysics";
import { Particle } from "./Particle";
import { Img } from "./images";
import { getRandomInt } from "../../server/js/enums";
import { SmokeParticle } from "./SmokeParticle";
import { selfId } from './game';

declare var ctx: any;

export class SmokeClient {
    position: Point = new Point(0, 0);
    id: number = -1;
    radius: number = 10;
    maxRadius: number = 10;
    particles: SmokeParticle[] = [];
    map;
    time: number;

    constructor(initPack) {
        if(initPack.id) this.id = initPack.id;
        if(initPack.position) this.position = initPack.position;
        if(initPack.radius) this.radius = initPack.radius;
        if(initPack.maxRadius) this.maxRadius = initPack.maxRadius;
        if(initPack.map) this.map = initPack.map;
        if(initPack.time) this.time = initPack.time;

        for(var i=0; i < 50; ++i){
            let center: Point = new Point(this.position.x, this.position.y);
            this.particles[i] = new SmokeParticle(ctx, this.position, this.radius, this.maxRadius, center, this.time);

            let pos: Point = getRandomInCircle(this.position, this.radius);
            
            this.particles[i].position.x = pos.x;
            this.particles[i].position.y = pos.y;
            this.particles[i].velocity.updatePosition(Math.random()*6-3, Math.random()*6-3);
            this.particles[i].setImage(Img["smoke"]);

        //    console.log(this.particles[i].position.x + " "+this.particles[i].position.y);
         //   console.log(this.particles[i].velocity.x + " "+this.particles[i].velocity.y);
        }
        console.log("SMOKE");
        SmokeClient.list[this.id] = this;
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }

        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
        }
    }

    update = ( ) => {
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }
    updateRadius = () => {
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].radius = this.radius;
        }
    }

    static list = {};
}