const router = require('express').Router()
const UserControllers = require('../controllers/userController')

router.get('/', UserControllers.home)
// router.post('/register', UserControllers.login)
// router.post('/login', UserControllers.register)



module.exports = router