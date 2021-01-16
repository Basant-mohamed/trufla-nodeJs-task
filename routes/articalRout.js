const express = require('express')
const router = express.Router()
const Artical = require('../model/artical')
const joi = require('joi')
const auth = require('../middelWare/auth')

const joischema = joi.object({
    title : joi.string().required().min(5).max(20),
    body : joi.string().required().min(50),
    author : joi.string().required()
})

/* **********************************  add Artical  ************************** */
router.post('/api/addArtical', async (req,res)=>{
    try{
        // check the validation 
        const {error} = await joischema.validate(req.body)
        if(error) throw new Error(error.message)

        // save to DB
        const newArtical = new Artical(req.body)
        const added = await newArtical.save()
        if(!added) throw new Error('Can not add the artical')
        
        res.status(200).send(added)
         

    }
    catch(e){

        res.send(e.message)
    }
}) 

/********************************** Get all articals **************************/
router.get('/api/getAllArticals' , async (req,res)=>{
try{

    const articals = await Artical.find()
    if(!articals) throw new Error('Can not find articals')

    res.status(200).send(articals)

}
catch(e){
    res.send(e.message)
}    
})


/********************************* Get artical by ID *********************************/
router.get('/api/getArticalById/:id' ,async  (req,res)=>{
    try{

        const artical = await Artical.findById({_id:req.params.id})
        if(!artical)  throw new Error('Can not find this artical')

        res.status(200).send(artical)
    }
    catch(e){
        res.send(e.message)
    }
})

/**************************** Get specific artical (by title , author or date ) ********************/
router.get('/api/getArtical' ,async  (req,res)=>{
    try{
        const artical = await Artical.find({$or:[{title : req.body.title},{author:req.body.author} ,{date:req.body.date}]})
        if(!artical)  throw new Error('Can not find this artical')

        res.status(200).send(artical)
    }
    catch(e){
        res.send(e.message)
    }
})

/*********************************** Like certain artical *****************************/
router.post('/api/addThumbsUp', auth , (req,res)=>{
  
    // find the artical by ID
       Artical.findOne({_id:req.body._id} ,async (err,result)=>{
                if(err) throw new Error('Can Not find the Artical')
                else  {
                    // increase the likes number with 1
                    const updated = await Artical.findOneAndUpdate({_id:req.body._id},{likes : result.likes + 1} )
                    if(!updated)  throw new Error('Can not like this artical')
                    res.status(200).send({flag : 1})
                }
       })
   
   
    })
module.exports = router