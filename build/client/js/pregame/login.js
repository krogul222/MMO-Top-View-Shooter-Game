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
        console.log("MAP SIZE " + mapsize);
        socket.emit('createdGame', {
            name: name,
            mapsize: mapsize,
            water: water,
            seeds: seeds
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
//# sourceMappingURL=login.js.map