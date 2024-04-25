const mongoose = require('mongoose');
const { handleError } = require('../utils/handleError')
const dbConnect = () => {

    // Obtenemos la URI de la base de datos desde las variables de entorno
    const db_uri = process.env.DB_URI;

    // Evitar warnings de mongoose
    mongoose.set('strictQuery', false);
    
    // Intentamos conectar a la base de datos
    try {
        mongoose.connect(db_uri)
    }
    catch (error) {
        handleError('Error al conectar a la base de datos');
    }
    
    // Eventos de conexión
    mongoose.connection.on("connected", () => { console.log("Conectado a la base de datos") });
}

module.exports = dbConnect;

