var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
var request = require('request')
  , cheerio = require('cheerio');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {
   socket.emit('news', { hello: 'world' });

   socket.on('toServer', function (data) {
    console.log(data);
    var URL = data;//'http://socket.io';
      request(URL, function(err, res, body) {
         if (err) {
           console.log(err);
         } else {
           console.log('Scraping Links');
            var $ = cheerio.load(body);
            $('a').each(function(i, link) {
              console.log('%s', $(link).attr('href'));
              socket.emit('toClient', '<br>'+$(link).attr('href'));
            });
         }
      });
        console.log('End');
    });
});

var dbport = (process.env.SCRAPING_SERVICE_PORT || 80);
var dbhost = (process.env.SCRAPING_SERVICE_HOST || 'localhost');
server.listen(dbport,dbhost);
