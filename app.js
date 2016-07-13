var socket = io();
var name = prompt("请输入昵称", "guest");
var keyboardPressCount = 0;

socket.emit('add user', name);

$('form').submit(function(){
  var str = $('#m').val();
  var strarr = [];
  strarr = str.split("@");
  socket.emit('chat message', strarr);
  $('#m').val('');
  keyboardPressCount = 0;
  return false;
});

$('#m').keypress(function(){
	if (keyboardPressCount == 0) {
	    socket.emit('typing');
	    keyboardPressCount++;
	}
});

socket.on('add user', function(data){
  $('#messages').append($('<li>').text('用户 ' + data.username + ' 加入聊天。'));
});

socket.on('cancle typing', function(data){
  $('.' + data.username).remove();  
});

socket.on('message', function(data){
  $('#messages').append($('<li>').text(data.username + ': ' + data.message));
});

socket.on('delete user', function(data){
  $('#messages').append($('<li>').text('用户 ' + data.username + '退出聊天。'));
});

socket.on('broadcast typing', function(data){
	$('#messages').append($('<li>').text('用户' + data.username + '正在输入...'));
	$('ul li:last-child').addClass(data.username);
});