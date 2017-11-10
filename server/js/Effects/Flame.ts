import { removePack } from './../globalVariables';
import { ParticleType } from './../enums';
import { Point, Velocity } from './../GeometryAndPhysics';
import { Particle } from './Particle/Particle';
import { Actor } from '../Entities/Actor';

export class Flame{

        id = Math.random();
        particles = {};
        angle: number = 0;
        position: Point = new Point(0, 0);
        speed: number = 3; 
        offset: number = 0;
        parent: Actor = null;
        life: number = 60;
        map;

        constructor(param){
    
            if(param.position !== undefined){
                this.position.x = param.position.x;
                this.position.y = param.position.y;
            }
    
            this.parent = (param.parent !== undefined) ? param.parent : null;
            this.angle = (param.angle !== undefined) ? param.angle : 0;
            this.offset = (param.offset !== undefined) ? param.offset : 0;
            this.life = (param.life !== undefined) ? param.life : 60;
            this.map = (param.map !== undefined) ? param.map : 0;

            Flame.list[this.id] = this;
        }
    

        update = (create: boolean) => {
            if(create){
                let angleInRad: number = 0;
                let posWithOffset: Point = new Point(0, 0); 

                for(let i = 0; i < 5; i++) {
                    
                    if(this.parent !== undefined){
                        angleInRad = ((this.parent.movementController.aimAngle+180)*Math.PI)/180;
                        posWithOffset.x = this.parent.position.x - Math.cos(angleInRad)*this.offset;
                        posWithOffset.y = this.parent.position.y - Math.sin(angleInRad)*this.offset;
                    } else{
                        angleInRad = (this.angle*Math.PI)/180;
                        posWithOffset.x = this.position.x-Math.cos(angleInRad)*this.offset;
                        posWithOffset.y = this.position.y-Math.sin(angleInRad)*this.offset;
                    }

                    let flame = (0-Math.random()*2*this.speed);
                    let velocity = new Point(0, 0);

                    velocity.x = Math.cos(angleInRad)*flame;
                    velocity.y = Math.sin(angleInRad)*flame;
        
                    angleInRad += Math.PI/2;
                    flame = (Math.random()*2*this.speed-this.speed)/6;
        
                    velocity.x += Math.cos(angleInRad)*flame;
                    velocity.y += Math.sin(angleInRad)*flame;

                    let p = new Particle({position: posWithOffset, velocity: velocity, maxLife: this.life, type: ParticleType.fire, map: this.map});
                    
                    this.particles[p.id] = p;
                }
        
            }

        }

        static list = {};
    }