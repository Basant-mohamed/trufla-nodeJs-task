const express = require('express')
const Author = require('../model/author')
const router = express.Router()
const auth = require('../middelWare/auth')
const joi = require('joi')

const joiSchema = joi.object({
    name : joi.string().min(5).trim().required(),
    jobTitle : joi.string().trim().required()
})

/* *********************************** Add new author ********************************/

router.post('/api/addAuthor', async (req,res)=>{
try{
    // validate inputs
    const { error } = joiSchema.validate(req.body)
    if(error) throw new Error (error.message)

    //add to DB
    const newAuthor= new Author(req.body)
    const added = await newAuthor.save()
    if(!added) throw new Error ( 'Can Not Add This Author ')

    // send the result s
    res.status(200).send(added)
}
catch(e){
    res.status().send(e)
}
    
})

/********************************************* get all authors **************************/

router.get('/api/getAllAuthors' , async (req,res)=>{
    try{
        
        const authors = await Author.find()
        if(!authors)  throw new Error('Can not get Authors')

        res.status(200).send(authors)

    }
    catch(e){
        res.status(400).send(e.message)
    }
})
   

/* **************************************** Get author by id  ********************************/

router.get('/api/getAuthor/:id', async (req,res)=>{
   try{
       const author = await Author.findById(req.params.id)
       if(!author)  throw new Error('Can not find this author')

       res.status(400).send(author)

   }
   catch(e){
       res.status(400).send(e.message)
   }
})


module.exports = router