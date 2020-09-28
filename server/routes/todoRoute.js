const router = require("express").Router()
const TodoController = require("../controllers/todoController")

router.post("/", TodoController.postTodo)
router.get("/", TodoController.getTodos)
router.get("/:id", TodoController.getTodo)
router.put("/:id", TodoController.putTodo)
router.patch("/:id", TodoController.patchTodo)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router