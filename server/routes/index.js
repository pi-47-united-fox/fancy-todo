'use strict'
const router = require('express').Router()
const TodoController = require('../controllers/Todo.js')
const UserController = require('../controllers/User.js')

router.post('/todos', TodoController.createTodo)
router.get('/todos', TodoController.findAllTodo)
router.get('todos/:id', TodoController.findByIdTodo)
router.put('/todos/:id',TodoController.updateTodo)
router.patch('todos/:id', TodoController.updateStatusTodo)
router.delete('/todos/:id',TodoController.deleteTodo)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router 