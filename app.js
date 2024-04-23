const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Creamos la aplicación express
const app = express()

// Le decimos a la aplicación que user cors para evitar el error Corss-Domain (XD)
app.use(cors())
app.use(express.json())

// El puerto es obtenido desde las variables de entorno, si no existe, se usa el puerto 3000
const port = process.env.PORT ?? 3000

// Conectamos a la base de datos
const { sequelize, dbConnectMySql } = require("./config/mysql")

if (process.env.ENGINE_DB === 'nosql'){
    dbConnect()
}
else{
        // Crea las colecciones por defecto si no existieran
        dbConnectMySql()
        sequelize.sync() // Crea las tablas en la base de datos si no existieran
}

// Rutas
app.use('/api', require('./routes'))

// Escuchamos en el puerto
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
