const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const { registerCommerce, updateCommerce } = require('../controllers/merchants');
const { loginValidator, registerCommerceValidator } = require('../validators');

router.post('/', registerCommerceValidator, registerCommerce);
router.put('/:CIF', registerCommerceValidator, updateCommerce);

// router.post('/merchants', authMiddleware, register_commerce);

module.exports = router;
