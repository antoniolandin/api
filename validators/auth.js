const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator')

const validatorRegister = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').not().isEmpty().withMessage('Name is required')
]

const validatorLogin = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

module.exports = {
    validatorRegister,
    validatorLogin,
}
