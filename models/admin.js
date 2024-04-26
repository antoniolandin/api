'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class admin extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
        }
    }
    admin.init(
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
                        msg: 'El email debe ser válido'
                    },
                    notNull: {
                        msg: 'El email es obligatorio'
                    },
                    len: {
                        args: [4, 100],
                        msg: 'El email debe tener entre 4 y 100 caracteres'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 255],
                        msg: 'La contraseña debe tener al menos 8 caracteres'
                    },
                    notNull: {
                        msg: 'La contraseña es obligatoria'
                    }
                }
            }
        },
        {
            sequelize,
            modelName: 'admin',
            hooks: {
                afterValidate: async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    );

    return admin;
};
