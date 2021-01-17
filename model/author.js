const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true,
        minlength:5 ,
    },
    jobTitle :{
        type : String ,
        required : true,
        trim : true
    },
    pic :{
        type:String
    }
})

const Author = mongoose.model('Author' , authorSchema)
module.exports=Author