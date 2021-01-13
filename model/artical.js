
const pool = require('../db/mysql')
var Artical={
   getAllArticals(callBack) { 
       return pool.query('Call get_all_articals()',callBack) 
    },
    getArticalById(id,callBack){
         return pool.query('Call get_artical_by_id("'+id+'")',callBack) 
    },
    addArtical(title,body,authorId,date,callBack){
        return pool.query('Call add_artical("'+title+','+body+','+authorId+','+date+'")',callBack) 
    },
    addComment(comment , articalId ,userId , callBack){
        return pool.query('Call add_comment("'+comment+','+articalId+','+userId+'")',callBack) 
    },
    thumbsUpArtical(userId ,articalId , callBack){
        return pool.query('Call thumbs_up_artical("'+userId+','+articalId+'")',callBack) 
    
    }
    
    
}


module.exports=Artical