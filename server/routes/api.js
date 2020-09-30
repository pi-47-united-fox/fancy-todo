const router = require("express").Router()
const { Auth, Author } = require('../middleware/Auth')
const ApiController = require("../controllers/apiController")

router.get('/holiday', ApiController.getHoliday)
router.post('/holiday', ApiController.searchHoliday)

module.exports = router