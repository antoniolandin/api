const express = require('express')
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')
const { sequelize } = require("./models")

// Creamos la aplicación express
const app = express()

// Le decimos a la aplicación que user cors para evitar el error Corss-Domain (XD)
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api', require('./routes'))

// Exportamos la aplicación para usarla en otros archivos
module.exports = app
