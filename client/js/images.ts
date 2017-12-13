import { selectedGameId } from "./pregame/login";

export var jsonPlayer; 
export var jsonGUI; 
export var jsonIAE; 
export var jsonMap; 
declare var socket;
declare var canJoinGame;
declare var canCreateGame;
export var Img: any = {};

declare var imagesLoaded;
declare var ALL_IMAGES;

let gameDiv = (<HTMLInputElement>document.getElementById("gameDiv"));
let loadingDiv = (<HTMLInputElement>document.getElementById("loadingDiv"));
let loadingProgressDiv = (<HTMLInputElement>document.getElementById("loadingProgressDiv"));
let loadingProgressPercent = (<HTMLInputElement>document.getElementById("loadingProgressPercent"));
Img.map = {}

Img.guibackground = new Image();
Img.guibackground.src = '/client/img/guibackground.jpg'

Img.guibackground.onload = function(){ 
    imgLoaded();
};

Img.smoke = new Image();
Img.smoke.src = '/client/img/smoke.png'

Img.smoke.onload = function(){ 
    imgLoaded();
};

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
Img.Player.onload = function(){ 
    imgLoaded();
};

Img.Map = new Image();
Img.Map.src = '/client/TexturePacks/MapImages.png';
Img.Map.onload = function(){ 
    imgLoaded();
};

Img.IAE = new Image();
Img.IAE.src = '/client/TexturePacks/ItemsAndEnemiesImages.png';
Img.IAE.onload = function(){ 
    imgLoaded();
};


Img.GUI = new Image();
Img.GUI.src = '/client/TexturePacks/GUIImages.png';
Img.GUI.onload = function(){ 
    imgLoaded(); 
};

function imgLoaded() {
    imagesLoaded++; 
    console.log("Img loaded "+ imagesLoaded);
    loadingProgressDiv.style.width = (imagesLoaded/ALL_IMAGES)*100 + '%';
    loadingProgressPercent.textContent = Math.round((imagesLoaded/ALL_IMAGES)*100) + '%';
    if(imagesLoaded == ALL_IMAGES) {
        gameDiv.style.display = 'inline-block';
        loadingDiv.style.display = 'none';
        if(canJoinGame){
            socket.emit('joinedGame',{gameId: selectedGameId});
        } else{
            if(canCreateGame){
                let name = $("#gamename").val();
                let mapsize = $('#mapsize').find(":selected").val();
                let water = $('#water').find(":selected").val(); 
                let seeds = $('#seeds').find(":selected").val(); 
                let monstersnumber = $('#monstersnumber').find(":selected").val(); 
                console.log("MAP SIZE " +mapsize);
                socket.emit('createdGame',{
                    name: name,
                    mapsize: mapsize,
                    water: water,
                    seeds: seeds,
                    monstersnumber: monstersnumber
                });
            }
        } 
    }
}



