const express = require("express")
const app = express()
const port = 3000
const routes = require("./routes/index")
const errorsHandler = require("./middlewares/errorsHandler")

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

