require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const route = require("./routes")
const { errorHandler } = require("./midleware/errorhandler")
const cors = require("cors")


//body parsher
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//from index
app.use(route)
//error
app.use(errorHandler)
//listen
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})