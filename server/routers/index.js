const router = require('express').Router()
const authentication = require('../middlewares/AuthenticationUser');

// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})

// * for user router (cause dont'n need authentication)
router.use(require('./userRouter'))


// * for todo router
router.use(authentication)
router.use('/todos', require('./todoRouter'))

module.exports = router