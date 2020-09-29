const { User } = require('../models')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
class UserControllers {

    static home(req, res) {
        res.send(`ini home user`)
    }
    static async register(req, res) {
        const inputRegister = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(inputRegister)
            res.status(201).json(data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

    static async login(req, res) {
        const inputLogin = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const user = await User.findOne({
                where: {
                    email: inputLogin.email
                }
            })
            if (!user) {
                res.status(401).json({
                    name: 'Unauthorized',
                    msg: 'email or password wrong!'
                })
            } else if (!comparePassword(inputLogin.password, user.password)) {
                res.status(401).json({
                    name: 'Unauthorized',
                    msg: 'email or password wrong!'
                })
            } else {
                const access_token = signToken({ id: user.id, username: user.username, email: user.email });
                res.status(200).json({ access_token })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = UserControllers