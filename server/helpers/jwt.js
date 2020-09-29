
const secret_key = 'zanadh13'
const jwt = require('jsonwebtoken')

function sign(obj){
    return jwt.sign(obj, secret_key);
}

function verify(token){
    return jwt.verify(token, secret_key);
}

module.exports = {sign,verify}


