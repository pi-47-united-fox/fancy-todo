const router = require('express').Router()
const TodoControllers = require('../controllers/todoController')
const UserController = require('../controllers/userController')

const { User, Todo } = require('../models')
const { verifyToken } = require('../helpers/jwt')
const ApiController = require('../controllers/api')

const authentication = (req, res, next) => {
    const decoded = verifyToken(req.headers.access_token)
    console.log(decoded)

    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ msg: "User not found!" })
            }
            else {
                req.userData = decoded
                // console.log(req.userData)
                next()
            }
        })
        .catch(err => {
            return res.status(500).json({ message: err.message })
        })
}

const authorization = (req, res, next) => {
    const { id } = req.params
    Todo.findByPk(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ msg: 'Todo not found!' })
            } else if (req.userData.id !== todo.UserId) {
                return res.status(401).json({ msg: 'You are not authorized to manipulate this' })
            }
            else {
                next()
            }
        })
        .catch(err => {
            return res.status(500).json({ message: err.message })
        })
}

router.post('/register', UserController.register)
router.post('/login', UserController.login)



// router.get('/resto', (req, res) => {
//     res.status(200).json({ msg: 'masuk' })
// })

router.get('/movies', ApiController.searchMovies)
router.get('/resto', ApiController.searchResto)


router.use(authentication)
router.post('/todos', TodoControllers.createData)
router.get('/todos', TodoControllers.list)


router.get('/todos/:id', authorization, TodoControllers.searchId)
router.put('/todos/:id', authorization, TodoControllers.editData)
router.patch('/todos/:id', authorization, TodoControllers.editElement)
router.delete('/todos/:id', authorization, TodoControllers.deleteData)



module.exports = router