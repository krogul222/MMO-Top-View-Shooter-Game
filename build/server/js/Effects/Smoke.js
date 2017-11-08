Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = require("./../globalVariables");
class Smoke {
    constructor(position, maxRadius, time, speed, map) {
        this.position = position;
        this.maxRadius = maxRadius;
        this.time = time;
        this.speed = speed;
        this.map = map;
        this.id = Math.random();
        this.radius = 10;
        this.grow = true;
        this.update = () => {
            if (this.time > 0) {
                if (this.grow) {
                    if (this.radius >= this.maxRadius) {
                        this.grow = false;
                    }
                    this.radius += this.speed;
                }
                else {
                    if (this.time * this.speed - this.maxRadius <= 0 && this.radius > 0) {
                        this.radius -= this.speed;
                    }
                }
                this.time--;
            }
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                radius: this.radius,
                map: this.map,
                maxRadius: this.maxRadius,
                time: this.time
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                radius: this.radius
            };
        };
        Smoke.list[this.id] = this;
        globalVariables_1.initPack.smoke.push(this.getInitPack());
    }
}
Smoke.update = () => {
    let pack = [];
    for (let i in Smoke.list) {
        let smoke = Smoke.list[i];
        smoke.update();
        if (smoke.time == 0) {
            delete Smoke.list[i];
            globalVariables_1.removePack.smoke.push(smoke.id);
        }
        else {
            pack.push(smoke.getUpdatePack());
        }
    }
    return pack;
};
Smoke.list = {};
exports.Smoke = Smoke;
//# sourceMappingURL=Smoke.js.map