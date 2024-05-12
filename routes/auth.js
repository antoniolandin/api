const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const { registerUserValidator, loginValidator } = require('../validators');

router.post('/register', registerUserValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;
