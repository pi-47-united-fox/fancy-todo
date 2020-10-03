const jwt = require("jsonwebtoken")

function signToken(payload) {
    return jwt.sign(payload, 'rahasia')
}

function verifyToken(access_token) {
    return jwt.verify(access_token, 'rahasia')
}

module.exports = {
    signToken, verifyToken
}