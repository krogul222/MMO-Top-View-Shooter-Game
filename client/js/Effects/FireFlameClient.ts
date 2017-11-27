import { Point } from './../../../server/js/GeometryAndPhysics';
import { Particle } from './Particle';
import { FireParticle } from './FireParticle';
declare var ctx: any;

export class FireFlameClient{

    particles: FireParticle[] = [];
    angle: number = 0;
    position: Point = new Point(0, 0);
    speed: number = 5; 
    create: boolean = false;
    burn: boolean = false;
    parent;

    constructor(parent, burn: boolean = false){
        this.parent = parent;
        this.position.x = parent.position.x;
        this.position.y = parent.position.y;
        this.angle = this.parent.aimAngle+180;
        this.burn = burn;
    }

    draw = () => {
        ctx.globalCompositeOperation="lighter";
        for(let i = 0 ; i < this.particles.length; i++){

            this.particles[i].draw();
        }
        ctx.globalCompositeOperation="source-over";
    }

    update = () => {
        if(this.create){
            for(let i = 0; i < 10; i++) {

                let p:FireParticle;

                if(this.burn){
                    p = new FireParticle({maxLife: 10, size: 7});
                } else{
                    p = new FireParticle({maxLife: 60});
                }
                
                //p.position.updatePosition(this.position.x, this.position.y);
                let oldpos : Point = new Point(this.parent.position.x, this.parent.position.y);
                let angle: number = this.parent.aimAngle+180;

                if(this.burn){
                    angle = Math.random()*360;
                } else{
                    oldpos.x -=  Math.cos((angle*Math.PI)/180)*50;
                    oldpos.y -=  Math.sin((angle*Math.PI)/180)*50
                }

;

           //     let pos = camera.getScreenPosition(oldpos);
    
                p.position.updatePosition(oldpos.x, oldpos.y);
                
                
                //console.log("Angle " + angle +" "+(angle*Math.PI*2)/360);
                let flame = (0-Math.random()*2*this.speed);
                p.velocity.x = Math.cos((angle*Math.PI*2)/360)*flame;
                p.velocity.y = Math.sin((angle*Math.PI*2)/360)*flame;
    
                angle += 90;
                flame = (Math.random()*2*this.speed-this.speed)/6;
    
                p.velocity.x += Math.cos((angle*Math.PI*2)/360)*flame;
                p.velocity.y += Math.sin((angle*Math.PI*2)/360)*flame;
    
                //p.velocity.updatePosition((Math.random()*2*this.speed-this.speed)/6, 0-Math.random()*2*this.speed)
                this.particles.push(p);
            }
    
        }

        for(let i = 0 ; i < this.particles.length; i++){
            this.particles[i].update();
            if (this.particles[i].life >= this.particles[i].maxLife) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }
}