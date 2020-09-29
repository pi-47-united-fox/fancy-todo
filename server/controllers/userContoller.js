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
                console.log(result);
                res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
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
                res.status(404).json({
                    name: 'Unauthorized',
                    message: 'Wrong email/password'
                })
            } else if (!comparePass(loginData.password, user.password)) {
                res.status(404).json({
                    name: 'Unauthorized',
                    message: 'Wrong email/password'
                })
            } else {
                const access_token = signToken({ id: user.id, email: user.email })
                res.status(200).json({
                    access_token
                })
            }
        } catch (error) {
            res.status(400).json({ message: err.message })
        }
    }
}

module.exports = UserController