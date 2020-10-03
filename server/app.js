
const express = require("express")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")
const router = require("./routes") 
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router) 

app.listen(port,()=>{ 
    console.log("listening on port ", port);
})