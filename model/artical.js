const mongoose = require('mongoose')

const articalschema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        trim : true,
        minlength:5 ,
        maxlength :20
    },
    body :{
        type : String ,
        required : true,
        minlength : 100 ,
        maxlength : 1000
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    },
    date : {
        type : Date , 
        required : true,
        default : Date.now
    },
    likes : {
        type : Number ,
        default: 0
    }
})

/* articalschema.statics.likeMe = async function(id){
   const art = await this.find({_id:id})
   if(!art) throw new Error('artical not existed')

   else {
       art.likes = art.likes + 1
     
       return art
   }

} */
const Atrical = mongoose.model('Artical' , articalschema)
module.exports=Atrical