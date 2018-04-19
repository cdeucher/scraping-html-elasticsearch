var request = require('request')
  , cheerio = require('cheerio');

class oAPI{
    constructor(){
        this.SOCKET = '';
    }
    setsocket(socket){
      this.SOCKET = socket;
      return this;
    }
    find(data){
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
                  _API.SOCKET.emit('toClient', '<br>'+$(link).attr('href'));
                  _API.scrap($(link).attr('href'));
                });
             }
          });
            console.log('End');
    }
    scrap(URL){
      request(URL, function(err, res, body) {
         if (err) {
           console.log(err);
         } else {
           console.log('Scraping Links=',URL);
            var $ = cheerio.load(body);
            $('header').each(function(i, link) {
              console.log('%s', $(link).attr('tittle'));
              _API.SOCKET.emit('toClient', '<br>'+$(link).attr('tittle'));
            });
         }
      });
    }
}
var _API = new oAPI();

var exec_find = function(socket,url='http://google.com/'){
    _API.setsocket(socket).find(url);
}

exports.find      = exec_find;
