const bcryptjs = require('bcryptjs')

class BcriptJs {
    static makeHash (password) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)
        return hash
    }

    static check (password1, password2) {
        return bcryptjs.compareSync(password1, password2)
    }
}

module.exports = BcriptJs