const { Todo } = require('../models')

const authorization = (req,res,next) => {
    Todo.findByPk(req.params.id)
    .then(todo => {
        if(!todo) {
            res.status(404).json({message: 'Not Found'})
        } else if (req.userData.id !== todo.UserId) {
            res.status(401).json({message: 'You are not Authorized'})
        } else {
            next()
        }
    })
}

module.exports = authorization