let signDiv = (<HTMLInputElement>document.getElementById("signDiv"));
let loadingDiv = (<HTMLInputElement>document.getElementById("loadingDiv"));
let signDivUsername = (<HTMLInputElement>document.getElementById("signDiv-username"));
let signDivPassword = (<HTMLInputElement>document.getElementById("signDiv-password"));
let signDivSignIn = (<HTMLInputElement>document.getElementById("signDiv-signIn"));
let signDivSignUp = (<HTMLInputElement>document.getElementById("signDiv-signUp"));
let gameMenuDiv = (<HTMLInputElement>document.getElementById("gameMenuDiv"));
let quickGame =  (<HTMLInputElement>document.getElementById("quickGame"));
let joinGameMenuBtn =  (<HTMLInputElement>document.getElementById("joinGameMenuBtn"));
let createGameMenuBtn =  (<HTMLInputElement>document.getElementById("createGameMenuBtn"));
let createGameBtn =  (<HTMLInputElement>document.getElementById("createGameBtn"));
let mainBar =   (<HTMLInputElement>document.getElementById("mainBar"));
let gameMenuDivContainer =  (<HTMLInputElement>document.getElementById("gameMenuDivContainer"));
let joinGameDiv = (<HTMLInputElement>document.getElementById("joinGameDiv")); 
let createGameDiv = (<HTMLInputElement>document.getElementById("createGameDiv")); 
let backToGameMenuBtnFromJoin =  (<HTMLInputElement>document.getElementById("backToGameMenuBtnFromJoin")); 
let backToGameMenuBtnFromCreate =  (<HTMLInputElement>document.getElementById("backToGameMenuBtnFromCreate")); 
let joinGameBtn =  (<HTMLInputElement>document.getElementById("joinGameBtn")); 

export let selectedGameId: number = -1;
let gamesId: number[] = [];

declare var socket: any;
declare var gameDiv: any;
declare var canJoinGame;
declare var canCreateGame;
declare var imagesLoaded;
declare var ALL_IMAGES;

signDivSignIn.onclick = function(){
    socket.emit('signIn', {username:signDivUsername.value, password: signDivPassword.value});
}

createGameBtn.onclick = function(){
    canCreateGame = true;
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    createGameDiv.style.display = 'none';
    mainBar.style.display = 'none';

    if(imagesLoaded !== ALL_IMAGES){
        loadingDiv.style.display = 'inline';
    } else{
        let name = $("#gamename").val();
        let mapsize = $('#mapsize').find(":selected").val();
        let water = $('#water').find(":selected").val(); 
        let seeds = $('#seeds').find(":selected").val(); 
        let monstersnumber = $('#monstersnumber').find(":selected").val(); 
        let monstersrespawn = $('#monstersrespawn').find(":selected").val(); 
        
        console.log("MAP SIZE " +mapsize);
        socket.emit('createdGame',{
            name: name,
            mapsize: mapsize,
            water: water,
            seeds: seeds,
            monstersnumber: monstersnumber,
            monstersrespawn: monstersrespawn
        });
    }
}
/*
quickGame.onclick = function(){
        canJoinGame = true;
        gameMenuDiv.style.display = 'none';
        gameMenuDivContainer.style.display = 'none';
        mainBar.style.display = 'none';
        if(imagesLoaded !== ALL_IMAGES){
            loadingDiv.style.display = 'inline';
        } else{
            socket.emit('joinedGame');
        }
}*/

joinGameMenuBtn.onclick = function(){
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'inline';

    socket.emit('getListOfGames');

    //mainBar.style.display = 'none'
}

createGameMenuBtn.onclick = function(){
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    joinGameDiv.style.display = 'none';
    createGameDiv.style.display = 'inline';
    

    //mainBar.style.display = 'none'
}

joinGameBtn.onclick = function(){
    if(selectedGameId >= 0){
        canJoinGame = true;
        gameMenuDiv.style.display = 'none';
        gameMenuDivContainer.style.display = 'none';
        joinGameDiv.style.display = 'none';
        mainBar.style.display = 'none';
        if(imagesLoaded !== ALL_IMAGES){
            loadingDiv.style.display = 'inline';
        } else{
            socket.emit('joinedGame', {gameId: selectedGameId});
        }
    }
   // socket.emit('getListOfGames');

    //mainBar.style.display = 'none'
}

backToGameMenuBtnFromJoin.onclick = function(){
    joinGameDiv.style.display = 'none';
    

    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';

    selectedGameId= -1;

    //mainBar.style.display = 'none';
}

backToGameMenuBtnFromCreate.onclick = function(){
    createGameDiv.style.display = 'none';
    
    gameMenuDiv.style.display = 'inline-block';
    gameMenuDivContainer.style.display = 'block';
    gameMenuDivContainer.style.margin = 'auto';

    //mainBar.style.display = 'none';
}

/*$("#availableGamesList tbody tr").click(function () {
    $('.table-success').removeClass('table-success');
    $(this).addClass("table-success");
});*/

$(document).ready(function(){
    $("#availableGamesList").on("click", ".std", function(){
        if(!$(this).hasClass("highlight")){
            $(this).closest("tr").siblings().removeClass("highlight");
            $(this).toggleClass("highlight");
            console.log("PODSWIETLAJ");
            let id:number = parseInt($(this).attr('id'));
            selectedGameId = gamesId[id];
        }
    });
  });
/*
signDivSignUp.onclick = function(){
    socket.emit('signUp', {username:signDivUsername.value, password: signDivPassword.value});
}    */

socket.on('ListOfGames', function(data){

    $('#availableGamesList tbody').empty();
    let tbody = '';
    gamesId = [];
    for(let i = 0, length = data.length; i < length; i++){
        tbody +=  "<tr id='"+i+"' class='std'> <th scope='row'>" + i +" </th> \
        <td>"+data[i].name+"</td> \
        </tr>";
        gamesId[i] = data[i].id;
    }
    $('#availableGamesListTbody').html(tbody);
});

socket.on('signInResponse', function(data){
    if(data.success){
        signDiv.style.display = 'none';
        gameMenuDiv.style.display = 'inline-block';
        gameMenuDivContainer.style.display = 'block';
        gameMenuDivContainer.style.margin = 'auto';
  /*      if(imagesLoaded !== ALL_IMAGES){
            loadingDiv.style.display = 'inline';
        } else{
            socket.emit('joinedGame');
        }*/

        //gameDiv.style.display = 'inline-block';
    } else {
        alert("Sign in unsuccessful.");
    }
});

socket.on('signUpResponse', function(data){
    if(data.success){
        alert("Sign in successful.");
    } else {
        alert("Sign in unsuccessful.");
    }
});