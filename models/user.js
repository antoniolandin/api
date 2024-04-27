'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    user.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre es obligatorio'
                },
                len: {
                    args: [2, 30],
                    msg: 'El nombre debe tener entre 2 y 30 caracteres'
                },
                isString: (value) => {
                    if (typeof value !== 'string') {
                        throw new Error('El nombre debe ser un string');
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'El email ya está en uso'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'El email debe ser un correo válido'
                },
                notNull: {
                    args: true,
                    msg: 'El email es obligatorio'
                },
                len: {
                    args: [4, 30],
                    msg: 'El email debe tener entre 4 y 30 caracteres'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 255],
                    msg: 'La contraseña debe tener entre 6 y 255 caracteres'
                },
                notNull: {
                    args: true,
                    msg: 'La contraseña es obligatoria'
                },
                isString: (value) => {
                    if (typeof value !== 'string') {
                        throw new Error('La contraseña debe ser un string');
                    }
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    args: true,
                    msg: 'La edad debe ser un número entero'
                },
                min: {
                    args: [0],
                    msg: 'La edad mínima es 0'
                },
                max: {
                    args: [150],
                    msg: 'La edad máxima es 150'
                },
            }
        },
        city: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La ciudad no puede estar vacía'
                },
                len: {
                    args: [2, 30],
                    msg: 'La ciudad debe tener entre 2 y 30 caracteres'
                },
                isString: (value) => {
                    if (typeof value !== 'string') {
                        throw new Error('La ciudad debe ser un string');
                    }
                }
            }
        },
        interests: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Los intereses no pueden estar vacíos'
                },
                len: {
                    args: [2, 255],
                    msg: 'Los intereses deben tener entre 2 y 255 caracteres'
                },
                isString: (value) => {
                    if (typeof value !== 'string') {
                        throw new Error('Los intereses deben ser un string');
                    }
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
    },
    {
        sequelize,
        modelName: 'user',
        hooks: {
            afterValidate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    });

    return user;
};
