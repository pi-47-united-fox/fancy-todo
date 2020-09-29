const router         = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { Todo } = require('../models')
const authorization  = (req, res, next) => {
    const { id }   = req.params
    const userDataId = req.userData.id
    Todo.findByPk(id)
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    message : 'Data Todo Not Found'
                })
            } else if (userDataId !== result.UserId) {
                res.status(403).json({
                    message : 'You dont have access'
                })
            } else {
                next()
            }
        }).catch((err) => {
            return res.status(500).json({message : err.message})
        })
}

// just need the authentication
router.get('/', TodoController.readAllTodoC)
router.post('/', TodoController.createTodoC)
router.get('/:id', TodoController.getTodoByIdC)

// need authentication and authorization (must be the (true) user who have a UserId in that Todo)
router.put('/:id', authorization, TodoController.replaceTodoByIdC)
router.patch('/:id', authorization, TodoController.modifyTodoByIdC)
router.delete('/:id', authorization, TodoController.deleteTodoByIdC)

module.exports = router