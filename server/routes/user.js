const route = require("express").Router()
const UserController = require("../controllers/userController")

route.post("/register", UserController.registerUser)
route.post("/login", UserController.loginUser)


module.exports = route