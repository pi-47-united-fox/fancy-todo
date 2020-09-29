const { User } = require("../models")
const bcrypt = require('bcrypt');
const {checkPassword} = require("../helpers/bcrypt")
const {sign, verify} = require("../helpers/jwt")

class Controller{
    static postRegister(req,res,next){    
        User.create(req.body)
            .then(result=>{
                let data = {
                    id : result.id,
                    fullname : result.fullname,
                    email : result.email
                }
                res.status(201).json(data)
            })
            .catch(err=>{
                next(err)
                // res.status(400).json({error:err.message})
            }) 
    }
    static postLogin(req,res,next){
        User.findOne({where:{email:req.body.email}})
            .then(user=>{
                if(user && checkPassword(req.body.password, user.password)){ 
                    let token = sign({id:user.id ,fullname: user.fullname,email:user.email})
                    res.status(200).json({"access_token":token}) 
                }else{ 
                    next({name:"Bad Request",message:"Wrong Email or Password"}) 
                    // res.status(400).json({"message":})
                }
            })
            .catch(err=>{
                next(err) 
                // res.status(500).json({"message":"Internal Server Error"})
            })
    }
 
}

module.exports = Controller