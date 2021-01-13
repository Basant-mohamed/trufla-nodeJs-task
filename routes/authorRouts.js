const express = require('express')
const Author = require('../model/author')
const router = express.Router()
const auth = require('../middelWare/auth')


// get all authors
router.get('/getAllAuthors' , (req,res)=>{
    Author.getAllAuthors((err,result)=>{
        if(err) throw new Error('Acn not get authors')
        else res.status(200).send(result)
    })
})

// add new author
router.get('/AddAuthor', (req,res)=>{
    Author.addAuthor(req.body.name , req.body.jobtitle ,(err,result)=>{
        if(err) throw new Error('Can not add author')
        else res.status(200).send(result)
    })
})

//get author by id 
router.get('/getAuthor/:id', (req,res)=>{
    Author.getAuthorById(req.params.id ,(err,result)=>{
        if(err) throw new Error('Can not find this author')
        else res.status(200).send(result)
    })
})





module.exports = router