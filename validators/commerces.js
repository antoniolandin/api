const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator")

// En este validator comprobamos que estén todos los campos requeridos y que no estén vacíos
const validatorCreateCommerce = [
    check('name').exists().notEmpty().withMessage('El nombre es requerido'),
    check('CIF').exists().notEmpty().withMessage('El CIF es requerido'),
    check('email').exists().notEmpty().withMessage('El email es requerido'),
    check('phone').exists().notEmpty().withMessage('El teléfono es requerido'),
    check('address').exists().notEmpty().withMessage('La dirección es requerida'),
    check('id').exists().notEmpty().withMessage('El id es requerido'),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateCommerce }
