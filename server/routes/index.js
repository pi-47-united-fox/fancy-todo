'use strict'
const router = require('express').Router()
const Todo = require('../controllers/Todo.js')

router.post('/todos', Todo.createTodo)
router.get('/todos', Todo.findAllTodo)
router.get('todos/:id', Todo.findByIdTodo)
router.put('/todos/:id',Todo.updateTodo)
router.patch('todos/:id', Todo.updateStatusTodo)
router.delete('/todos/:id',Todo.deleteTodo)

module.exports = router 