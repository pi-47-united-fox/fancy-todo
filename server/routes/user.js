const router = require('express').Router()
const UserController = require('../controllers/userContoller')

router.post('/googleLogin', UserController.googleLogin)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router