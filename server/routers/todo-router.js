const router = require('express').Router()
const taskController = require('../controllers/todo-controller')
const weatherController = require('../controllers/api-controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.get('/weather', weatherController.currentWeather)
router.get('/', taskController.findAll)
router.post('/', taskController.create)
router.get('/:id', authorization, taskController.findByid)
router.put('/:id', authorization, taskController.editById)
router.patch('/:id', taskController.editStatus)
router.delete('/:id', authorization, taskController.deleteById)


module.exports = router