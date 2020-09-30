const router         = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerC)
router.post('/login', UserController.loginC)

router.post('/google-login', UserController.googleLoginC)

module.exports = router