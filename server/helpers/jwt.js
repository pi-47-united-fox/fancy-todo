const jwt = require("jsonwebtoken")

function signToken(payload) {
    return token = jwt.sign(payload, 'rahasia')
}

function verifyToken(token) {
    return token = jwt.verify(token, 'rahasia')
}
module.exports = {
    signToken,
    verifyToken
} 