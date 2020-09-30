'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes/index.js')

app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port,()=> {
    console.log(`App listening at http://localhost:${port}`)
})
