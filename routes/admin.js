const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const { login, register_commerce } = require('../controllers/admin');
const { loginValidator, registerCommerceValidator } = require('../validators');

router.post('/login', loginValidator, login);
router.post('/register-commerce', registerCommerceValidator, register_commerce);

// router.post('/register-commerce', authMiddleware, register_commerce);

module.exports = router;
