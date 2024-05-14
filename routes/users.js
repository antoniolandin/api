const express = require('express');
const router = express.Router();
const { getUsersCity, deleteUser } = require('../controllers/users')

router.get('/:city', getUsersCity)
router.delete('/:id', deleteUser)

module.exports = router
