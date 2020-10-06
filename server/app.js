'use strict'
if(process.NODE_ENV === 'develpoment') {
    require('dotenv').config() 
}
const express = require('express')
const cors  = require('cors')
const app = express()
const port = process.env.PORT ||3000
const router = require('./routes/index.js')

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.listen(port,()=> {
    console.log(`App listening at http://localhost:${port}`)
})
