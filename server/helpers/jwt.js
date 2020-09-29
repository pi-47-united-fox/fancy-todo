const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}
const verifyToken = (token) => {
    const decode = jwt.verify(token, process.env.SECRET)
    return decode
}

module.exports = { signToken, verifyToken } 