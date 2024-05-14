const express = require('express')
const router = express.Router()
const { updateCommerce, deleteCommerce } = require('../controllers/commerces')
const { updateCommerceValidator } = require('../validators')

router.put('/:CIF', updateCommerce)
router.delete('/:CIF', deleteCommerce)

module.exports = router
