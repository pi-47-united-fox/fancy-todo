const router = require('express').Router()
const UsersControllers = require('../controllers/userController')

router.get('/', UsersControllers.home)
// router.post('/register', UsersControllers.register)
// router.post('/login', UsersControllers.login)



module.exports = router