Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = require("./MapControler");
const Counter_1 = require("./../Counter");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class MovementController {
    constructor(parent, param) {
        this.parent = parent;
        this._pressingDown = false;
        this._pressingUp = false;
        this._pressingLeft = false;
        this._pressingRight = false;
        this._moving = false;
        this._recoilCounter = new Counter_1.Counter(15);
        this.collisionBounds = { Up: -16, Down: 32, Left: -10, Right: 10 };
        this.updateSpd = () => {
            let map = MapControler_1.MapController.getMap(this.parent.map);
            let x = this.parent.position.x;
            let y = this.parent.position.y;
            let leftBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Left, y);
            let rightBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Right, y);
            let upBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Up);
            let downBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Down);
            let speedX = 0;
            let speedY = 0;
            if (map.isPositionWall(rightBumper) >= 2) {
                speedX = !this._pressingRight ? -this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingRight ? this._maxSpdX : speedX;
            }
            if (map.isPositionWall(leftBumper) >= 2) {
                speedX = !this._pressingLeft ? this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingLeft ? -this._maxSpdX : speedX;
            }
            if (map.isPositionWall(downBumper) >= 2) {
                speedY = !this._pressingDown ? -this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingDown ? this._maxSpdY : speedY;
            }
            if (map.isPositionWall(upBumper) >= 2) {
                speedY = !this._pressingUp ? this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingUp ? -this._maxSpdY : speedY;
            }
            if (this._recoilCounter.isActive() && !this._recoilCounter.resetIfMax()) {
                console.log("RECOIL");
                this._recoilCounter.count();
                if (map.isPositionWall(downBumper) || map.isPositionWall(upBumper) || map.isPositionWall(leftBumper) || map.isPositionWall(rightBumper)) {
                    this._recoilCounter.deactivate();
                    this._recoilCounter.reset();
                }
                else {
                    speedX = Math.cos((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                    speedY = Math.sin((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                }
            }
            else {
                this._recoilCounter.deactivate();
            }
            if (map.isPositionWall(this.parent.position) == 1) {
                speedX = speedX / 2;
                speedY = speedY / 2;
            }
            this.parent.setSpdX(speedX);
            this.parent.setSpdY(speedY);
            this.validatePosition();
        };
        this.validatePosition = () => {
            let map = MapControler_1.MapController.getMap(this.parent.map);
            this.parent.position.x = (this.parent.position.x < this.parent.width / 2) ? this.parent.width / 2 : this.parent.position.x;
            this.parent.position.x = (this.parent.position.x > map.width - this.parent.width / 2) ? map.width - this.parent.width / 2 : this.parent.position.x;
            this.parent.position.y = (this.parent.position.y < this.parent.height / 2) ? this.parent.height / 2 : this.parent.position.y;
            this.parent.position.y = (this.parent.position.y > map.height - this.parent.height / 2) ? map.height - this.parent.height / 2 : this.parent.position.y;
        };
        this._maxSpdX = (param.maxSpdX !== undefined) ? param.maxSpdX : 10;
        this._maxSpdY = (param.maxSpdY !== undefined) ? param.maxSpdY : 10;
    }
    get pressingLeft() { return this._pressingLeft; }
    get pressingRight() { return this._pressingRight; }
    get pressingUp() { return this._pressingUp; }
    get pressingDown() { return this._pressingDown; }
    set pressingLeft(value) { this._pressingLeft = value; }
    set pressingRight(value) { this._pressingRight = value; }
    set pressingUp(value) { this._pressingUp = value; }
    set pressingDown(value) { this._pressingDown = value; }
    get aimAngle() { return this._aimAngle; }
    get moving() {
        if (this._pressingLeft || this._pressingRight || this._pressingDown || this.pressingUp) {
            this._moving = true;
        }
        else {
            this._moving = false;
        }
        return this._moving;
    }
    get recoilCounter() { return this._recoilCounter; }
    get maxSpdX() { return this._maxSpdX; }
    get maxSpdY() { return this._maxSpdY; }
    set aimAngle(value) { this._aimAngle = value; }
}
exports.MovementController = MovementController;
//# sourceMappingURL=MovementController.js.map