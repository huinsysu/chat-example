var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

app.use(express.static('./'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('add user', function(name){
		socket.username = name;
		users[name] = socket;
		io.emit('add user', {username: socket.username});
	});

	socket.on('disconnect', function(){
	    io.emit('delete user', {username: socket.username});
	});

	socket.on('chat message', function(data){
		socket.broadcast.emit('cancle typing', {username: socket.username});
		if (data.length > 1) {
			for (var i = 1; i < data.length; i++) {
				for (user in users)
					if (users[user].username == data[i])
						users[user].emit('message', {username: socket.username, message: data[0]})
			}
		} else {
		    io.emit('message', {username: socket.username, message: data[0]});
		}
	});

	socket.on('typing', function(){
		socket.broadcast.emit('broadcast typing', {username: socket.username});
	});
});

http.listen(3000, function(){
	console.log('Listening on port 3000!');
});
