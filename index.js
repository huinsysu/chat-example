var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
	    io.emit('message', msg);
	});
	socket.broadcast.emit('connection');
	socket.on('disconnect', function(){
	    io.emit('disconnect');
	});
});

http.listen(3000, function(){
	console.log('Listening on port 3000!');
});
