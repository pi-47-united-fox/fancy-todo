const express = require("express")
const app = express()
const PORT = 3000
const route = require("./routes")

//body parsher
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//from index
app.use(route)
//listen
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})