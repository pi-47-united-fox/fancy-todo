const jwt = require('jsonwebtoken')

function signToken(payload){
    return token = jwt.sign(payload, process.env.SECRET)
}

function verifyToken(payload){
    return token = jwt.verify(payload, process.env.SECRET)
}

module.exports = {
    signToken, verifyToken
}