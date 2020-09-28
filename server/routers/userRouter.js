const router         = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerC)
router.post('/login', UserController.loginC)

module.exports = router