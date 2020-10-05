const router = require('express').Router()
const APIController = require('../controllers/APIController');
const authentication = require('../middlewares/AuthenticationUser')
// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})


// * for user router (cause dont'n need authentication)
router.use(require('./userRouter'))


router.use(authentication)
// * for todo router
router.use('/todos', require('./todoRouter'))


// ! API
// * for API (pixabay || image)
router.post('/bg', APIController.searchImage) // Moved To User Controller

// * test for API (weatherstack  || weather)
router.get('/w', APIController.getWeather)


module.exports = router