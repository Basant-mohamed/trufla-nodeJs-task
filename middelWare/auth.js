const jwt = require('jsonwebtoken')
const config = require('config') // use it to get teh env var which hold the key of the jwt

function auth (req,res,next){
    const token  = req.header('Authorization').replace('Bearer ','')
    if(!token) return res.status(401).send('No Token Existed. ')

    try{
    const decodedId = jwt.verify(token , config.get('jwtPrivateKey'))
    req.body.userId = decodedId
    next()

    }
    catch(e){
        res.status(400).send(e.message)
    }

}

module.exports = auth

