Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("./../Inventory");
const LifeAndBodyController_1 = require("./../LifeAndBodyController");
const MapControler_1 = require("./../MapControler");
const Entity_1 = require("./Entity");
const Player_1 = require("./Player");
const Enemy_1 = require("./Enemy");
const AttackControler_1 = require("../AttackControler");
const MovementController_1 = require("../MovementController");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class Actor extends Entity_1.Entity {
    constructor(param) {
        super(param);
        this.update = () => {
            this.movementController.updateSpd();
            this.attackController.update();
            this.updatePosition();
        };
        this.getClosestPlayer = () => {
            let distance = 10000;
            let index = "0";
            for (let i in Player_1.Player.list) {
                if (distance > this.getDistance(Player_1.Player.list[i])) {
                    distance = this.getDistance(Player_1.Player.list[i]);
                    index = i;
                }
            }
            return Player_1.Player.list[index];
        };
        this.getClosestEnemy = (distance, angleLimit) => {
            let closestEnemyIndex = "0";
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
            return Enemy_1.Enemy.list[closestEnemyIndex];
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