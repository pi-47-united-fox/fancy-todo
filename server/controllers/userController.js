const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController{
    static registerHandler(req,res){
        const { email,password } = req.body
        let newUser = {email,password}

        User.findOne({where:{email}})
            .then(result=>{
                if(result){
                    res.status(406).json({message:'email already registered'})
                }else{
                    return User.create(newUser)
                }
            })
            .then(result2=>{
                res.status(201).json({message:'success register',id:result2.id,email:result2.email})
            })
            .catch(err=>{
                res.status(500).json({message:err.errors})
            })
    }

    static loginHandler(req,res){
        const { email,password } = req.body

        User.findOne({where:{email}})
            .then(result=>{
                if(!result){
                    res.status(401).json({name:'Unauthorized',message:'Wrong Email/Password'})
                }else if(!comparePassword(password,result.password)){
                    res.status(401).json({name:'Unauthorized',message:'Wrong Email/Password'})
                }else{
                    const access_token = signToken({id:result.id,email:result.email})
                    res.status(200).json({access_token})
                }
            })
            .catch(err=>{
                res.send(500).json({err})
            })
    }

    static googleLogin(req,res,next){
        let emailGoogle
        const client = new OAuth2Client(process.env.CLIENT_ID);

        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(({payload})=>{
            emailGoogle = payload.email
            return User.findOne({where:{email:emailGoogle}})
        })
        .then(resultuser=>{
            if(!resultuser){
                var userGoogle={
                    email:emailGoogle,
                    password:'123'
                }
                return User.create(userGoogle)
            }else{
                return resultuser
            }
        })
        .then(user=>{
            const access_token = signToken({id:user.id,email:user.email})
            return res.status(201).json({access_token,userId:user.id,message:'berhasil login'})
        })
        .catch(err=>{
            next(err)
        })
    }
}


module.exports = {
    UserController
}