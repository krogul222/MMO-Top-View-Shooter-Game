Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = require("./../globalVariables");
const GameController_1 = require("../Controllers/GameController");
class Smoke {
    constructor(position, maxRadius, time, speed, gameId) {
        this.position = position;
        this.maxRadius = maxRadius;
        this.time = time;
        this.speed = speed;
        this.gameId = gameId;
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
                map: GameController_1.GameController.list[this.gameId].map,
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
        GameController_1.GameController.list[this.gameId].addSmoke(this);
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
Smoke.updateSpecific = (smokes) => {
    let pack = [];
    for (let i in smokes) {
        let smoke = smokes[i];
        smoke.update();
        if (smoke.time == 0) {
            delete Smoke.list[i];
            delete smokes[i];
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