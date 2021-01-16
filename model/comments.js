const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  articalId : {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Artical'
  },
  comment: {
      type : String , 
      required : true
  },
  userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
  },
  date : {
      type : Date ,
      default : Date.now
  }
})

const Comment = mongoose.model('Comment' , commentSchema)
module.exports= Comment