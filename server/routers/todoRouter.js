const router         = require('express').Router()
const TodoController = require('../controllers/TodoController')

// Testing app
router.post('/', TodoController.createTodoC)
router.get('/', TodoController.readAllTodoC)
router.get('/:id', TodoController.getTodoByIdC)
router.put('/:id', TodoController.replaceTodoByIdC)
router.patch('/:id', TodoController.modifyTodoByIdC)
router.delete('/:id', TodoController.deleteTodoByIdC)

module.exports = router