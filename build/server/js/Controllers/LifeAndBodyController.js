Object.defineProperty(exports, "__esModule", { value: true });
class LifeAndBodyController {
    constructor(parent, param) {
        this.parent = parent;
        this._hp = 30;
        this._hpMax = 30;
        this._burn = false;
        this._burnTime = 0;
        this.heal = (hp) => {
            this._hp = (this._hp + hp > this._hpMax) ? (this._hpMax) : (this._hp + hp);
            this._burnTime = 0;
        };
        this.startBurn = (time) => {
            this._burnTime = time;
        };
        this.update = () => {
            if (this._burnTime > 0) {
                this._burnTime--;
                this._burn = true;
                this.wasHit(this.hpMax / 1000);
            }
            else {
                this._burn = false;
            }
        };
        this.wasHit = (damage) => {
            this._hp = this._hp - damage;
            this._hp = (this._hp >= 0) ? this._hp : 0;
            if (this._hp == 0) {
                this.parent.onDeath();
                return true;
            }
            return false;
        };
        this.isDead = () => {
            if (this._hp <= 0) {
                return true;
            }
            else {
                return false;
            }
        };
        this.reset = () => {
            this._hp = this._hpMax;
        };
        this._hp = (param.hp) ? param.hp : this._hp;
        this._hpMax = this._hp;
    }
    get hp() { return this._hp; }
    get hpMax() { return this._hpMax; }
    get burn() { return this._burn; }
}
exports.LifeAndBodyController = LifeAndBodyController;
//# sourceMappingURL=LifeAndBodyController.js.map