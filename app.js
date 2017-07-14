var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/',function(request,response){
    response.sendFile(__dirname+'/client/index.html');
});

app.use('/client', express.static(__dirname+'/client'));

var listener = server.listen(2000, function(){
    console.log("Listening on port 2000...");
});

console.log("Server started.");

const SOCKET_LIST = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log("Socket connection");
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.number ="" + Math.floor(10*Math.random());
    SOCKET_LIST[socket.id] = socket;
    
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
    });
    });    


setInterval(function(){
    let pack =[];
    for(let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        pack.push({x:socket.x,y:socket.y, number: socket.number});
    }
    
     for(let i in SOCKET_LIST){
            let socket = SOCKET_LIST[i];
            socket.emit('newPositions',pack);
     }
}, 1000/25);