const router = require("express").Router()

const TodoController = require('../controllers/todoController')

router.get('/todos', TodoController.getAllTodo)
router.get('/todos/:id', TodoController.getTodoByPk)

router.post('/todos', TodoController.createTodo)

router.put('/todos/:id', TodoController.putTodo)

router.patch('/todos/:id', TodoController.patchTodo)

router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router