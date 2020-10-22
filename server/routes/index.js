const router = require("express").Router()

const UserController = require("../controllers/userController")

const todoRoutes = require('./todoRoutes.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use('/todos', todoRoutes)

module.exports = router