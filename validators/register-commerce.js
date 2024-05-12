const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator")

const registerCommerceValidator = [
    check('name').exists().isString().isLength({ min: 3, max: 50 }).withMessage('Error en el nombre'),
    check('CIF').exists().isString().matches(/^[A-Z]{1}[0-9]{8}$/).withMessage('Error en el CIF'),
    check('address').exists().isString().isLength({ min: 3, max: 50 }).withMessage('Error en la dirección'),
    check('email').exists().isEmail().withMessage('Error en el email'),
    check('phone').exists().isString().isMobilePhone().withMessage('Error en el teléfono'),
    check('city').isLength({ min: 3, max: 20 }).isString().withMessage('Error en la ciudad').optional(),
    check('activity').isLength({ min: 3, max: 20 }).isString().withMessage('Error en la actividad').optional(),
    check('summary').isLength({ min: 3, max: 200 }).isString().withMessage('Error en el resumen').optional(),
    check('scoring').isNumeric().custom(value => value >= 0 && value <= 5).withMessage('Error en el scoring').optional(),
    check('numReviews').isNumeric().custom(value => value >= 0).withMessage('Error en el número de reviews').optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = registerCommerceValidator
