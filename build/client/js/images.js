Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = {};
exports.Img.map = {};
exports.Img.guibackground = new Image();
exports.Img.guibackground.src = '/client/img/guibackground.jpg';
exports.Img.smoke = new Image();
exports.Img.smoke.src = '/client/img/smoke.png';
socket.on('jsonImages', function (data) {
    console.log(data.jsonGUI);
    console.log(data.jsonPlayer);
    exports.jsonPlayer = data.jsonPlayer;
    exports.jsonGUI = data.jsonGUI;
    exports.jsonIAE = data.jsonIAE;
    exports.jsonMap = data.jsonMap;
});
exports.Img.Player = new Image();
exports.Img.Player.src = '/client/TexturePacks/PlayerImages.png';
exports.Img.Map = new Image();
exports.Img.Map.src = '/client/TexturePacks/MapImages.png';
exports.Img.IAE = new Image();
exports.Img.IAE.src = '/client/TexturePacks/ItemsAndEnemiesImages.png';
exports.Img.GUI = new Image();
exports.Img.GUI.src = '/client/TexturePacks/GUIImages.png';
//# sourceMappingURL=images.js.map