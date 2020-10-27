const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models/index.js')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js')

class UserController {
    static registerUser(req, res, next){
        let obj = {
            email : req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: obj.email}})
            .then(user => {
                if(user){
                    next({name:"Non unique email", message: "Email already registered!"})
                }
                else{
                    return User.create(obj)
                }
            })
            .then(result => {
                res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                // res.status(500).json(err.message)
                next(err)
            })
    }

    static async loginUser(req, res, next){
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        try{
            const user = await User.findOne({
                where:{
                    email: input.email
                }
            })

            if(!user){
                // res.status(401).json({
                //     name: 'Unauthorized',
                //     message: 'Wrong email or password!'
                // })
                next({
                    name: 'Unauthorized',
                    message: 'Please use the correct email or password!'
                })
            }
            else if(!comparePassword(input.password, user.password)) {
                // res.status(401).json({
                //     name: 'Unauthorized',
                //     message: 'Wrong email or password!'
                // })
                next({
                    name: 'Unauthorized',
                    message: 'Please use the correct email or password!'
                })
            }
            else{
                const access_token = signToken({id:user.id, email: user.email})
                res.status(200).json({access_token})
            }
        }
        catch(err){
            // res.status(500).json({message: err.message})
            next(err)
        }
    }

    static googleLogin(req, res, next){
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
                    where: { email }
                })
            })
            .then(user => {
                if(!user){
                    let userObj = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(userObj)
                }
                else{
                    return user
                }
            })
            .then(user => {
                const access_token = signToken({id: user.id, email: user.email})
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController