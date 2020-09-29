const { verify } = require('../helpers/jwt')
const { User, Todo } = require("../models/index")

const authentication = (req, res, next) => {

    const decode = verify(req.headers.access_token)
    console.log(decode)
    User.findOne({ where: { email: decode.email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            } else {
                req.userData = decode
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const authorization = (req, res, next) => {

    Todo.findByPk(req.params.id)
        .then(todo => {
            console.log(todo)
            console.log(req.userData)
            if (!todo) {
                res.status(404).json({ message: "Todo not Found" })
            } else if (todo.UserId !== req.userData.id) {
                res.status(404).json({ message: "you are not authorize" })
            } else {
                next()
            }
        })


}

module.exports = { authentication, authorization }