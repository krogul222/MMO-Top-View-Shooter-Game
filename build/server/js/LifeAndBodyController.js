Object.defineProperty(exports, "__esModule", { value: true });
class LifeAndBodyController {
    constructor(parent, param) {
        this.parent = parent;
        this._hp = 30;
        this._hpMax = 30;
        this.wasHit = (damage) => {
            this._hp = this._hp - damage;
            this._hp = (this._hp >= 0) ? this._hp : 0;
            if (this._hp == 0) {
                this.parent.onDeath();
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
}
exports.LifeAndBodyController = LifeAndBodyController;
//# sourceMappingURL=LifeAndBodyController.js.map