Object.defineProperty(exports, "__esModule", { value: true });
const GameController_1 = require("./../Controllers/GameController");
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const Enemy_1 = require("./Enemy");
const Player_1 = require("./Player");
const Entity_1 = require("./Entity");
const globalVariables_1 = require("../globalVariables");
const MapControler_1 = require("../Controllers/MapControler");
class Bullet extends Entity_1.Entity {
    constructor(param) {
        super(Bullet.updateParam(param));
        this.combatType = 'player';
        this.angle = 0;
        this.spdX = 1;
        this.spdY = 1;
        this.timer = 0;
        this.toRemove = false;
        this.hitCategory = 0;
        this.hitEntityCategory = "";
        this.hitEntityId = -1;
        this.update = () => {
            this.updatePosition();
            if (this.timer++ > 50)
                this.toRemove = true;
            switch (this.combatType) {
                case 'player': {
                    let player = Player_1.Player.list[this.parent];
                    let closeEnemies = player.getCloseEnemies();
                    for (let key in closeEnemies) {
                        let enemy = Enemy_1.Enemy.list[closeEnemies[key]];
                        if (this.testCollision(enemy)) {
                            this.toRemove = true;
                            enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                            this.setHitProperties(1, "enemy", enemy.id);
                            break;
                        }
                    }
                    if (GameController_1.GameController.list[this.game] !== undefined) {
                        let players = GameController_1.GameController.list[this.game].players;
                        for (let key in players) {
                            if (players[key].id !== this.parent) {
                                let enemyPlayer = players[key];
                                if (this.testCollision(enemyPlayer)) {
                                    this.toRemove = true;
                                    enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                                    this.setHitProperties(1, "player", enemyPlayer.id);
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
                        for (let key in players) {
                            let player = players[key];
                            if (this.testCollision(player)) {
                                this.toRemove = true;
                                this.setHitProperties(1, "player", player.id);
                                (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);
                            }
                        }
                    }
                    break;
                }
            }
            let map = MapControler_1.MapController.getMap(this.map);
            if (map.isPositionWall(this.position) > 2) {
                this.toRemove = true;
                this.hitCategory = 2;
            }
        };
        this.setHitProperties = (hitCategory, hitEntityCategory, hitEntityId) => {
            this.hitCategory = hitCategory;
            this.hitEntityCategory = hitEntityCategory;
            this.hitEntityId = hitEntityId;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                startPosition: this.startPosition,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                combatType: this.combatType,
                hitCategory: this.hitCategory,
                hitEntityCategory: this.hitEntityCategory,
                hitEntityId: this.hitEntityId
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                hitCategory: this.hitCategory
            };
        };
        this.startPosition = new GeometryAndPhysics_1.Point(this.position.x, this.position.y);
        this.mapController = new MapControler_1.MapController(null);
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.angle = param.angle ? param.angle : this.angle;
        if (param.shootspeed !== undefined) {
            this.spdX = param.shootspeed ? Math.cos(this.angle / 180 * Math.PI) * param.shootspeed : Math.cos(this.angle / 180 * Math.PI);
            this.spdY = param.shootspeed ? Math.sin(this.angle / 180 * Math.PI) * param.shootspeed : Math.sin(this.angle / 180 * Math.PI);
        }
        this.setSpdX(this.spdX);
        this.setSpdY(this.spdY);
        this.parent = param.parent ? param.parent : -1;
        Bullet.list[this.id] = this;
    }
    get isToRemove() { return this.toRemove; }
}
Bullet.update = () => {
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        if (bullet.toRemove) {
            globalVariables_1.initPack.bullet.push(bullet.getInitPack());
            GameController_1.GameController.list[bullet.game].initPack.bullet.push(bullet.getInitPack());
            delete Bullet.list[i];
        }
        else {
        }
    }
};
Bullet.getAllInitPack = function () {
    let bullets = [];
    for (let i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
};
Bullet.getAllSpecificInitPack = function (game) {
};
Bullet.updateParam = (param) => {
    param.id = Math.random();
    return param;
};
Bullet.list = {};
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map