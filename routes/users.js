const express = require('express');
const router = express.Router();

const { validatorCreateUser } = require('../validators/users');
const { createUser } = require('../controllers/users');

// Registrar a un usuario
router.post('/', validatorCreateUser, createUser);

module.exports = router;
