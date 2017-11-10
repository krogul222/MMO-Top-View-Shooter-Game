Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./../canvas");
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const enums_1 = require("./../../../server/js/enums");
const PlayerClient_1 = require("../Entities/PlayerClient");
const game_1 = require("../game");
class ParticleClient {
    constructor(param) {
        this.id = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.maxLife = 0;
        this.life = 0;
        this.size = 15;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            if (this.type == enums_1.ParticleType.fire)
                this.drawFireParticle();
        };
        this.drawFireParticle = () => {
            ctx.fillStyle = "rgba(" + (260 - (this.life * 2)) + "," + ((this.life * 2) + 50) + "," + (this.life * 2) + "," + (((this.maxLife - this.life) / this.maxLife) * 0.4) + ")";
            ctx.beginPath();
            let pos = canvas_1.camera.getScreenPosition(this.position);
            ctx.arc(pos.x, pos.y, (this.maxLife - this.life) / this.maxLife * (this.size / 2) + (this.size / 2), 0, 2 * Math.PI);
            ctx.fill();
        };
        this.id = (param.id !== undefined) ? param.id : 0;
        this.type = (param.type !== undefined) ? param.type : enums_1.ParticleType.fire;
        this.map = (param.map !== undefined) ? param.map : 0;
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        this.maxLife = (param.maxLife !== undefined) ? param.maxLife : 60;
        this.life = (param.life !== undefined) ? param.life : 0;
        this.size = (param.size !== undefined) ? param.size : 0;
        ParticleClient.list[this.id] = this;
    }
}
ParticleClient.list = {};
exports.ParticleClient = ParticleClient;
//# sourceMappingURL=ParticleClient.js.map