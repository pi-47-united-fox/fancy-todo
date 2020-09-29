require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT
const routes = require('./routes/index.js')

const errorHandler = require('./middlewares/errorHandler.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Homepage Todo')
})

app.use(routes)

app.use(errorHandler)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})