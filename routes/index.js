const router = require('express').Router()
const todo = require('../routes/todoRoutes')

router.get('/',(req,res)=>{
    res.send('aaa')
})

router.use('/todos',todo)



module.exports = router