const todoRoute = require("./todoRoute")
const Controller = require("../controllers/controller")
const router = require("express").Router()



router.get("/", (req,res)=>{
    res.status(200).json({"message":"Home"})
})
router.post("/register", Controller.postRegister)
router.post("/login", Controller.postLogin)

router.use("/todos", todoRoute) 

module.exports = router