const mySql = require('mysql')
var pool = mySql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'trufle-blog',
    charset : 'utf8',
    insecureAuth : true
  });
   
module.exports  = pool