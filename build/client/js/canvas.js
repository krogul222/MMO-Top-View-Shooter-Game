Object.defineProperty(exports, "__esModule", { value: true });
const GUI_1 = require("./GUI");
gui = new GUI_1.GUI({ ctx: ctxui, width: WIDTH, height: HEIGHTUI });
let resizeCanvas = function () {
    WIDTH = window.innerWidth - 4;
    HEIGHT = window.innerHeight - 48 - HEIGHTUI;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasui.width = WIDTH;
    canvasui.height = HEIGHTUI;
    ctx.font = '30px Arial';
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctxui.font = '30px Arial';
    ctxui.mozImageSmoothingEnabled = false;
    ctxui.msImageSmoothingEnabled = false;
    ctxui.imageSmoothingEnabled = false;
    gui.resize(canvasui.width, canvasui.height);
    gui.draw();
};
resizeCanvas();
window.addEventListener('resize', function () {
    resizeCanvas();
});
//# sourceMappingURL=canvas.js.map