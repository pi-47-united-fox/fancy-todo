const { User } = require('../models')
const BcriptJs = require('../helper/bcryptjs')
const Jwt      = require('../helper/jwt')

class UserController {
    static registerC (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            // console.log (err)
            // return res.status(400).json({
            //     message: err.errors[0].message
            // })
            return next(err)
        })
    }

    static loginC (req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((result) => {
            // check password dengan compare bcrypt
            if (BcriptJs.check(req.body.password, result.password)) {
                // console.log ('masuk')
                // encoding data user menggunakan JWT
                let access_token = Jwt.generate(
                    result.id,
                    result.email
                )
                res.status(200).json({access_token})
            } else {
                // return res.status(400).json({message : 'Invalid email or password'})
                return next({
                    name: 'invalid email pw input'
                })
            }
            // return res.status(201).json(result)
        }).catch((err) => {
            // console.log (err)
            // return res.status(500).json({
            //     message: 'Invalid email or password'
            // })
            return next({
                name: 'invalid email pw input'
            })
            // return res.status(400).json(err)
        })
    }
}

module.exports = UserController