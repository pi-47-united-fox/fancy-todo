const route = require("express").Router()
const TodoConstroller = require("../controllers/todocontroller")


route.get("/todos", TodoConstroller.getDataTodo)
route.post("/todos", TodoConstroller.postInputTodo)
route.get("todos/:id", TodoConstroller.findTodoById)
route.put("todos/:id", TodoConstroller.updateTodoById)
route.patch("todos/:id", TodoConstroller.changeStatusTodo)
route.delete("todos/:id", TodoConstroller.deleteTodoById)


module.exports = route