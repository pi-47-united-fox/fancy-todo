const route = require('express').Router()
const TodoController = require('../controllers/todoController.js')
const UserController = require('../controllers/userController.js')
const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models/index.js')

// middleware for user authentication
const authentication = (req, res, next) => {
    const { access_token } = req.headers
    // console.log(req.headers)
    if(access_token){
        let decode = verifyToken(access_token)
        req.userData = decode
        User.findByPk(req.userData.id)
            .then(result => {
                if(!result){
                    res.status(404).json({message: "User not found."})
                }
                next()
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
    else{
        res.status(401).json({message: "Invalid access!"})
    }
}

// middleware for user authorization
const authorization = (req, res, next) => {
    let todoId = +req.params.id
    const userData = req.userData

    Todo.findByPk(todoId)
        .then(result => {
            if(!result){
                res.status(404).json({
                    message: "Todo's data not found!"
                })
            }
            else if(userData.id !== result.UserId){
                res.status(403).json({
                    message: "You do not have access!"
                })
            }
            else{
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}


route.post('/register', UserController.registerUser)
route.post('/login', UserController.loginUser)

route.use(authentication)
route.get('/todos', TodoController.getAllTask)
route.post('/todos', TodoController.addTask)

route.get('/todos/:id', authorization, TodoController.getTaskById)
route.put('/todos/:id', authorization, TodoController.updateTask)
route.patch('/todos/:id', authorization, TodoController.modifyTaskStatus)
route.delete('/todos/:id', authorization, TodoController.deleteTask)

module.exports = route