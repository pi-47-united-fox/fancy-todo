const jwt = require('jsonwebtoken')

class Jwt {
    static generate(id, email, loc, bg) {
        return jwt.sign({
            id: id,
            email: email,
            location: loc,
            bg_img: bg
        }, process.env.SECRET)
    }

    static check (access_token) {
        return jwt.verify(access_token, process.env.SECRET)
    }
}

module.exports = Jwt