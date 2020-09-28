const router = require('express').Router()
const CTodo = require('../controllers/Ctodo.js')

router.get('/',CTodo.listHandler)
router.post('/',CTodo.addHandler)
router.get('/:id',CTodo.findHandler)
router.put('/:id',CTodo.putHandler)
router.patch('/:id',CTodo.patchHandler)
router.delete('/:id',CTodo.deleteHandler)


module.exports = router