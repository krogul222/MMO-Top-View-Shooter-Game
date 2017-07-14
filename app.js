var express = require('express');
var app = express();

app.get('/',function(request,response){
    response.sendFile(__dirname+'/client/index.html');
});

app.use('/client', express.static(__dirname+'/client'));

app.listen(2000);