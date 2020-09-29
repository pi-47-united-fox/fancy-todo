const jwt = require('jsonwebtoken')

function signToken(payload) {
    return acess_token = jwt.sign(payload, 'supersecretkey')

    // return token = jwt.sign(payload, process.env.SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, 'supersecretkey')
}

module.exports = {
    signToken,
    verifyToken
}