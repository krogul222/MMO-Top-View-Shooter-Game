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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ 50:
/***/ (function(module, exports) {

let signDiv = document.getElementById("signDiv");
let loadingDiv = document.getElementById("loadingDiv");
let signDivUsername = document.getElementById("signDiv-username");
let signDivPassword = document.getElementById("signDiv-password");
let signDivSignIn = document.getElementById("signDiv-signIn");
let signDivSignUp = document.getElementById("signDiv-signUp");
let gameMenuDiv = document.getElementById("gameMenuDiv");
let quickGame = document.getElementById("quickGame");
let joinGameMenuBtn = document.getElementById("joinGameMenuBtn");
let createGame = document.getElementById("createGame");
let mainBar = document.getElementById("mainBar");
let gameMenuDivContainer = document.getElementById("gameMenuDivContainer");
let joinGameDiv = document.getElementById("joinGameDiv");
let backToGameMenuBtn = document.getElementById("backToGameMenuBtn");
let joinGameBtn = document.getElementById("joinGameBtn");
let selectedGameId = -1;
let gamesId = [];
signDivSignIn.onclick = function () {
    socket.emit('signIn', { username: signDivUsername.value, password: signDivPassword.value });
};
createGame.onclick = function () {
    canJoinGame = true;
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    mainBar.style.display = 'none';
    if (imagesLoaded !== ALL_IMAGES) {
        loadingDiv.style.display = 'inline';
    }
    else {
        socket.emit('createdGame');
    }
};
quickGame.onclick = function () {
    canJoinGame = true;
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    mainBar.style.display = 'none';
    if (imagesLoaded !== ALL_IMAGES) {
        loadingDiv.style.display = 'inline';
    }
    else {
        socket.emit('joinedGame');
    }
};
joinGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'inline';
    socket.emit('getListOfGames');
};
joinGameBtn.onclick = function () {
    if (selectedGameId >= 0) {
        gameMenuDiv.style.display = 'none';
        gameMenuDivContainer.style.display = 'none';
        joinGameDiv.style.display = 'none';
        mainBar.style.display = 'none';
        if (imagesLoaded !== ALL_IMAGES) {
            loadingDiv.style.display = 'inline';
        }
        else {
            socket.emit('joinedGame', { gameId: selectedGameId });
        }
    }
};
backToGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'none';
    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';
};
$(document).ready(function () {
    $("#availableGamesList").on("click", "tr", function () {
        $(this).closest("tr").siblings().removeClass("table-success");
        $(this).toggleClass("table-success");
        let id = parseInt($(this).attr('id'));
        selectedGameId = gamesId[id];
    });
});
socket.on('ListOfGames', function (data) {
    $('#availableGamesList tbody').empty();
    let tbody = '';
    gamesId = [];
    for (let i = 0, length = data.length; i < length; i++) {
        tbody += "<tr id='" + i + "'> <th scope='row'>" + i + " </th> \
        <td>" + data[i].id + "</td> \
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


/***/ })

/******/ });