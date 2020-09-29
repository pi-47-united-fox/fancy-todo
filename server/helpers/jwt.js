const jwt = require("jsonwebtoken")

const signToken = (payload) => {

    return token = jwt.sign(payload, process.env.SECRET);
}


const verify = (token) => {
    return decode = jwt.verify(token, process.env.SECRET)
}


module.exports = { signToken, verify }