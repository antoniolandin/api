const { db } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// El modelo de usuario además de los campos de la tabla, tiene validadores que comprueban que los datos sean correctos y además tiene un hook que se ejecuta después de validar los datos, en este caso se encripta la contraseña antes de ser guardada en la base de datos.
const users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El nombre es obligatorio'
        },
        validate: {
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
            msg: 'El email ya está registrado'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'El email debe ser un correo válido'
            },
            notEmpty: {
                args: true,
                msg: 'El email no puede estar vacío'
            }
        }
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
            },
            len: {
                args: [6, 255],
                msg: 'La contraseña debe tener al menos 6 caracteres'
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: 'La edad debe ser un número entero'
            }
        }
    },
    city: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La ciudad no puede estar vacía'
            }
        }
    },
    interests: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Los intereses no pueden estar vacíos'
            }
        }
    },
    recibeOffers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'El campo recibe ofertas debe ser un booleano'
            }
        }
    }
}, {
    hooks: {
        afterValidate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

module.exports = users;
