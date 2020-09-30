const router = require('express').Router()
const CTodo = require('../controllers/Ctodo.js')
const CApi = require('../controllers/CApi')
const {authentication, authorization} = require('../middlewares/middleware')

router.use(authentication)
router.get('/anime',CApi.searchAnime)
router.get('/',CTodo.listHandler)
router.post('/',CTodo.addHandler)
router.get('/:id',authorization,CTodo.findHandler)
router.put('/:id',authorization,CTodo.putHandler)
router.patch('/:id',authorization,CTodo.patchHandler)
router.delete('/:id',authorization,CTodo.deleteHandler)


module.exports = router