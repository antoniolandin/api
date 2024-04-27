const express = require('express');
const router = express.Router();
const { login, register_commerce } = require('../controllers/admin');

router.post('/login', login);
router.post('/register-commerce', register_commerce);

module.exports = router;
