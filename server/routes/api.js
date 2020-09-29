const router = require('express').Router()
const ApiController = require('../controllers/apiController')

router.get('/holiday2020', ApiController.holiday2020)
router.get('/calendarificID/:year', ApiController.calendarID)

module.exports = router