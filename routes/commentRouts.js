const express = require('express')
const Author = require('../model/author')
const router = express.Router()
const joi = require('joi')
const auth = require('../middelWare/auth')
const Commnet = require('../model/comments')

const joischema = joi.object({
    articalId : joi.string().required(),
    comment : joi.string(),
    userId:joi.string().required(),
    date : joi.date()
})

// add comment 
router.post('/api/addComment' ,auth, async (req,res)=>{
try{
    //validate input
    const { error } = await joischema.validate(req.body)
    if(error) throw new Error(error.message)

    //save to DB
    const newComment = new Commnet(req.body)
    const added = await newComment.save()
    if(!added) throw new Error('Can not add this comment')

    res.status(200).send(added)
}
catch(e){
    res.send(e.message)

}
})




module.exports = router