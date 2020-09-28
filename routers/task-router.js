const router = require('express').Router()
const taskController = require('../controllers/task.controller')

router.post('/', taskController.taskCreate)
router.get('/', taskController.taskFindAll)
router.get('/:id', taskController.taskFindByid)
router.put('/:id', taskController.editById)
router.patch('/:id', taskController.editStatus)
router.delete('/:id', taskController.taskDeleteById)


module.exports = router