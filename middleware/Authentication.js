const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const Authentication=(req,res,next)=>{
    const decoded = verifyToken(req.headers.access_token)

    User.findOne({where:{email:decoded.email}})
        .then(user =>{
            if(!user){
                res.status(404).json({message:'User not found'})
            }else{
                req.userData = decoded
                next()
            }
        })
        .catch(err=>{
            res.status(500).json({err})
        })

}



module.exports = {
    Authentication
}