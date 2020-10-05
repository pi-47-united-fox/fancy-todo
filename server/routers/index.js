const router = require('express').Router()
const userRouter = require('../routers/user-router')
const todoRouter = require('../routers/todo-router')


router.get('/', (req,res) => {
    res.send(`Routing berhasil`)
})
router.use('/todos', todoRouter)
router.use('/', userRouter)



module.exports = router