const router = require('express').Router()
const todo = require('../routes/todoRoutes')
const user = require('../routes/userRoutes')

router.get('/',(req,res)=>{
    res.send('aaa')
})


router.use('/todos',todo)
router.use('/user',user)



module.exports = router