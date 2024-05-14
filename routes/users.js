const express = require('express');
const router = express.Router();
const { getUsersCity, deleteUser, updateUser } = require('../controllers/users')
const { updateUserValidator } = require('../validators')

router.get('/:city', getUsersCity)
router.delete('/:id', deleteUser)
router.put('/:id', updateUserValidator, updateUser)

module.exports = router
