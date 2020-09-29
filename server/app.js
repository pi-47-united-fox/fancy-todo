require('dotenv').config()
const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler.js')

const port = 3000

const allRoutes = require('./routes/index.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(allRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('App is running on port ', port)
})
