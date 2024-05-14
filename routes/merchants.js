const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const {
    registerCommerce,
    updateCommerce,
    getAllCommerces,
    getCommerce,
    deleteCommerce
} = require('../controllers/merchants');
const { registerCommerceValidator } = require('../validators');

router.post('/', registerCommerceValidator, registerCommerce);
router.put('/:id', registerCommerceValidator, updateCommerce);
router.get('/', getAllCommerces);
router.get('/:id', getCommerce);
router.delete('/:id', deleteCommerce);

module.exports = router;
