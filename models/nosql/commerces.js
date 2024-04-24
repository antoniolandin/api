const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

// Definimos el esquema de la colección "commerces"
const CommerceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        CIF: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            unique: true
        },
        address: {
            type: String,
        },
        id: {
            type: Number,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Añadimos el plugin que enlaza el borrado lógico con el borrado físico y añade el campo deleted
CommerceSchema.plugin(mongooseDelete, { overrideMethods: 'all'});

// "commerces" será el nombre de la colección en la base de datos
module.exports = mongoose.model('commerces', CommerceSchema);
