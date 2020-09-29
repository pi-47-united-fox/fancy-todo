const router = require('express').Router()
const APIController = require('../controllers/APIController');

// Testing app
router.get('/', (req, res) => {
    res.send('hello world!')
})

// * for user router (cause dont'n need authentication)
router.use(require('./userRouter'))

// * for todo router
router.use('/todos', require('./todoRouter'))


// ! API
// * for API (pixabay || image)
router.get('/bg', APIController.searchImage)

// * test for API (weatherstack  || weather)
router.get('/w', APIController.getWeather)


module.exports = router