const { User } = require("../models")

class Controller{
    static postRegister(req,res){
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
                res.status(400).json({"message":"Validation Error"})
            })

    }
    static postLogin(req,res){

    }
 
}

module.exports = Controller