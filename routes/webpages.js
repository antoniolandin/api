const express = require('express')
const router = express.Router()
const {
    updateWebpage,
    deleteWebpage,
    getAllWebpages,
    getWebpagesCity,
    createWebpage,
    getWebpage 
} = require('../controllers/webpages')

router.post('/', createWebpage)
router.put('/:id', updateWebpage)
router.delete('/:id', deleteWebpage)
router.get('/', getAllWebpages)
router.get('/search/:city', getWebpagesCity)
router.get('/:id', getWebpage)

module.exports = router
