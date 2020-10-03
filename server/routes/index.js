const route = require('express').Router()
const ApiController = require('../controllers/apiController.js')
const TodoController = require('../controllers/todoController.js')
const UserController = require('../controllers/userController.js')

const { authentication, authorization } = require('../middlewares/userAuth.js')


route.post('/register', UserController.registerUser)
route.post('/login', UserController.loginUser)
route.post('/googleLogin', UserController.googleLogin)

route.use(authentication)
route.get('/todos', TodoController.getAllTask)
route.post('/todos', TodoController.addTask)
route.get('/todos/music', ApiController.searchMusic)

route.get('/todos/:id', authorization, TodoController.getTaskById)
route.put('/todos/:id', authorization, TodoController.updateTask)
route.patch('/todos/:id', authorization, TodoController.modifyTaskStatus)
route.delete('/todos/:id', authorization, TodoController.deleteTask)
route.patch('/todos/:id/music', authorization, ApiController.addMusic)


module.exports = route