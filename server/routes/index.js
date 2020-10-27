const router = require("express").Router()
const TodoController = require("../controllers/todoController")
const UserController = require("../controllers/userController")
const GuardianController = require("../controllers/guardianController")
const { verifyToken } = require("../helpers/jwt")
const { User, Todo } = require("../models/index")


const authentication = (req, res, next) => {
    const decoded = verifyToken(req.headers.access_token)
    // console.log(decoded, "decoded")
    User.findOne({ where: { email: decoded.email } })
        . then(user => {
            if(!user) {
                res.status(404).json( { message: "User Not Found" } )
            } else {
                req.userData = decoded
                // console.log(req.userData, "userdata")
                next()
            }
        })
        .catch(err => {
            res.status(500).json( {message: err.message} )
        })
}

const authorization = (req, res, next) => {
    const targetId = +req.params.id
    Todo.findByPk(targetId)
        .then(todo => {
            // console.log(req.userData, "<< Login")
            if(!todo) {
                res.status(404).json( {message: "Todo Not Found"} )
            } else if(req.userData.id !== todo.UserId) {
                res.status(401).json( {message: "You are not authorized to perform this action."} )
            } else {
                next()
            }
        })
}


router.get('/', TodoController.homeHandler)

// User route
router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/googlelogin', UserController.googleLogin)


router.use(authentication)
router.get('/todos', TodoController.findAllTodos)

router.post('/todos', TodoController.addTodo)

router.get('/dashboard', TodoController.findAllTodoById)

router.get('/todos/:id', authorization, TodoController.findTodoById)

router.delete('/todos/:id', authorization, TodoController.deleteTodo)

router.put('/todos/:id', authorization, TodoController.replaceTodo)

router.patch('/todos/:id', authorization, TodoController.modifyTodo)

// router.get('/users/:id', authorization, TodoController.findAllTodoById)



router.post('/dowrite', GuardianController.addTaskRewriteArticle)





module.exports = router