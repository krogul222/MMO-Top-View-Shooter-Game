import { camera } from './../canvas';
import { Point } from './../../../server/js/GeometryAndPhysics';
import { ParticleType } from './../../../server/js/enums';
import { PlayerClient } from '../Entities/PlayerClient';
import { selfId } from '../game';

declare var ctx: any;

export class ParticleClient{

    id: number = 0;
    position: Point = new Point(0, 0);
    type: ParticleType;
    maxLife: number = 0;
    life: number = 0;
    size: number = 15;
    map;

    constructor(param){
        this.id = (param.id !== undefined) ? param.id : 0;
        this.type = (param.type !== undefined) ? param.type : ParticleType.fire;
        this.map = (param.map !== undefined) ? param.map : 0;
        if(param.position !== undefined){
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }

        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.life = (param.life !== undefined) ? param.life : 0;
        this.size = (param.size !== undefined) ? param.size : 0;

        ParticleClient.list[this.id] = this; 
    }

    draw = () => {
        if(PlayerClient.list[selfId].map !== this.map){
            return;  
        }
        
        if(this.type == ParticleType.fire) this.drawFireParticle();
    }

    drawFireParticle = () => {
        ctx.fillStyle = "rgba("+(260-(this.life*2))+","+((this.life*2)+50)+","+(this.life*2)+","+(((this.maxLife-this.life)/this.maxLife)*0.4)+")";
        ctx.beginPath();
        let pos = camera.getScreenPosition(this.position);
        ctx.arc(pos.x,pos.y,(this.maxLife-this.life)/this.maxLife*(this.size/2)+(this.size/2),0,2*Math.PI);
        ctx.fill();
    }

    static list = {};
}