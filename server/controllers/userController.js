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
            console.log(err)
            // res.status(500).json(err)
        }

    }

    static googleLogin(req, res) {
        console.log("masuk controller")
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''

        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            console.log(ticket)
            let payload = ticket.getPayload()
            email = payload['email']
            return User.findOne({
                where: {
                    email: email
                }
            })

        })
        .then(user => {
            if (!user) {
                let userObj = {
                    email: email,
                    password: "randompassword"
                }
                return User.create(userObj)
            } else {
                return user
            }
        })
        .then(user => {
            let access_token  = signToken({id: user.id, email: user.email})
            return res.status(201).json({
                access_token
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

}

module.exports = UserController