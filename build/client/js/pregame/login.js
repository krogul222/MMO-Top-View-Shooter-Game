let signDiv = document.getElementById("signDiv");
let loadingDiv = document.getElementById("loadingDiv");
let signDivUsername = document.getElementById("signDiv-username");
let signDivPassword = document.getElementById("signDiv-password");
let signDivSignIn = document.getElementById("signDiv-signIn");
let signDivSignUp = document.getElementById("signDiv-signUp");
signDivSignIn.onclick = function () {
    socket.emit('signIn', { username: signDivUsername.value, password: signDivPassword.value });
};
socket.on('signInResponse', function (data) {
    if (data.success) {
        signDiv.style.display = 'none';
        if (imagesLoaded !== ALL_IMAGES) {
            loadingDiv.style.display = 'inline-block';
        }
        else {
            socket.emit('joinedGame');
        }
        signedIn = true;
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