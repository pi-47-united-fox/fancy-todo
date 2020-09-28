//require express
const express = require('express')
const app = express()

//define port
const port = 3000
const routes = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json()) // kalau raw json

//routing

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(routes)

//listen port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})