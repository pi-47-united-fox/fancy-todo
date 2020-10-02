const route = require("express").Router()
const UserController = require("../controllers/userController")

route.post("/", UserController.googleLogin)


module.exports = route