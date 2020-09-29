const {User} = require('../models')
const Helper = require('../helper/helper')

class CUser{
    static async registerHandler (req,res){
        const obj = {
            email:req.body.email,
            password:req.body.password
        }
        try{
            const data = await User.create(obj)

            res.status(201).json({
                id: data.id,
                email: data.email
            })
        }
        catch(err){
            console.log(err)
            res.status(400).json({ message: err.message })
        }
    }

    static async loginHandler(req,res){
        const obj = {
            email: req.body.email,
            password: req.body.password
        }

        try{
            const data = await User.findOne({where:{
                email:obj.email
            }})

            if(!data){
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else if(!Helper.comparePassword(obj.password,data.password)){
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else{
                const obj = {
                    id: data.id,
                    email:data.email
                }
                const access_token = Helper.signToken(obj)
                res.status(200).json({
                    access_token
                })
                req.headers = access_token
                //console.log(req.headers)
            }


        }
        catch(err){
            res.status(400).json({
                message: err.message
            })

        }
    }

}

module.exports = CUser