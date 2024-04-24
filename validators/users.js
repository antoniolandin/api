const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator')

const validatorCreateUser = [
    check('name').exists().notEmpty().withMessage('El nombre es requerido'),
    check('email').exists().notEmpty().withMessage('El email es requerido'),
    check('password').exists().notEmpty().withMessage('La contraseña es requerida'),
    (req, res, next) => validateResults(req, res, next),
]

module.exports = { validatorCreateUser }
