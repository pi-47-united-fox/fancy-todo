const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt');

const Authentication=(req,res,next)=>{
    console.log('masuk authentication')
    let decoded;
    if(req.headers.access_token){
         decoded = verifyToken(req.headers.access_token)
    }else{
        res.status(500).json({message:'login first'})
    }
    
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