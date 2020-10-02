const { User } = require("../models/index")
const bcrypt = require("bcryptjs")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');


class UserController {

    static registerUser(req, res, next) {
        let value = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                if (result) {
                    throw ({ msg: "email has been register !", statusCode: 400 })
                } else {
                    return User.create(value)
                }
            })
            .then(data => {
                res.status(200).json({
                    id: data.id,
                    name: data.name,
                    email: data.email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static async loginUser(req, res, next) {

        try {
            let user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                throw ({ msg: "email or password wrong", statusCode: 400 })
            } else {
                let hash = user.password
                let result = bcrypt.compareSync(req.body.password, hash)
                if (!result) {
                    throw ({ msg: "email or password wrong", statusCode: 400 })
                } else {
                    let access_token = signToken({ id: user.id, name: user.name, email: user.email })
                    res.status(200).json({ access_token })
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        // res.send("ok")
        let email = ""
        let name = ""
        const client = new OAuth2Client(process.env.GOOGLEID);
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.GOOGLEID,
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email
                name = payload.name
                console.log(email, name)
                return User.findOne({ where: { email } })
            })
            .then(user => {
                if (!user) {
                    let obj = {
                        name: name,
                        email: email,
                        password: "randompassword"
                    }
                    console.log(obj)
                    return User.create(obj)
                } else {
                    return user
                }

            })
            .then(user => {
                let access_token = signToken({ id: user.id, name: user.name, email: user.email })
                res.status(200).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController