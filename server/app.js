require('dotenv').config()

const express = require("express")
const app = express()
const port = process.env.PORT
const routes = require("./routes/index")
const errorsHandler = require("./middlewares/errorsHandler")
const cors = require("cors")

app.use(cors())

// body parser
app.use(express.urlencoded( { extended:true } ))

// body parser json
app.use(express.json())

// routes
app.use(routes)

// error handler (harus dibawah route)
app.use(errorsHandler)

app.listen(port, () => {
    console.log("App running at port:", port)
})

