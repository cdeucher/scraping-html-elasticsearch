var elasticsearch=require('elasticsearch');


//'http://[username]:[password]@[server]:[port]/',
var client = new elasticsearch.Client( {
  hosts: [
    'http://elasticsearch.net:9200/'
  ]
});

module.exports = client;  
