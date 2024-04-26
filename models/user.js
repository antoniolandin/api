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
                notEmpty: {
                    args: true,
                    msg: 'El nombre no puede estar vacío'
                }
            },
            validate: {
                notNull: {
                    msg: 'El nombre es obligatorio'
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
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 255],
                    msg: 'La contraseña debe tener al menos 6 caracteres'
                },
                notNull: {
                    args: true,
                    msg: 'La contraseña es obligatoria'
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
