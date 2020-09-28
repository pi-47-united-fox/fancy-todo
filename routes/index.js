const router = require('express').Router()
const TodoController = require('../controllers')


router.get('/todos',TodoController.getTodoHandler)
router.post('/todos',TodoController.createTodoHandler)
router.get('/todos/:id',TodoController.getTodoByIdHandler)
router.put('/todos/:id',TodoController.putTodoHandler)
router.patch('/todos/:id', TodoController.patchTodoHandler)
router.delete('/todos/:id',TodoController.deleteTodoHandler)


module.exports = router