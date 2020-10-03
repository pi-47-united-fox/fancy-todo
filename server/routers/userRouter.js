const router         = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/AuthenticationUser')


router.post('/register', UserController.registerC)
router.post('/login', UserController.loginC)
router.post('/google-login', UserController.googleLoginC)



router.get('/fetch', authentication, UserController.getUserDataById)
router.put('/edit', authentication, UserController.replaceUserByIdC)


module.exports = router