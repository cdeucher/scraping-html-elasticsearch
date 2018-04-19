var client = require('./conf/elasticsearch.js');

class oAPI{
    constructor(){
       this.q = client;
    }
    open_connect(){
    }
    query(type='get',body={}){
      switch(type) {
        case 'delete':
              console.log(type,body);
            break;
        case 'insert':
              this.insert(body);
            break;
        default:
            console.log(type,body);

      }
    }
    insert(body){
      this.q.index({
        index: 'novo1',
        body: body
      },function(err,resp,status) {
          console.log(resp);
      });
    }
}
var _API = new oAPI();

var exec_open_connect = function(){
    _API.open_connect();
}
var exec_query = function(){
    _API.query();
}

exports.open_connect        = exec_open_connect;
exports.query               = exec_query;
