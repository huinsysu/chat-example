var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
socket.on('connection', function(){
  $('#messages').append($('<li>').text('a new user connected.'));
});
socket.on('disconnect', function(){
  $('#messages').append($('<li>').text('a user disconnected.'));
});