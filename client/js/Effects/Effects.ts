import { Particle } from "./Particle";
import { Img } from "../images";



declare const WIDTH;
declare const HEIGHT;

export class Effects{
    
    maxVelocity: number = 2;

    constructor(private ctx){}

    initSmoke = (particleCount) => {
        for(var i=0; i < particleCount; ++i){
            let particle = new Particle(this.ctx);
            particle.position.updatePosition(this.generateRandom(0, WIDTH), this.generateRandom(0, HEIGHT));
            particle.velocity.updatePosition(this.generateRandom(-this.maxVelocity, this.maxVelocity), this.generateRandom(-this.maxVelocity, this.maxVelocity));
            particle.setImage(Img["smoke"]);
        }
    }

   decreaseSmoke = (particleCount) => {
    let count = 0;
    
    for(let i in Particle.list){
        if(count < particleCount){
            delete Particle.list[i];
        } else{
            return;
        }
        
        count++;
       }
   }
   generateRandom = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    draw = ()  => {    
        // Go through all of the particles and draw them.
        for(let i in Particle.list){
            Particle.list[i].draw();
        }
    }

    update = () => {
        for(let i in Particle.list){
            Particle.list[i].update();
            if(Particle.list[i].lifeTime <=0){
                delete Particle.list[i];
            }
        }
    }

}