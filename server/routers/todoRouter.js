const router         = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authorization = require('../middlewares/AuthorizationTodo')

// just need the authentication
router.get('/', TodoController.readAllTodoC)
router.post('/', TodoController.createTodoC)
router.get('/:id', TodoController.getTodoByIdC)

// need authentication and authorization (must be the (true) user who have a UserId in that Todo)
router.put('/:id', authorization, TodoController.replaceTodoByIdC)
router.patch('/:id', authorization, TodoController.modifyTodoByIdC)
router.delete('/:id', authorization, TodoController.deleteTodoByIdC)

module.exports = router