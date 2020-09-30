const router = require('express').Router()
const { TodoController } = require('../controllers')
const { Authentication } = require('../middleware/Authentication')
const { Authorization } = require('../middleware/Authorization')

router.get('/', Authentication  ,TodoController.getTodoHandler)
router.post('/', Authentication  , TodoController.createTodoHandler)
router.get('/:id', Authentication, Authorization  ,TodoController.getTodoByIdHandler)
router.put('/:id', Authentication, Authorization  ,TodoController.putTodoHandler)
router.patch('/:id', Authentication, Authorization  , TodoController.patchTodoHandler)
router.delete('/:id', Authentication, Authorization  ,TodoController.deleteTodoHandler)


module.exports = router
