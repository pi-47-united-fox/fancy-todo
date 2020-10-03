const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper{

    static hashPassword(password){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        
        return hash
    }

    static comparePassword(password,hash){
        return bcrypt.compareSync(password,hash)
    }

    static signToken(payload){
        let token
        return token = jwt.sign(payload, process.env.SECRET)
    }

}

module.exports = Helper



