const router = require('express').Router()
const TodoController = require('../controllers')


router.get('/todos',TodoController.getTodoHandler)
router.post('/todos',TodoController.createTodoHandler)


module.exports = router