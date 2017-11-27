export var jsonPlayer; 
export var jsonGUI; 
export var jsonIAE; 
export var jsonMap; 
declare var socket;
export var Img: any = {};

Img.map = {}

Img.guibackground = new Image();
Img.guibackground.src = '/client/img/guibackground.jpg'

Img.smoke = new Image();
Img.smoke.src = '/client/img/smoke.png'


socket.on('jsonImages', function(data){
    console.log(data.jsonGUI);
    console.log(data.jsonPlayer);
    jsonPlayer = data.jsonPlayer;
    jsonGUI = data.jsonGUI;
    jsonIAE = data.jsonIAE;
    jsonMap = data.jsonMap;
});

Img.Player = new Image();
Img.Player.src = '/client/TexturePacks/PlayerImages.png';

Img.Map = new Image();
Img.Map.src = '/client/TexturePacks/MapImages.png';

Img.IAE = new Image();
Img.IAE.src = '/client/TexturePacks/ItemsAndEnemiesImages.png';

Img.GUI = new Image();
Img.GUI.src = '/client/TexturePacks/GUIImages.png';


