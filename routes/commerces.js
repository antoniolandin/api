const express = require('express')
const router = express.Router()
const { update } = require('../controllers/commerces')
const { updateCommerceValidator } = require('../validators')

router.put('/:CIF', update)

module.exports = router
