const router = require("express").Router()
const TodoController = require("../controllers/todoController")
const {authentication, authorization} = require("../middlewares/auth")

router.use(authentication)
router.post("/", TodoController.postTodo)
router.get("/", TodoController.getTodos)
router.get("/:id",authorization, TodoController.getTodo)
router.put("/:id",authorization, TodoController.putTodo)
router.patch("/:id", authorization, TodoController.patchTodo)
router.delete("/:id", authorization, TodoController.deleteTodo)

module.exports = router