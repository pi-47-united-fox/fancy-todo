const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.createTodo)
router.get('/', todoController.readTodo)
router.get('/:id', todoController.findTodo)
router.put('/:id', todoController.updateTodo)
router.patch('/:id', todoController.updateAttTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router