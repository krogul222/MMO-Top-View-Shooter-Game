let signDiv = (<HTMLInputElement>document.getElementById("signDiv"));
let loadingDiv = (<HTMLInputElement>document.getElementById("loadingDiv"));
let signDivUsername = (<HTMLInputElement>document.getElementById("signDiv-username"));
let signDivPassword = (<HTMLInputElement>document.getElementById("signDiv-password"));
let signDivSignIn = (<HTMLInputElement>document.getElementById("signDiv-signIn"));
let signDivSignUp = (<HTMLInputElement>document.getElementById("signDiv-signUp"));
let gameMenuDiv = (<HTMLInputElement>document.getElementById("gameMenuDiv"));
let quickGame =  (<HTMLInputElement>document.getElementById("quickGame"));
let createGame =  (<HTMLInputElement>document.getElementById("createGame"));
let mainBar =   (<HTMLInputElement>document.getElementById("mainBar"));
let gameMenuDivContainer =  (<HTMLInputElement>document.getElementById("gameMenuDivContainer"));


declare var socket: any;
declare var gameDiv: any;
declare var canJoinGame;
declare var imagesLoaded;
declare var ALL_IMAGES;

signDivSignIn.onclick = function(){
    socket.emit('signIn', {username:signDivUsername.value, password: signDivPassword.value});
}

createGame.onclick = function(){
    canJoinGame = true;
    gameMenuDiv.style.display = 'none';
    gameMenuDivContainer.style.display = 'none';
    mainBar.style.display = 'none';

    if(imagesLoaded !== ALL_IMAGES){
        loadingDiv.style.display = 'inline';
    } else{
        socket.emit('createdGame');
    }
}

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
}
/*
signDivSignUp.onclick = function(){
    socket.emit('signUp', {username:signDivUsername.value, password: signDivPassword.value});
}    */

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