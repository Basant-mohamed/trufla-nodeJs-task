require('./db/mysql');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const articalRout = require('./routes/articalRout')
const authorRout = require('./routes/authorRouts')

app.use(cors())
app.use(express.json())

app.use(articalRout)
app.use(authorRout)

app.listen(PORT) 
