const route = require("express").Router()
const TodoConstroller = require("../controllers/todocontroller")

// form index endpoint => /todos
route.get("/", TodoConstroller.getDataTodo)
route.post("/", TodoConstroller.postInputTodo)
route.get("/:id", TodoConstroller.findTodoById)
route.put("/:id", TodoConstroller.updateTodoById)
route.patch("/:id", TodoConstroller.changeStatusTodo)
route.delete("/:id", TodoConstroller.deleteTodoById)


module.exports = route