const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(result => {
                return res.status(201).json({
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
                    name: "BadRequest",
                    message: 'Wrong email/password'
                })
            } else if (!comparePass(loginData.password, user.password)) {
                return next({
                    name: "BadRequest",
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

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
                idToken: req.headers.google_access_token,
                audience: process.env.CLIENT_ID,
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                email = payload.email
                return User.findOne({ where: { email } })
            })
            .then(user => {
                if (!user) {
                    var userObj = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(userObj)
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = signToken({ id: user.id, email: user.email })
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = UserController