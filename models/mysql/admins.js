const { db } = require('../../config/mysql.js')
const { DataTypes } = require('sequelize');

const admins = db.define('admins', {
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El nombre es obligatorio'
        },
        validate: {
            max: {
                args: 25,
                msg: 'El nombre no puede tener más de 25 caracteres'
            },
            notEmpty: {
                args: true,
                msg: 'El nombre no puede estar vacío'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El email es obligatorio'
        },
        unique: {
            args: true,
            msg: 'El email ya está en uso'
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'La contraseña es obligatoria'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'La contraseña no puede estar vacía'
            }
        },
        len: {
            args: [8, 255],
            msg: 'La contraseña debe tener al menos 8 caracteres'
        }
    },
});
