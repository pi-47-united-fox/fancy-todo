const express = require('express')

require('dotenv').config()
const app = express()
const router = require('./routes')
const port = process.env.PORT || 2000
const {errorHandler} = require('./middleware/ErrorHandler')
const cors = require('cors')


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(router)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`port jalan di ${port}`)
})