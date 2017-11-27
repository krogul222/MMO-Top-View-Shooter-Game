Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = require("../game/Camera");
const GUI_1 = require("../game/GUI");
gui = new GUI_1.GUI({ ctx: ctxui, width: WIDTH, height: HEIGHTUI });
exports.camera = new Camera_1.Camera(canvas, WIDTH, HEIGHT);
let resizeCanvas = function () {
    WIDTH = window.innerWidth - 4;
    HEIGHT = window.innerHeight - 48 - HEIGHTUI;
    exports.camera.resize(WIDTH, HEIGHT);
    canvasui.width = WIDTH;
    canvasui.height = HEIGHTUI;
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