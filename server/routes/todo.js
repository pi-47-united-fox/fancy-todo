const route = require("express").Router()
const TodoConstroller = require("../controllers/todocontroller")
const { authentication, authorization } = require("../midleware/midleware")


// form index endpoint => /todos
route.use(authentication)
route.get("/", TodoConstroller.getDataTodo)
route.post("/", TodoConstroller.postInputTodo)
route.get("/:id", authorization, TodoConstroller.findTodoById)
route.put("/:id", authorization, TodoConstroller.updateTodoById)
route.patch("/:id", authorization, TodoConstroller.changeStatusTodo)
route.delete("/:id", authorization, TodoConstroller.deleteTodoById)


module.exports = route