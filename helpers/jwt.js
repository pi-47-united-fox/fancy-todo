const jwt = require("jsonwebtoken")

function signToken(payload) {
    return token = jwt.sign(payload, 'rahasia')
}

module.exports = {
    signToken
}