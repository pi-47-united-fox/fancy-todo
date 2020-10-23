const router = require('express').Router()
const CUser = require('../controllers/Cuser')


router.get('/',(req,res)=>{
    res.send('cccc')
})

router.post('/register',CUser.registerHandler)
router.post('/login',CUser.loginHandler)
router.post('/googleLogin',CUser.googleLoginHandler)

module.exports = router


