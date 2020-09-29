const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const api = require('./api')

router.use('/todos', todo)
router.use(user)
router.use(api)

module.exports = router