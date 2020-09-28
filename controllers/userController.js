const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class UserController {
    static register(req, res) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(input)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static async login(req, res) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const user = await User.findOne({
                where: {
                    email: input.email
                }
            })

            if(!user) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else if(!comparePassword(input.password, user.password)) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else {
                const access_token = signToken(user.email)
                res.status(200).json({
                    access_token
                })
            }

        } catch(err) {
            res.status(500).json(err)
        }

    }

}

module.exports = UserController