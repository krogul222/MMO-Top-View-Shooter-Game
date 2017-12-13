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
let createGame = document.getElementById("createGame");
let mainBar = document.getElementById("mainBar");
let gameMenuDivContainer = document.getElementById("gameMenuDivContainer");
let joinGameDiv = document.getElementById("joinGameDiv");
let backToGameMenuBtn = document.getElementById("backToGameMenuBtn");
let joinGameBtn = document.getElementById("joinGameBtn");
exports.selectedGameId = -1;
let gamesId = [];
signDivSignIn.onclick = function () {
    socket.emit('signIn', { username: signDivUsername.value, password: signDivPassword.value });
};
createGame.onclick = function () {
    canCreateGame = true;
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
joinGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'inline';
    socket.emit('getListOfGames');
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
backToGameMenuBtn.onclick = function () {
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'none';
    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';
    exports.selectedGameId = -1;
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
//# sourceMappingURL=login.js.map