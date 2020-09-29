const bcryptjs = require('bcryptjs')

function hashPassword(password){
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash
}

function comparePassword(password, hash){
    return bcryptjs.compareSync(password, hash)
}

module.exports = {
    hashPassword, comparePassword
}