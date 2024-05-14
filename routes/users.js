const express = require('express');
const router = express.Router();
const { getUsersCity } = require('../controllers/users')

router.get('/:city', getUsersCity)

module.exports = router
