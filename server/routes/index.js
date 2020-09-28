const router = require('express').Router()
const TodoControllers = require('../controllers/controller')

router.post('/todos', TodoControllers.createData)
router.get('/todos', TodoControllers.list)
router.get('/todos/:id',TodoControllers.searchId)
router.put('/todos/:id', TodoControllers.editData)
router.patch('/todos/:id', TodoControllers.editElement)
router.delete('/todos/:id',)

module.exports = router