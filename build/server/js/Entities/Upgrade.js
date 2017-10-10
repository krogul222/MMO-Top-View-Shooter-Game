Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class Upgrade extends Entity_1.Entity {
    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = "";
        this.category = param.category;
    }
}
Upgrade.updateParam = (param) => {
    param.type = "upgrade";
    return param;
};
exports.Upgrade = Upgrade;
//# sourceMappingURL=Upgrade.js.map