require('./db/mongoose');
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

const articalRout = require('./routes/articalRout')
const authorRout = require('./routes/authorRouts')
const commentRout = require('./routes/commentRouts')
const userRout = require('./routes/userRouts')

app.use(cors())
app.use(express.json())

app.use(userRout)
app.use(articalRout)
app.use(authorRout)
app.use(commentRout)



app.listen(PORT) 
