const router = require('express').Router()
const { UserController } = require('../controllers')





router.post('/register', UserController.registerHandler)

router.post('/login', UserController.loginHandler)

router.post('/googlelogin', UserController.googleLogin)



module.exports = router