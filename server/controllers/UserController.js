const { User }       = require('../models')
const BcriptJs       = require('../helper/bcryptjs')
const Jwt            = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library')

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

    static async googleLoginC (req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_access_token,
                audience: process.env.CLIENT_ID,
            })
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const email = payload.email

            // Apakah user tersebut pernah login dengan google atau tidak
            // Kalo pernah langsung generate token
            // kalau belum maka create user dan kembalikan access token
            User.findOne({
                where: {
                    email
                }
            }).then((user) => {
                if (!user) {
                    console.log ('masuk : berarti user belum ada di DB')
                    return User.create({
                        email: req.body.email,
                        password: 'User Dont Have A Password - So This is randomly generated - 12312389234234qjkernudfaisdu'
                    })
                } else {
                    return user
                }
            }).then (user => {
                const access_token = Jwt.generate(
                    user.id,
                    user.email
                )
                console.log ('masuk : Berarti user udah ada di DB ')
                return res.status(201).json({access_token})
            }).catch((err) => {
                console.log (err)
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController