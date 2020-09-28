const route = require("express").Router()
const routeToDo = require("./todo")
const routeUser = require("./user")

route.use("/todos", routeToDo)
route.use("/", routeUser)

module.exports = route