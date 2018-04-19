var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var elastic = require('./elastic.js');

app.get('/', function(req, res){
  res.send('/scrape')
});
app.get('/scrape', function(req, res){

    url = 'http://www.google.com/';

    request(url, function(error, response, html){
        //console.log(url, error, response, html);
        if(!error){
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('a').filter(function(){
                var data = $(this);
                console.log('json',data[0].href);
            })

        }
    })
})

app.listen('4200')
console.log('Magic happens on port 4200');
exports = module.exports = app;
