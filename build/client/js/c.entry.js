/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/client/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
let signDiv = document.getElementById("signDiv");
let loadingDiv = document.getElementById("loadingDiv");
let signDivUsername = document.getElementById("signDiv-username");
let signDivPassword = document.getElementById("signDiv-password");
let signDivSignIn = document.getElementById("signDiv-signIn");
let signDivSignUp = document.getElementById("signDiv-signUp");
let gameMenuDiv = document.getElementById("gameMenuDiv");
let quickGame = document.getElementById("quickGame");
let joinGameMenuBtn = document.getElementById("joinGameMenuBtn");
let createGameMenuBtn = document.getElementById("createGameMenuBtn");
let createGameBtn = document.getElementById("createGameBtn");
let mainBar = document.getElementById("mainBar");
let gameMenuDivContainer = document.getElementById("gameMenuDivContainer");
let joinGameDiv = document.getElementById("joinGameDiv");
let createGameDiv = document.getElementById("createGameDiv");
let backToGameMenuBtnFromJoin = document.getElementById("backToGameMenuBtnFromJoin");
let backToGameMenuBtnFromCreate = document.getElementById("backToGameMenuBtnFromCreate");
let joinGameBtn = document.getElementById("joinGameBtn");
exports.selectedGameId = -1;
let gamesId = [];
signDivSignIn.onclick = function () {
    socket.emit('signIn', { username: signDivUsername.value, password: signDivPassword.value });
};
createGameBtn.onclick = function () {
    canCreateGame = true;
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    createGameDiv.style.display = 'none';
    mainBar.style.display = 'none';
    if (imagesLoaded !== ALL_IMAGES) {
        loadingDiv.style.display = 'inline';
    }
    else {
        let name = $("#gamename").val();
        let mapsize = $('#mapsize').find(":selected").val();
        let water = $('#water').find(":selected").val();
        let seeds = $('#seeds').find(":selected").val();
        let monstersnumber = $('#monstersnumber').find(":selected").val();
        let monstersrespawn = $('#monstersrespawn').find(":selected").val();
        let itemsnumber = $('#itemsnumber').find(":selected").val();
        let itemsrespawn = $('#itemsrespawn').find(":selected").val();
        console.log("MAP SIZE " + mapsize);
        socket.emit('createdGame', {
            name: name,
            mapsize: mapsize,
            water: water,
            seeds: seeds,
            monstersnumber: monstersnumber,
            monstersrespawn: monstersrespawn,
            itemsnumber: itemsnumber,
            itemsrespawn: itemsrespawn
        });
    }
};
joinGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'inline';
    socket.emit('getListOfGames');
};
createGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'none';
    createGameDiv.style.display = 'inline';
};
joinGameBtn.onclick = function () {
    if (exports.selectedGameId >= 0) {
        canJoinGame = true;
        gameMenuDiv.style.display = 'none';
        gameMenuDivContainer.style.display = 'none';
        joinGameDiv.style.display = 'none';
        mainBar.style.display = 'none';
        if (imagesLoaded !== ALL_IMAGES) {
            loadingDiv.style.display = 'inline';
        }
        else {
            socket.emit('joinedGame', { gameId: exports.selectedGameId });
        }
    }
};
backToGameMenuBtnFromJoin.onclick = function () {
    joinGameDiv.style.display = 'none';
    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';
    exports.selectedGameId = -1;
};
backToGameMenuBtnFromCreate.onclick = function () {
    createGameDiv.style.display = 'none';
    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';
};
$(document).ready(function () {
    $("#availableGamesList").on("click", ".std", function () {
        if (!$(this).hasClass("highlight")) {
            $(this).closest("tr").siblings().removeClass("highlight");
            $(this).toggleClass("highlight");
            console.log("PODSWIETLAJ");
            let id = parseInt($(this).attr('id'));
            exports.selectedGameId = gamesId[id];
        }
    });
});
socket.on('ListOfGames', function (data) {
    $('#availableGamesList tbody').empty();
    let tbody = '';
    gamesId = [];
    for (let i = 0, length = data.length; i < length; i++) {
        tbody += "<tr id='" + i + "' class='std'> <th scope='row'>" + i + " </th> \
        <td>" + data[i].name + "</td> \
        </tr>";
        gamesId[i] = data[i].id;
    }
    $('#availableGamesListTbody').html(tbody);
});
socket.on('signInResponse', function (data) {
    if (data.success) {
        signDiv.style.display = 'none';
        gameMenuDiv.style.display = 'inline-block';
        gameMenuDivContainer.style.display = 'block';
        gameMenuDivContainer.style.margin = 'auto';
    }
    else {
        alert("Sign in unsuccessful.");
    }
});
socket.on('signUpResponse', function (data) {
    if (data.success) {
        alert("Sign in successful.");
    }
    else {
        alert("Sign in unsuccessful.");
    }
});


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __webpack_require__(16);
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
        if (canJoinGame) {
            socket.emit('joinedGame', { gameId: login_1.selectedGameId });
        }
        else {
            if (canCreateGame) {
                let name = $("#gamename").val();
                let mapsize = $('#mapsize').find(":selected").val();
                let water = $('#water').find(":selected").val();
                let seeds = $('#seeds').find(":selected").val();
                let monstersnumber = $('#monstersnumber').find(":selected").val();
                let monstersrespawn = $('#monstersrespawn').find(":selected").val();
                console.log("MAP SIZE " + mapsize);
                socket.emit('createdGame', {
                    name: name,
                    mapsize: mapsize,
                    water: water,
                    seeds: seeds,
                    monstersnumber: monstersnumber,
                    monstersrespawn: monstersrespawn
                });
            }
        }
    }
}


/***/ })

/******/ });