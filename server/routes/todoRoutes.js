const router = require("express").Router()

const TodoController = require('../controllers/todoController')

const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.use(authentication)

router.get('/', TodoController.getAllTodo)

router.post('/', TodoController.postCreateTodo)

router.get('/:id',authorization, TodoController.getFindOneTodo)

router.put('/:id',authorization, TodoController.putTodo)

router.patch('/:id',authorization, TodoController.patchTodo)

router.delete('/:id',authorization, TodoController.deleteTodo) 


module.exports = router