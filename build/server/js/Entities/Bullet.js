Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = require("./../MapControler");
const Enemy_1 = require("./Enemy");
const Player_1 = require("./Player");
const Entity_1 = require("./Entity");
const globalVariables_1 = require("../globalVariables");
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
            if (this.timer++ > 100)
                this.toRemove = true;
            switch (this.combatType) {
                case 'player': {
                    let player = Player_1.Player.list[this.parent];
                    for (let key in Enemy_1.Enemy.list) {
                        let enemy = Enemy_1.Enemy.list[key];
                        if (this.testCollision(enemy)) {
                            this.toRemove = true;
                            enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                            this.setHitProperties(1, "enemy", enemy.id);
                        }
                    }
                    for (let key in Player_1.Player.list) {
                        if (Player_1.Player.list[key].id !== this.parent) {
                            let enemyPlayer = Player_1.Player.list[key];
                            if (this.testCollision(enemyPlayer)) {
                                this.toRemove = true;
                                enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                                this.setHitProperties(1, "player", enemyPlayer.id);
                            }
                        }
                    }
                    break;
                }
                case 'enemy': {
                    let enemy = Enemy_1.Enemy.list[this.parent];
                    for (let key in Player_1.Player.list) {
                        let player = Player_1.Player.list[key];
                        if (this.testCollision(player)) {
                            this.toRemove = true;
                            this.setHitProperties(1, "player", player.id);
                            (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);
                        }
                    }
                    break;
                }
            }
            let map = this.mapController.getMap(this.map);
            if (map.isPositionWall(this.position) && map.isPositionWall(this.position) !== 2) {
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
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                combatType: this.combatType,
                hitCategory: this.hitCategory
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                hitCategory: this.hitCategory
            };
        };
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
        globalVariables_1.initPack.bullet.push(this.getInitPack());
        Bullet.list[this.id] = this;
    }
}
Bullet.update = () => {
    let pack = [];
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove) {
            delete Bullet.list[i];
            globalVariables_1.removePack.bullet.push({ id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId });
        }
        else {
            pack.push(bullet.getUpdatePack());
        }
    }
    return pack;
};
Bullet.getAllInitPack = function () {
    let bullets = [];
    for (let i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
};
Bullet.updateParam = (param) => {
    param.id = Math.random();
    return param;
};
Bullet.list = {};
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map