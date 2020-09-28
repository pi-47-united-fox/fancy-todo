const router = require('express').Router()
const taskController = require('../controllers/task-controller')

router.get('/', taskController.taskFindAll)
router.post('/', taskController.taskCreate)
router.get('/:id', taskController.taskFindByid)
router.put('/:id', taskController.editById)
router.patch('/:id', taskController.editStatus)
router.delete('/:id', taskController.taskDeleteById)


module.exports = router