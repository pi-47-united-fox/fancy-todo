const { User } = require('../models')
const Helper = require('../helper/helper')
const { OAuth2Client } = require('google-auth-library');


class CUser {
    static async registerHandler(req, res, next) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(obj)

            res.status(201).json({
                id: data.id,
                email: data.email
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async loginHandler(req, res, next) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const data = await User.findOne({
                where: {
                    email: obj.email
                }
            })

            if (!data) {
                next({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else if (!Helper.comparePassword(obj.password, data.password)) {
                next({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else {
                const obj = {
                    id: data.id,
                    email: data.email
                }
                const access_token = Helper.signToken(obj)
                res.status(200).json({
                    access_token
                })
                req.headers = access_token
            }


        }
        catch (err) {
            next(err)
        }
    }

    static googleLoginHandler(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
            //console.log(process.env.CLIENT_ID)
            //console.log(req.headers)
            .then(ticket => {
                //console.log(ticket)
                let payload = ticket.getPayload()
                email = payload['email']
                // console.log(payload)
                // console.log(email)
                return User.findOne({ where: { email: email } })
            })
            .then(user => {
                if (!user) {
                    let userObj = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(userObj)
                }
                else {
                    return user
                }
            })
            .then(user => {
                //console.log(user)
                const access_token = Helper.signToken({ id: user.id, email: user.email })
                //console.log(access_token)
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = CUser