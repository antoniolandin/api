const express = require('express')
const router = express.Router()
const {
    updateCommerce,
    deleteCommerce,
    getAllCommerces,
    getCommercesCity
} = require('../controllers/webpages')
const { updateCommerceValidator } = require('../validators')

router.put('/:CIF', updateCommerce)
router.delete('/:CIF', deleteCommerce)
router.get('/', getAllCommerces)
router.get('/search/:city', getCommercesCity)

module.exports = router
