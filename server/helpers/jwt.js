const jwt = require('jsonwebtoken')


const signToken=(payload)=>{
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}

const verifyToken=(token)=>{
    const verify = jwt.verify(token, process.env.SECRET)
    return verify
}


module.exports = {
    signToken,
    verifyToken
}