const { User } = require("../models")
const bcrypt = require('bcrypt');
const {checkPassword} = require("../helpers/bcrypt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('841246734810-ph9ikv3p8ae847gkere5m2b359glabpe.apps.googleusercontent.com');
const {sign, verify} = require("../helpers/jwt"); 

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

    static postGoogleLogin(req,res,next){ 
        let token =  req.body.id_token
        // console.log(token);  
        let randomedPass = Math.round(Math.random()*100000)+1000000
        // console.log(randomedPass);
        client.verifyIdToken({idToken:token})
            .then(payload=>{
                // console.log(payload.payload);
                return User.findOrCreate({ 
                    defaults: {
                    fullname: payload.payload.name, 
                    email: payload.payload.email,
                    password: randomedPass+""
                    },
                    where: {
                    email:payload.payload.email
                    }
                })
            })
            .then(user=>{ 
                let userData = {id:user[0].id ,fullname: user[0].fullname,email:user[0].email}
                // console.log(userData);
                let token = sign(userData)
                res.status(200).json({"access_token":token}) 
            })
            .catch(err=>{
                next(err) 
            }) 
    }
 
}

module.exports = Controller