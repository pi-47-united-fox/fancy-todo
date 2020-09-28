const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require('./routes/index')

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use('/',router)

app.listen(port,()=>{
    console.log(`App listening ${port}`)
})