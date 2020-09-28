const router = require('express').Router()

// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})

// * for todo router
router.use('/todos', require('./todoRouter'))

// * for user router
router.use(require('./userRouter'))

module.exports = router