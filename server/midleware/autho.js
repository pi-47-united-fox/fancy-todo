const { verify } = require('../helpers/jwt')
const { User, Todo } = require("../models/index")

const authentication = (req, res, next) => {
    const decode = verify(req.headers.access_token)
    User.findOne({ where: { email: decode.email } })
        .then(user => {
            if (!user) {
                throw ({ msg: "Users not Found !", statusCode: 404 })
            } else {
                req.userData = decode
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

const authorization = (req, res, next) => {

    Todo.findByPk(req.params.id)
        .then(todo => {
            if (!todo) {
                throw ({ msg: "Todo not Found !", statusCode: 404 })
            } else if (todo.UserId !== req.userData.id) {
                throw ({ msg: "you're not authorized !", statusCode: 404 })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { authentication, authorization }