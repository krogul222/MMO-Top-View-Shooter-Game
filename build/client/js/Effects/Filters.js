Object.defineProperty(exports, "__esModule", { value: true });
class Filters {
    constructor(ctx) {
        this.ctx = ctx;
        this.bAdjustment = -50;
        this.getImageFromCanvas = () => {
            this.imageData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
            this.data = this.imageData.data;
        };
        this.invert = () => {
            for (var i = 0; i < this.data.length; i += 4) {
                this.data[i] = 255 - this.data[i];
                this.data[i + 1] = 255 - this.data[i + 1];
                this.data[i + 2] = 255 - this.data[i + 2];
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
        this.bright = () => {
            for (var i = 0; i < this.data.length; i += 4) {
                this.data[i] += this.bAdjustment;
                this.data[i + 1] += this.bAdjustment;
                this.data[i + 2] += this.bAdjustment;
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
        this.blur = () => {
            let r, g, b, a;
            for (var i = 0; i < this.data.length; i += 4) {
                r = 0;
                g = 0;
                b = 0;
                for (var j = -1; j < 2; j++) {
                    for (var k = -1; k < 2; k++) {
                        if ((i + j + k * WIDTH * 4) > 0 && (i + j + k * WIDTH * 4) < this.data.length) {
                            r += this.data[i + j + k * WIDTH * 4] / 9;
                            g += this.data[i + j + k * WIDTH * 4] / 9;
                            b += this.data[i + j + k * WIDTH * 4] / 9;
                        }
                    }
                }
                this.data[i] = r;
                this.data[i + 1] = g;
                this.data[i + 2] = b;
            }
            this.ctx.putImageData(this.imageData, 0, 0);
        };
    }
}
exports.Filters = Filters;
//# sourceMappingURL=Filters.js.map