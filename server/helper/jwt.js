const jwt = require('jsonwebtoken')

class Jwt {
    static generate(id, email) {
        return jwt.sign({
            id: id,
            email: email
        }, process.env.SECRET)
    }
}

module.exports = Jwt