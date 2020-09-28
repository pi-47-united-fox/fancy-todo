const router = require('express').Router()
const TodoControllers = require('../controllers/todoController')
const userRouter = require('./user')

const UserController = require('../controllers/userController')

router.post('/todos', TodoControllers.createData)
router.get('/todos', TodoControllers.list)
router.get('/todos/:id', TodoControllers.searchId)
router.put('/todos/:id', TodoControllers.editData)
router.patch('/todos/:id', TodoControllers.editElement)
router.delete('/todos/:id', TodoControllers.deleteData)

router.use('/user', userRouter)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router