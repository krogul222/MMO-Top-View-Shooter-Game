import { PhysicsEntity } from './PhysicsEntity';
export class PhysicsEngine{
    static step = (elapsed: number) => {

        let entity: PhysicsEntity;
        let gx = 0;
        let gy = 0;

        for (let i in PhysicsEntity.list) {
            entity = PhysicsEntity.list[i];
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
         
        var collisions = this.collider.detectCollisions(
            this.player, 
            this.collidables
        );
     
        if (collisions != null) {
            this.solver.resolve(this.player, collisions);
        }
    
    }
}