const jwt = require('jsonwebtoken')

function signToken(payload) {
    return token = jwt.sign(payload, process.env.SECRET)
}

module.exports = {
    signToken
}