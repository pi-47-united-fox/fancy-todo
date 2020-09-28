const jwt = require("jsonwebtoken")

const signToken = (payload) => {

    return token = jwt.sign(payload, 'fancytodo');
}

module.exports = signToken