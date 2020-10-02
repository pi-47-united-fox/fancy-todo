const route = require("express").Router()
const routeToDo = require("./todo")
const routeUser = require("./user")
const routeGoogle = require("./googleLogin")

route.use("/todos", routeToDo)
route.use("/", routeUser)
route.use("/googlelogin", routeGoogle)

module.exports = route