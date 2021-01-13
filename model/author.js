
const pool = require('../db/mysql')
var Author={
   getAllAuthors(callBack) { 
       return pool.query('Call get_all_authors()',callBack) 
    },
    getAuthorById(id,callBack){
         return pool.query('Call get_author_by_id("'+id+'")',callBack) 
    },
    addAuthor(authName,jobtilte,callBack){
        return pool.query('Call add_author("'+authName+','+jobtilte+'")',callBack) 
    }
    
}
module.exports = Author