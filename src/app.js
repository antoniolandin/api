const express = require('express')
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')

// Creamos la aplicación express
const app = express()

// Le decimos a la aplicación que user cors para evitar el error Corss-Domain (XD)
app.use(cors())
app.use(express.json())

// Conectamos a la base de datos
const { db, dbConnectMySql } = require("./config/mysql")

if (process.env.ENGINE_DB === 'nosql'){
    dbConnect()
}
else{
        // Crea las colecciones por defecto si no existieran
        dbConnectMySql()
        db.sync() // Crea las tablas en la base de datos si no existieran
}

// Rutas
app.use('/api', require('./routes'))

// Exportamos la aplicación para usarla en otros archivos
module.exports = {app, db}
