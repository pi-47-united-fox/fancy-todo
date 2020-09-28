const env = require('dotenv').config()

const express = require("express")
const app = express()
const port = process.env.PORT
const routes = require('./routes')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Home Todos Apps!`)
})

app.use(routes)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})