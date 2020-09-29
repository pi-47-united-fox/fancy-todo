const router = require('express').Router()
const { User } = require('../models')
const Jwt = require('../helper/jwt')

// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})

// * for user router (cause dont'n need authentication)
router.use(require('./userRouter'))

const authentication = (req, res, next) => {
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

// * for todo router
router.use(authentication)
router.use('/todos', require('./todoRouter'))

module.exports = router