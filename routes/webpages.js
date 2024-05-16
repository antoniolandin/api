const express = require('express')
const router = express.Router()
const {
    updateWebpage,
    deleteWebpage,
    getAllWebpages,
    getWebpagesCity,
    getWebpagesCityActivity,
    createWebpage,
    getWebpage,
    createReview
} = require('../controllers/webpages')

const { createReviewValidator } = require('../validators')

router.post('/', createWebpage)
router.put('/:id', updateWebpage)
router.delete('/:id', deleteWebpage)
router.get('/', getAllWebpages)
router.get('/search/:city', getWebpagesCity)
router.get('/search/:city/:activity', getWebpagesCityActivity)
router.get('/:id', getWebpage)
router.patch('/:id', createReviewValidator, createReview)

module.exports = router
