const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');


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
        console.log(input)

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
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token
                })
            }

        } catch(err) {
            res.status(500).json(err)
        }

    }

    static googleLogin(req, res) {
        const CLIENT_ID = "639126342145-10qrf40f8aett5k1kmphduh1d73g7055.apps.googleusercontent.com"
        const client = new OAuth2Client(CLIENT_ID)
        client.verifyIdToken({
            idToken: req.headers.google_accesss_token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            let email = payload.email
            return User.findOne({
                where: {
                    email: email
                }
            })

        })
        .then(user => {
            if (!user) {
                let userObj = {
                    email: user.email,
                    password: "randompassword"
                }
                return User.create(userObj)
            } else {
                return user
            }
        })
        .then(user => {
            let token  = signToken({id: user.id, email: user.email})
            req.status(200).json({
                access_token: token
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

}

module.exports = UserController