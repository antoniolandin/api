const express = require('express');
const router = express.Router();
const { getAllCommerces, getCommercesCity } = require('../controllers/user');

router.get('/webpages', getAllCommerces);
router.get('/webpages/:city', getCommercesCity);

module.exports = router;
