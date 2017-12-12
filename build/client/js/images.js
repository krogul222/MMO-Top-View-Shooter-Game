Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = {};
let gameDiv = document.getElementById("gameDiv");
let loadingDiv = document.getElementById("loadingDiv");
let loadingProgressDiv = document.getElementById("loadingProgressDiv");
let loadingProgressPercent = document.getElementById("loadingProgressPercent");
exports.Img.map = {};
exports.Img.guibackground = new Image();
exports.Img.guibackground.src = '/client/img/guibackground.jpg';
exports.Img.guibackground.onload = function () {
    imgLoaded();
};
exports.Img.smoke = new Image();
exports.Img.smoke.src = '/client/img/smoke.png';
exports.Img.smoke.onload = function () {
    imgLoaded();
};
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
exports.Img.Player.onload = function () {
    imgLoaded();
};
exports.Img.Map = new Image();
exports.Img.Map.src = '/client/TexturePacks/MapImages.png';
exports.Img.Map.onload = function () {
    imgLoaded();
};
exports.Img.IAE = new Image();
exports.Img.IAE.src = '/client/TexturePacks/ItemsAndEnemiesImages.png';
exports.Img.IAE.onload = function () {
    imgLoaded();
};
exports.Img.GUI = new Image();
exports.Img.GUI.src = '/client/TexturePacks/GUIImages.png';
exports.Img.GUI.onload = function () {
    imgLoaded();
};
function imgLoaded() {
    imagesLoaded++;
    console.log("Img loaded " + imagesLoaded);
    loadingProgressDiv.style.width = (imagesLoaded / ALL_IMAGES) * 100 + '%';
    loadingProgressPercent.textContent = Math.round((imagesLoaded / ALL_IMAGES) * 100) + '%';
    if (imagesLoaded == ALL_IMAGES) {
        gameDiv.style.display = 'inline-block';
        loadingDiv.style.display = 'none';
    }
}
//# sourceMappingURL=images.js.map