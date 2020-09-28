const router = require("express").Router()
const todoController = require("../controllers/todoController")
const userController = require("../controllers/userController")

router.get('/', todoController.homeHandler)

router.get('/todos', todoController.findAllTodos)

router.post('/todos', todoController.addTodo)

router.get('/todos/:id', todoController.findTodoById)

router.delete('/todos/:id', todoController.deleteTodo)

router.put('/todos/:id', todoController.replaceTodo)

router.patch('/todos/:id', todoController.modifyTodo)

// User route
router.post('/register', userController.register)

router.post('/login', userController.login)



module.exports = router