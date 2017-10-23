Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("./../Inventory/Inventory");
const MapControler_1 = require("./../Controllers/MapControler");
const MovementController_1 = require("./../Controllers/MovementController");
const AttackControler_1 = require("./../Controllers/AttackControler");
const LifeAndBodyController_1 = require("./../Controllers/LifeAndBodyController");
const Entity_1 = require("./Entity");
const Player_1 = require("./Player");
const Enemy_1 = require("./Enemy");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class Actor extends Entity_1.Entity {
    constructor(param) {
        super(param);
        this.update = () => {
            this.movementController.updateSpd();
            this.attackController.update();
            this.updatePosition();
        };
        this.getClosestPlayer = (distance, angleLimit) => {
            let closestEnemyIndex = "0";
            let closestEnemyDistance = 100000;
            let pangle = this.movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            for (let i in Player_1.Player.list) {
                let enemy = Player_1.Player.list[i];
                if (enemy !== this) {
                    let angle = GeometryAndPhysics_1.calculateAngleBetweenEntities(this, enemy);
                    let maxDistance = Math.sqrt(enemy.width * enemy.width / 4 + enemy.height * enemy.height / 4) + distance;
                    let distanceFromEnemy = this.getDistance(enemy);
                    if (distanceFromEnemy < maxDistance) {
                        if ((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)) {
                            if (closestEnemyDistance > distanceFromEnemy) {
                                closestEnemyDistance = distanceFromEnemy;
                                closestEnemyIndex = i;
                            }
                        }
                    }
                }
            }
            if (closestEnemyIndex == "-1")
                return null;
            return Player_1.Player.list[closestEnemyIndex];
        };
        this.getClosestEnemy = (distance, angleLimit) => {
            let closestEnemyIndex = "-1";
            let closestEnemyDistance = 100000;
            let pangle = this.movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            for (let i in Enemy_1.Enemy.list) {
                let enemy = Enemy_1.Enemy.list[i];
                let angle = GeometryAndPhysics_1.calculateAngleBetweenEntities(this, enemy);
                let maxDistance = Math.sqrt(enemy.width * enemy.width / 4 + enemy.height * enemy.height / 4) + distance;
                let distanceFromEnemy = this.getDistance(enemy);
                if (distanceFromEnemy < maxDistance) {
                    if ((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)) {
                        if (closestEnemyDistance > distanceFromEnemy) {
                            closestEnemyDistance = distanceFromEnemy;
                            closestEnemyIndex = i;
                        }
                    }
                }
            }
            if (closestEnemyIndex == "-1")
                return null;
            return Enemy_1.Enemy.list[closestEnemyIndex];
        };
        this.getClosestPlayerorEnemy = (distance, angleLimit) => {
            let enemy = this.getClosestEnemy(distance, angleLimit);
            let player = this.getClosestPlayer(distance, angleLimit);
            if (this.getDistance(enemy) < this.getDistance(player)) {
                if (enemy !== null) {
                    return enemy;
                }
                else {
                    return null;
                }
            }
            else {
                if (player !== null) {
                    return player;
                }
                else {
                    return null;
                }
            }
        };
        this.onDeath = () => { };
        this.lifeAndBodyController = new LifeAndBodyController_1.LifeAndBodyController(this, param);
        this.attackController = new AttackControler_1.AttackController(this, param);
        this.movementController = new MovementController_1.MovementController(this, param);
        this.mapController = new MapControler_1.MapController(param);
        this.inventory = new Inventory_1.Inventory(param.socket, true, this);
    }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map