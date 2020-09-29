const { User, Todo } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const Auth = (req, res, next) => {
    const decoded = verifyToken(req.headers.access_token)
    User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            } else {
                req.userData = decoded
                next()
            }
        })
        .catch(err => {
            return res.status(500).json({ message: err.message })
        })
}

const Author = (req, res, next) => {
    const { id } = req.params
    Todo.findByPk(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' })
            } else if (req.userData.id !== todo.UserId) {
                return res.status(404).json({ message: 'You are not authorized' })
            } else {
                next()
            }
        })
}

module.exports = {
    Auth,
    Author
}