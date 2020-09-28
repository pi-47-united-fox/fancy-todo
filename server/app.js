const express = require("express")
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(`Home Todos Apps!`)
})

app.use(routes)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})