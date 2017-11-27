Object.defineProperty(exports, "__esModule", { value: true });
const SmokeParticle_1 = require("./SmokeParticle");
const GeometryAndPhysics_1 = require("../../../server/js/GeometryAndPhysics");
const game_1 = require("../game/game");
const PlayerClient_1 = require("../Entities/PlayerClient");
const images_1 = require("../images");
class SmokeClient {
    constructor(initPack) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.id = -1;
        this.radius = 10;
        this.maxRadius = 10;
        this.particles = [];
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        };
        this.update = () => {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
            }
        };
        this.updateRadius = () => {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].radius = this.radius;
            }
        };
        if (initPack.id)
            this.id = initPack.id;
        if (initPack.position)
            this.position = initPack.position;
        if (initPack.radius)
            this.radius = initPack.radius;
        if (initPack.maxRadius)
            this.maxRadius = initPack.maxRadius;
        if (initPack.map)
            this.map = initPack.map;
        if (initPack.time)
            this.time = initPack.time;
        for (var i = 0; i < 50; ++i) {
            let center = new GeometryAndPhysics_1.Point(this.position.x, this.position.y);
            this.particles[i] = new SmokeParticle_1.SmokeParticle(ctx, this.position, this.radius, this.maxRadius, center, this.time);
            let pos = GeometryAndPhysics_1.getRandomInCircle(this.position, this.radius);
            this.particles[i].position.x = pos.x;
            this.particles[i].position.y = pos.y;
            this.particles[i].velocity.updatePosition(Math.random() * 6 - 3, Math.random() * 6 - 3);
            this.particles[i].setImage(images_1.Img["smoke"]);
        }
        console.log("SMOKE");
        SmokeClient.list[this.id] = this;
    }
}
SmokeClient.list = {};
exports.SmokeClient = SmokeClient;
//# sourceMappingURL=SmokeClient.js.map