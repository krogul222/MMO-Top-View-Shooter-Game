Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor(max, inc = 1, _value = 0, active = false) {
        this.max = max;
        this.inc = inc;
        this._value = _value;
        this.active = active;
        this.count = () => this._value += this.inc;
        this.resetIfMax = () => {
            if (this._value >= this.max && this.active) {
                this._value = 0;
                return true;
            }
            else {
                return false;
            }
        };
        this.setInc = (inc) => this.inc = inc;
        this.reset = () => this._value = 0;
        this.activate = () => {
            this.active = true;
            this._value = 0;
        };
        this.deactivate = () => this.active = false;
        this.isActive = () => { return this.active; };
    }
    get value() { return this._value; }
    ;
}
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map