Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = require("./../globalVariables");
const GameController_1 = require("./../Controllers/GameController");
const Inventory_1 = require("./../Inventory/Inventory");
const MapControler_1 = require("./../Controllers/MapControler");
const MovementController_1 = require("./../Controllers/MovementController");
const AttackControler_1 = require("./../Controllers/AttackControler");
const LifeAndBodyController_1 = require("./../Controllers/LifeAndBodyController");
const Entity_1 = require("./Entity");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class Actor extends Entity_1.Entity {
    constructor(param) {
        super(param);
        this.score = 1;
        this.update = () => {
            this._movementController.updateSpd();
            this._attackController.update();
            this._lifeAndBodyController.update();
            this.updatePosition();
        };
        this.getScore = () => {
            let score = this.score;
            this.score = 0;
            return score;
        };
        this.getClosestPlayer = (distance, angleLimit) => {
            let closestEnemyIndex = "0";
            let closestEnemyDistance = globalVariables_1.MAX_DISTANCE;
            let pangle = this._movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            let players = GameController_1.GameController.list[this.game].players;
            for (let i in players) {
                let enemy = players[i];
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
            return players[closestEnemyIndex];
        };
        this.getClosestEnemy = (distance, angleLimit) => {
            let closestEnemyIndex = "-1";
            let closestEnemyDistance = globalVariables_1.MAX_DISTANCE;
            let pangle = this._movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            let enemies = GameController_1.GameController.list[this.game].enemies;
            for (let i in enemies) {
                let enemy = enemies[i];
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
            return enemies[closestEnemyIndex];
        };
        this.getClosestPlayerorEnemy = (distance, angleLimit) => {
            let enemy = this.getClosestEnemy(distance, angleLimit);
            let player = this.getClosestPlayer(distance, angleLimit);
            if (this.getDistance(enemy) < this.getDistance(player)) {
                if (enemy !== undefined)
                    return enemy;
                else
                    return null;
            }
            else {
                if (player !== undefined)
                    return player;
                else
                    return null;
            }
        };
        this.onDeath = () => { };
        this._lifeAndBodyController = new LifeAndBodyController_1.LifeAndBodyController(this, param);
        this._attackController = new AttackControler_1.AttackController(this, param);
        this._movementController = new MovementController_1.MovementController(this, param);
        this._mapController = new MapControler_1.MapController(param);
        this._inventory = new Inventory_1.Inventory(param.socket, true, this);
    }
    get lifeAndBodyController() { return this._lifeAndBodyController; }
    get attackController() { return this._attackController; }
    get movementController() { return this._movementController; }
    get mapController() { return this._mapController; }
    get inventory() { return this._inventory; }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map