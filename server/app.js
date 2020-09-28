const express = require('express')
const app = express()
const port = 3000
const todo = require('./routes/todo')

app.use(express.urlencoded({ extended: true }))
app.use('/todos', todo)

app.listen(port, () => {
    console.log(`Todos app listening at http://localhost:${port}`)
})