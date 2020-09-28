const router = require('express').Router()
const CTodo = require('../controllers/Ctodo.js')

router.get('/',(req,res)=>{
    res.send('bbbb')
})
router.post('/add',CTodo.addHandler)

module.exports = router