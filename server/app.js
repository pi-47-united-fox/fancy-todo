require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(routes)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send(`Home Todos Apps!`)
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})