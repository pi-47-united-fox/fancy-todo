const { User } = require('../models')
const BcriptJs = require('../helper/bcryptjs')
const Jwt = require('../helper/jwt')

class UserController {
    static registerC (req, res) {
        User.create({
            email: req.body.email,
            pw: req.body.password
        }).then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            console.log (err)
            return res.status(400).json(err)
        })
    }

    static loginC (req, res) {
        User.findOne({
            email: req.body.email
        }).then((result) => {
            // check password dengan compare bcrypt
            if (result && BcriptJs.check(req.body.password, result.pw)) {
                // encoding data user menggunakan JWT
                let access_token = Jwt.generate(
                    result.id,
                    result.email
                )
                res.status(200).json({access_token})
            } else {
                return res.status(400).json({message : 'Invalid email or password'})
            }
            // return res.status(201).json(result)
        }).catch((err) => {
            // return res.status(400).json(err)
            res.status(500).json({message : err.message})
        })
    }
}

module.exports = UserController