const { User } = require('../models')
const Jwt = require('../helper/jwt')

module.exports = (req, res, next) => {
    const { access_token } = req.headers
    const decripted = Jwt.check(access_token)
    User.findOne({
        where: {email: decripted.email}
    }).then((result) => {
        if (result) {
            req.userData = decripted
            next()
        } else {
            res.status(404).json({
                message: 'User Not Found!'
            })
        }
    }).catch((err) => {
        return res.status(500).json({
            message: err.message
        })
    })
}