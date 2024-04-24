const { db } = require('../../config/mysql')
const { DataTypes } = require('sequelize')

const commerces = db.define('commerces', {
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El nombre del comercio es obligatorio'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'El nombre del comercio no puede estar vacío'
            }
        }
    },
    CIF: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El CIF del comercio es obligatorio' 
        },
        unique: {
            args: true,
            msg: 'El CIF ya está registrado'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'El CIF del comercio no puede estar vacío'
            },
            is: {
                args: /^[A-Z]{1}\d{8}$/,
                msg: 'El CIF debe ser una letra mayúscula seguida de 8 dígitos'
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'La dirección del comercio es obligatoria'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'La dirección del comercio no puede estar vacía'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El email del comercio es obligatorio'
        },
        unique: {
            args: true,
            msg: 'El email ya está registrado'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'El email debe ser válido'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: 'El teléfono del comercio es obligatorio'
        },
        unique: {
            args: true,
            msg: 'El teléfono ya está registrado'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'El teléfono del comercio no puede estar vacío'
            },
            is: {
                args: /^\d{9}$/,
                msg: 'El teléfono debe tener 9 dígitos'
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
    activity: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La actividad no puede estar vacía'
            }
        }
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El título no puede estar vacío'
            }
        }
    },
    summary: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El resumen no puede estar vacío'
            }
        }
    },
    scoring: {
        type: DataTypes.INTEGER,
        validate: {
            isDecimal: {
                args: true,
                msg: 'La puntuación debe ser un número'
            },
        }
    },
    numReviews: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: 'El número de reseñas debe ser un número entero'
            },
        }
    },
})

module.exports = commerces
