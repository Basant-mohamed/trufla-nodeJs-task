const express = require('express')
const router = express.Router()
const Artical = require('../model/artical')
const joi = require('joi')


const joischema = joi.object({
    title : joi.string().required().min(5).max(20),
    body : joi.string().required().min(50),
    date : joi.required().default(Date.now),

})

// add Artical 
router.post('/addArtical', async (req,res)=>{
    try{
        // check the validation 
        const {error} = await joischema.validate(req.body)
        if(error) throw new Error(error.message)

         await Artical.addArtical(req.body.title , req.body.body , req.body.authorId ,req.body.date ,(err,result)=>{
             if(err) throw new Error('Can not add the artical')
             else res.status(200).send(result)
         })

    }
    catch(e){

        res.send(e.message)
    }
}) 

//get all artical 
router.get('/getArticals' , (req,res)=>{
    Artical.getAllArticals((err,result)=>{
        if(err) throw new Error('Can not get articals')
        else res.status(200).send(result)
    })
})


// get artical by ID 
router.get('/getArticalById/:id' , (req,res)=>{
    Artical.getArticalById(req.params.id ,(err , result)=>{
        if(err)  throw new Error('Can not get the artical')
        else res.status(200).send(result)
    })
})

//add comment to given artical 
router.post('/addComment/:articalId', auth , (req,res)=>{
    Artical.addComment(req.body.comment,req.params.articalId,req.body.userId,(err , result)=>{
        if(err)  throw new Error('Can not add your comment')
        else res.status(200).send(result)
    })
})

//Thumbs up to a given article
router.post('/thumbsUpArtical/:articalId', auth , (req,res)=>{
    Artical.thumbsUpArtical(req.body.userId,req.params.articalId,(err , result)=>{
        if(err)  throw new Error('Can not like the artical')
        else res.status(200).send(result)
    })
})
module.exports = router