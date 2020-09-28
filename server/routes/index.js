const route = require("express").Router()
const routeToDo = require("./todo")

route.use("/todos", routeToDo)

module.exports = route