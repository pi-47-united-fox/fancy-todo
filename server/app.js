require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('../server/routers/index')
const errorHendler = require('./middleware/errorHendler')


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/', router)
app.use(errorHendler)


app.listen(PORT, () => {
    console.log(`Aplikasi ini berjalan di port:${PORT}`);
})