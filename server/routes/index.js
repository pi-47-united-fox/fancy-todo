const route = require('express').Router()
const TodoController = require('../controllers/todoController.js')

route.get('/todos', TodoController.getAllTask)
route.post('/todos', TodoController.addTask)

route.get('/todos/:id', TodoController.getTaskById)
route.put('/todos/:id', TodoController.updateTask)
route.patch('/todos/:id', TodoController.modifyTaskStatus)
route.delete('/todos/:id', TodoController.deleteTask)

module.exports = route