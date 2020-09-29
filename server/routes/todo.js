const router = require('express').Router()
const todoController = require('../controllers/todoController')

const { Auth, Author } = require('../middleware/Auth')

router.use(Auth)
router.post('/', todoController.createTodo)
router.get('/', todoController.readTodo)
router.get('/:id', Author, todoController.findTodo)
router.put('/:id', Author, todoController.updateTodo)
router.patch('/:id', Author, todoController.updateAttTodo)
router.delete('/:id', Author, todoController.deleteTodo)

module.exports = router