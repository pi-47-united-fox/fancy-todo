const { User } = require("../models/index")
const bcrypt = require("bcryptjs")
const { signToken } = require("../helpers/jwt")

class UserController {

    static registerUser(req, res) {
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
                    res.status(400).json({ error: "email has been register !" })
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
                res.status(400).json(err)
            })
    }

    static async loginUser(req, res) {

        try {
            let user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                res.status(401).json({
                    err: "unauthorized email",
                    message: "email or password wrong"
                })
            } else {
                let hash = user.password
                let result = bcrypt.compareSync(req.body.password, hash)
                if (!result) {
                    res.status(401).json({
                        err: "unauthorized email",
                        message: "email or password wrong"
                    })
                } else {
                    let access_token = signToken({ id: user.id, name: user.name, email: user.email })
                    res.status(200).json(access_token)
                }
            }
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = UserController