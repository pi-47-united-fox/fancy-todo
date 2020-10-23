const router = require('express').Router()
const userRouter = require('./userRouter')
const TodoRouter = require('./TodoRouter')



router.use('/', userRouter)
router.use('/todos',TodoRouter)



module.exports = router