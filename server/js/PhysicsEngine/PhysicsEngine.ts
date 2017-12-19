import { PhysicsEntity } from './PhysicsEntity';
export class PhysicsEngine{
    
    moveableEntities = {};
    aliveEntities = {};
    allEntities = {};
    
    step = (elapsed: number) => {

        let entity: PhysicsEntity;
        let gx = 0;
        let gy = 0;

        for (let i in this.moveableEntities) {
            entity = this.moveableEntities[i];
            switch (entity.type) {
                case PhysicsEntity.DYNAMIC:
                    entity.velocity.x += entity.acceleration.x * elapsed + gx;
                    entity.velocity.y += entity.acceleration.y * elapsed + gy;
                    entity.velocity.x  += entity.velocity.x * elapsed;
                    entity.velocity.y  += entity.velocity.y * elapsed;
                    break;
                case PhysicsEntity.KINEMATIC:
                    entity.velocity.x += entity.acceleration.x * elapsed;
                    entity.velocity.y += entity.acceleration.y * elapsed;
                    entity.velocity.x  += entity.velocity.x * elapsed;
                    entity.velocity.y  += entity.velocity.y * elapsed;
                    break;
            }
        }
       /*  
        var collisions = this.collider.detectCollisions(
            this.player, 
            this.collidables
        );
     
        if (collisions != null) {
            this.solver.resolve(this.player, collisions);
        }
    */
    }
    
    detectCollisions = () => {

    }

    addEntity = (entity: PhysicsEntity) => {
        if(entity !== undefined){
            this.allEntities[entity.id] = entity;
            if(entity.moveable == true) this.moveableEntities[entity.id] = entity;
            if(entity.alive == true) this.aliveEntities[entity.id] = entity;
        }
    }
}