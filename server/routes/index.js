const todoRoute = require("./todoRoute")
const Controller = require("../controllers/controller")
const ApiController = require("../controllers/apiController")
const errorHandler = require("../middlewares/errorHandler")
const router = require("express").Router()  


router.get("/", (req,res)=>{
    res.send("test")
    // res.status(200).json({"message":"Home"})
})
router.post("/register", Controller.postRegister)
router.post("/login", Controller.postLogin)
router.post("/google-login", Controller.postGoogleLogin)
router.get("/API-getweather", ApiController.getWeather)

router.use("/todos", todoRoute) 
router.use(errorHandler)


module.exports = router