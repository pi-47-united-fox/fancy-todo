const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

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
}


module.exports = {
    UserController
}