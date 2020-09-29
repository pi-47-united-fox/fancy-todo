const { User } = require('../models')
const Jwt = require('../helper/jwt')

module.exports = (req, res, next) => {
    const { access_token } = req.headers
    try {
        const decripted = Jwt.check(access_token)
        User.findOne({
            where: {email: decripted.email}
        }).then((result) => {
            if (result) {
                req.userData = decripted
                next()
            }
            else {
                next({
                    name: 'not found'
                })
            }
        }).catch((err) => {
            console.log (err)
            return res.status(500).json({
                message: err.message
            })
        })
    } catch (error) {
        next(error)
    }
}