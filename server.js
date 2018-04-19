var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
var elastic = require('./elastic.js');
var request = require('./request.js');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {
   socket.emit('news', { hello: 'world' });

   socket.on('toServer', function (data) {
          request.find(socket,data);
    });
});



var dbport = (process.env.SCRAPING_SERVICE_PORT || 4200);
var dbhost = '0.0.0.0'//(process.env.SCRAPING_SERVICE_HOST || 'localhost');
server.listen(dbport,dbhost);
