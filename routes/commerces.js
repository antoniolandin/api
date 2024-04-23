const express = require('express')
const router = express.Router()

const { validatorCreateCommerce } = require('../validators/commerces')
const { getCommerces, getCommerce, saveCommerce, updateCommerce, deleteCommerce} = require('../controllers/commerces')

// La ruta get sin ningún parámetro es la que nos devuelve todos los comercios
router.get('/', getCommerces)

// La ruta get con un parámetro CIF nos devuelve un comercio en concreto
router.get('/:CIF', getCommerce)

// La ruta post nos permite crear un comercio, esta ruta tiene un validador que comprueba que los campos requeridos no estén vacíos
router.post('/', validatorCreateCommerce, saveCommerce)

// La ruta put con un parámetro CIF nos permite actualizar un comercio, esta ruta comparte el mismo validator que el anterior
router.put('/:CIF', validatorCreateCommerce, updateCommerce)

// La ruta delete con un parámetro CIF nos permite borrar un comercio
router.delete('/:CIF', deleteCommerce)

module.exports = router
