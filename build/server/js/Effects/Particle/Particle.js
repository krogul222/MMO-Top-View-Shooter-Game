Object.defineProperty(exports, "__esModule", { value: true });
const GameController_1 = require("./../../Controllers/GameController");
const Player_1 = require("./../../Entities/Player");
const globalVariables_1 = require("./../../globalVariables");
const enums_1 = require("./../../enums");
const GeometryAndPhysics_1 = require("./../../GeometryAndPhysics");
const Enemy_1 = require("../../Entities/Enemy");
class Particle {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.velocity = new GeometryAndPhysics_1.Point(0, 0);
        this.size = 40;
        this.life = 0;
        this.maxLife = 10;
        this.toRemove = false;
        this.id = Math.random();
        this.combatType = 'player';
        this.update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.life++;
            if (this.life >= this.maxLife)
                this.toRemove = true;
            if (this.type == enums_1.ParticleType.fire) {
                switch (this.combatType) {
                    case 'player': {
                        let player = Player_1.Player.list[this.parent];
                        if (player !== undefined) {
                            let closeEnemies = player.getCloseEnemies();
                            for (let key in closeEnemies) {
                                let enemy = Enemy_1.Enemy.list[closeEnemies[key]];
                                if (enemy) {
                                    if (this.testCollision(enemy)) {
                                        enemy.lifeAndBodyController.wasHit(1 * this.life / this.maxLife);
                                        enemy.lifeAndBodyController.startBurn(100);
                                    }
                                }
                            }
                        }
                        if (GameController_1.GameController.list[this.game] !== undefined) {
                            let players = GameController_1.GameController.list[this.game].players;
                            for (let key in Player_1.Player.list) {
                                if (Player_1.Player.list[key].id !== this.parent) {
                                    let enemyPlayer = Player_1.Player.list[key];
                                    if (this.testCollision(enemyPlayer)) {
                                        enemyPlayer.lifeAndBodyController.wasHit(1 * this.life / this.maxLife);
                                        enemyPlayer.lifeAndBodyController.startBurn(100);
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case 'enemy': {
                        let enemy = Enemy_1.Enemy.list[this.parent];
                        if (GameController_1.GameController.list[this.game] !== undefined) {
                            let players = GameController_1.GameController.list[this.game].players;
                            for (let key in Player_1.Player.list) {
                                let player = Player_1.Player.list[key];
                                if (this.testCollision(player)) {
                                    player.lifeAndBodyController.wasHit(1 * this.life / this.maxLife);
                                    player.lifeAndBodyController.startBurn(100);
                                }
                            }
                        }
                        if (GameController_1.GameController.list[this.game] !== undefined) {
                            let enemies = GameController_1.GameController.list[this.game].enemies;
                            for (let key in enemies) {
                                if (enemies.id !== this.parent) {
                                    let enemy = enemies[key];
                                    if (this.testCollision(enemy)) {
                                        enemy.lifeAndBodyController.wasHit(1 * this.life / this.maxLife);
                                        enemy.lifeAndBodyController.startBurn(100);
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            }
        };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this.position.x - (this.size / 4), this.position.y - (this.size / 4));
            let pos2 = new GeometryAndPhysics_1.Point(entity.position.x - (entity.width / 4), entity.position.y - (entity.height / 4));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this.size / 2, this.size / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity.width / 2, entity.height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                map: GameController_1.GameController.list[this.game].map,
                size: this.size,
                type: this.type,
                maxLife: this.maxLife
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                life: this.life
            };
        };
        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.type = (param.type !== undefined) ? param.type : enums_1.ParticleType.fire;
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        if (param.velocity !== undefined) {
            this.velocity.x = param.velocity.x;
            this.velocity.y = param.velocity.y;
        }
        this.parent = param.parent ? param.parent : -1;
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.game = (param.game !== undefined) ? param.game : 0;
        Particle.list[this.id] = this;
    }
}
Particle.update = () => {
    let pack = [];
    for (let i in Particle.list) {
        let particle = Particle.list[i];
        particle.update();
        if (particle.toRemove) {
            delete Particle.list[i];
            globalVariables_1.removePack.particle.push({ id: particle.id });
        }
        else {
            pack.push(particle.getUpdatePack());
        }
    }
    return pack;
};
Particle.list = {};
exports.Particle = Particle;
//# sourceMappingURL=Particle.js.map