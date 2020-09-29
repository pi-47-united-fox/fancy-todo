require('dotenv').config()
const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 3000
const router  = require('./routers')
const errHandler = require('./middlewares/errorHandlers')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`Fancy Todo app listening at http://localhost:${PORT}`)
})