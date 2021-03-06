const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName : {
      type : String ,
      required : true ,
      minlength : 5 
  },
  email: {
      type : String , 
      required : true ,
      unique : true ,
      match :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
  },
password : {
    type : String ,
    required : true ,
    minlength : 6 
}
})

const User = mongoose.model('User' , userSchema)
module.exports= User