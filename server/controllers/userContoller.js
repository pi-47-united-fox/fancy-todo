const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(result => {
                console.log(result);
                res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static async login(req, res, next) {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        }

        const user = await User.findOne({
            where: {
                email: loginData.email
            }
        })

        try {
            if (!user) {
                return next({
                    name: "Unauthorized",
                    message: 'Wrong email/password'
                })
            } else if (!comparePass(loginData.password, user.password)) {
                return next({
                    name: "Unauthorized",
                    message: 'Wrong email/password'
                })
            } else {
                const access_token = signToken({ id: user.id, email: user.email })
                res.status(200).json({
                    access_token
                })
            }
        } catch (err) {
            return next({
                name: 'InternalServerError',
                message: message.err
            })
        }
    }
}

module.exports = UserController