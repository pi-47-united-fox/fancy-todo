const jwt = require("jsonwebtoken")

const signToken = (payload) => {

    return token = jwt.sign(payload, process.env.SECRET);
}

module.exports = signToken