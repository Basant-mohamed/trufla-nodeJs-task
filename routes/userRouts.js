const express = require('express')
const router = express.Router()
const User = require('../model/user')
const joi = require ('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const joischema = joi.object({
    userName : joi.string().required().min(5),
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6)

})

/* ***************************************  Add new user ************************************* */

router.post('/api/addUser' , async (req,res)=>{
    try{
        // validate Input
        const { error }= await  joischema.validate(req.body)
        if(error)  throw new Error(error.message)

        // hashing password
        req.body.password = await bcrypt.hash(req.body.password , 6) 

        // save to DB
        const user = new User(req.body)
       const added =  await user.save()
       if(!added) throw new Error('Can not add this user')

       // send response with the result 
       res.status(200).send(added)

    }
    catch(e){
        res.send(e.message)

    }
})


/* ******************************  login ****************************** */

router.post('/api/login' , async (req,res)=>{
    try{
        console.log(req.body)
        //check it is right email 
        const user = await User.findOne({email : req.body.email})
        if(!user) throw new Error('Can not find this user')

        // compare the given password with the original 
        const pass = await bcrypt.compare(req.body.password , user.password)
        if(!pass)  throw new Error('Wrong Password')
        
        // create the token 
        const key = config.get('jwtPrivateKey')
        const token = await jwt.sign({_id:user._id} , key)   // get the key from the env variable  using the config package 
        if(!token) throw new Error('Can not generat token')

        // send the token in the response 
        res.header('Authorization' ,token).send({token})

    }
    catch(e){
        res.status(400).send(e.message)
    }

})



module.exports = router