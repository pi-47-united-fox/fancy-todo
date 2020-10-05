const { User }       = require('../models')
const BcriptJs       = require('../helper/bcryptjs')
const Jwt            = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library')
const axios = require('axios')


class UserController {
    static registerC (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            // console.log ("register", result)
            return res.status(201).json({
                message: 'Success Created'
            })
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
            // console.log(result.location, 'dari login')
            // check password dengan compare bcrypt
            if (BcriptJs.check(req.body.password, result.password)) {
                // console.log ('masuk')
                // encoding data user menggunakan JWT
                console.log (result.location)
                let access_token = Jwt.generate(
                    result.id,
                    result.email,
                    result.location,
                    result.bg_img
                )
                res.status(200).json({access_token, user_name: result.user_name, bg_img: result.bg_img})
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
                        email: email,
                        password: 'User Dont Have A Password - So This is randomly generated'
                    })
                } else {
                    return user
                }
            }).then (user => {
                const access_token = Jwt.generate(
                    user.id,
                    user.email,
                    user.location,
                    user.bg_img
                )
                console.log ('masuk : Berarti user udah ada di DB ')
                return res.status(201).json({access_token, user_name: user.user_name, bg_img: user.bg_img})
            }).catch((err) => {
                console.log (err)
            });
        } catch (error) {
            console.log(error)
        }
    }

    static getUserDataById (req, res, next) {
        console.log(req.userData)
        return res.status(200).json(req.userData)
    }

    static async replaceUserByIdC (req, res, next) {
        // SEARCH IMAGE BY KEY NAME
        console.log ('MASUK 1')
        const { bg_keyname } = req.body
        // return console.log ('>>>>', q)
        const key = process.env.API_KEY_PIXABAY
        let bg_img = ''
        await axios({
            method: 'GET',
            url: `https://pixabay.com/api/?key=${key}&q=${bg_keyname}`
        }).then(( { data } ) => {
            console.log ("PPIXABAY AMAN")
            bg_img = data.hits[0].largeImageURL
        }).catch((err) => {
            return next(err)
        })
        
        
        await User.update({
            user_name: req.body.user_name,
            email: req.body.email,
            location: req.body.location,
            bg_img
        },{ 
            where: {id: req.userData.id},
            returning: true
        }).then((result) => {
            let access_token = Jwt.generate(
                result.id,
                result.email,
                result.location
            )
            console.log ("USER UPDATE AMAN")
            res.status(200).json({access_token, user_name: result.user_name, bg_img: result.bg_img})
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = UserController