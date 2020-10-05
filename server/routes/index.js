'use strict'
const router = require('express').Router()
const TodoController = require('../controllers/Todo.js')
const UserController = require('../controllers/User.js')
const ApiController = require('../controllers/Api.js')
const {authentication, authorization} = require('../middlewares/authentication-authorization.js')

router.get('/', (req, res)=>{
    res.send('play')
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get ('/music',ApiController.searchMusic)
router.get ('/earthquake',ApiController.earthquake)
router.use(authentication)
router.get('/todos', TodoController.findAllTodo)
router.get('/todos/:id', TodoController.findByIdTodo)
router.post('/todos', TodoController.createTodo)
router.put('/todos/:id',authorization,TodoController.updateTodo)
router.patch('/todos/:id',authorization, TodoController.updateStatusTodo)
router.delete('/todos/:id',authorization,TodoController.deleteTodo)

module.exports = router  