const jwt = require('jsonwebtoken')

function signToken(payload) {
    return token = jwt.sign(payload, 'rahasiadong')
}

module.exports = {
    signToken
}