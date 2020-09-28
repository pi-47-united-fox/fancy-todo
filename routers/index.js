const router = require('express').Router()
const userRouter = require('../routers/user-router')
const taskRouter = require('../routers/task-router')


router.get('/', (req,res) => {
    res.send(`Routing berhasil`)
})
router.use('/todos', taskRouter)
router.use('/users', userRouter)



module.exports = router