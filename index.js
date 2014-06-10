var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/jquery-1.11.1.min.js', function(req, res){
	res.sendfile('jquery-1.11.1.min.js');
});

io.on('connection', function(socket){
	console.log('user %s connected', socket.id);
	socket.on('disconnect', function(){
		console.log('user %s disconnected', socket.id);
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', socket.id + ': ' + msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});