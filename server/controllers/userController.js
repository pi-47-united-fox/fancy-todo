const { User } = require('../models')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static register(req,res){
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
            next(err)
        })
    }
    static async login (req,res){
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const user = await User.findOne({
                where: {
                    email: input.email
                }
            })
            if(!user) { // email tidak ada
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else if (!comparePassword(input.password, user.password)){ // password tidak ketemu
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else {
                const access_token = signToken(user.email)
                res.status(200).json({
                    access_token: access_token
                })
            }
        } catch (err){
            next(err)
        }
    }
    static googleLogin(req,res){
        //buat instance dari oauth client
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            email = payload['email']
            return User.findOne({
                where: {email}
            })
        })
        .then(user => {
            if(!user){
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
            const access_token = generateToken({
                id: user.id,
                email: user.email
            })
            return res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController