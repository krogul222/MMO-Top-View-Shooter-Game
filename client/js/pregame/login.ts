let signDiv = (<HTMLInputElement>document.getElementById("signDiv"));
let signDivUsername = (<HTMLInputElement>document.getElementById("signDiv-username"));
let signDivPassword = (<HTMLInputElement>document.getElementById("signDiv-password"));
let signDivSignIn = (<HTMLInputElement>document.getElementById("signDiv-signIn"));
let signDivSignUp = (<HTMLInputElement>document.getElementById("signDiv-signUp"));

declare var socket: any;
declare var gameDiv: any;

signDivSignIn.onclick = function(){
    socket.emit('signIn', {username:signDivUsername.value, password: signDivPassword.value});
}
/*
signDivSignUp.onclick = function(){
    socket.emit('signUp', {username:signDivUsername.value, password: signDivPassword.value});
}    */

socket.on('signInResponse', function(data){
    if(data.success){
        signDiv.style.display = 'none';
        gameDiv.style.display = 'inline-block';
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