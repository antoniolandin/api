const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const { login, registerCommerce, updateCommerce } = require('../controllers/admin');
const { loginValidator, registerCommerceValidator } = require('../validators');

router.post('/login', loginValidator, login);
router.post('/merchants', registerCommerceValidator, registerCommerce);
router.put('/merchants/:CIF', registerCommerceValidator, updateCommerce);

// router.post('/merchants', authMiddleware, register_commerce);

module.exports = router;
