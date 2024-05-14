const express = require('express');
const router = express.Router();
const { login } = require('../controllers/admin');
const { loginValidator } = require('../validators');

router.post('/login', loginValidator, login);

module.exports = router;
