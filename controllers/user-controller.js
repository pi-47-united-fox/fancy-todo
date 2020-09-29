const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


class UserController {
    static register(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
            .then(data => {
                res.send(data)
                res.status(201).json(data)
            })
            .catch(err => {
               return next(err)
            })
    }
    static login(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: user.email
            }
        })
            .then(data => {
                if (data && bcrypt.compareSync(user.password, data.password)) {
                    var access_token = jwt.sign({ id: data.id, email: data.email }, secret)
                    res.status(200).json({ access_token })
                } else {
                    res.status(400).json({ message: 'Invalid email or password' })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController