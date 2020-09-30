'use strict'
const router = require('express').Router()
const TodoController = require('../controllers/Todo.js')
const UserController = require('../controllers/User.js')
const ApiController = require('../controllers/Api.js')
const {User,Todo} = require('../models/index.js')
const {verifyToken} = require('../helpers/jwt.js')



const authentication = (req, res, next) => {
    const decoded = verifyToken(req.headers.accessToken)
    User.findOne({where:{email: decoded}})
    .then(data => {
            if(!data) {
                return res.status(404).json({message : 'User Not found'})
            }
            else {
                req.userData = data
                next()
        }
    })
    .catch(err=> {
        return res.status(500).json({message : err.message})
    })
    }


const authorization = (req, res, next) => {
    const id = req.params.id
    const userData = req.userData.id
    Todo.findByPk(id)
    .then(data => {
        console.log(userData)
        if(!data){
            res.status(404).json({message : 'Data Todo Not Found'})
        } else if(userData !== data.UserId) {
            res.status(403).json({message : `You don't have access`})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message : err.message})
    })
}
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get ('/music',ApiController.searchMusic)
router.use(authentication)
router.post('/todos', TodoController.createTodo)
router.get('/todos', TodoController.findAllTodo)
router.get('/todos/:id', TodoController.findByIdTodo)
router.use(authorization)
router.put('/todos/:id',TodoController.updateTodo)
router.patch('/todos/:id', TodoController.updateStatusTodo)
router.delete('/todos/:id',TodoController.deleteTodo)

module.exports = router 