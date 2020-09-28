const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(result => {
                res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static async login(req, res) {
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
                res.status(401).json({
                    name: 'Unauthorized',
                    message: 'Wrong email/password'
                })
            } else if (!comparePass(loginData.password, user.password)) {
                res.status(401).json({
                    name: 'Unauthorized',
                    message: 'Wrong email/password'
                })
            } else {
                const access_token = signToken(user.email)

                res.status(200).json({
                    access_token
                })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController