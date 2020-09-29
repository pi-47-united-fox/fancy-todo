const router = require('express').Router()

// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})

// * for user router (cause dont'n need authentication)
router.use(require('./userRouter'))

// * for todo router
router.use('/todos', require('./todoRouter'))

module.exports = router