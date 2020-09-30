const router = require('express').Router()
const CUser = require('../controllers/Cuser')
const CApi = require('../controllers/CApi')

router.get('/',(req,res)=>{
    res.send('cccc')
})

router.post('/register',CUser.registerHandler)
router.post('/login',CUser.loginHandler)
router.get('/anime',CApi.searchAnime)

module.exports = router


