const jwt = require('jsonwebtoken')
const config = require('config') // use it to get teh env var which hold the key of the jwt

function auth (req,res,next){
    const token  = req.header('Authorization').replace('Bearer ','')
    if(!token) return res.status(401).send('User not Login')
console.log(token)
    try{
    const decodedId = jwt.verify(token , config.get('jwtPrivateKey'))
    if(!decodedId) throw new Error('Wrong token')
    req.body.userId = decodedId._id
    next()

    }
    catch(e){
        res.status(400).send(e.message)
    }

}

module.exports = auth

