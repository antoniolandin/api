'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class commerce extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
        // define association here
        }
    }
    commerce.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'El nombre es obligatorio'
                    },
                    len: {
                        args: [3, 20],
                        msg: 'El nombre debe tener entre 3 y 20 caracteres'
                    }
                }
            },
            CIF: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'El CIF ya está en uso'
                },
                validate: {
                    notNull: {
                        msg: 'El CIF es obligatorio'
                    },
                    is: {
                        args: /^[A-Z]\d{8}$/,
                        msg: 'El CIF debe ser una letra mayúscula seguida de 8 dígitos'
                    }
                }
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'La dirección es obligatoria'
                    },
                    len: {
                        args: [3, 30],
                        msg: 'La dirección debe tener entre 3 y 30 caracteres'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'El email es obligatorio'
                    },
                    isEmail: {
                        msg: 'El email debe ser válido'
                    }
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'El teléfono es obligatorio'
                    },
                    len: {
                        args: [3, 9],
                        msg: 'El teléfono debe tener entre 3 y 9 caracteres'
                    },
                    is: {
                        args: /^\d+$/,
                        msg: 'El teléfono debe ser numérico'
                    }
                }
            },
            city: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [3, 20],
                        msg: 'La ciudad debe tener entre 3 y 20 caracteres'
                    }
                }
            },
            activity: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [3, 20],
                        msg: 'La actividad debe tener entre 3 y 20 caracteres'
                    }
                }
            },
            summary: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'El resumen debe tener entre 3 y 255 caracteres'
                    }
                }
            },
            scoring: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                    min: {
                        args: 0,
                        msg: 'La puntuación mínima es 0'
                    },
                    max: {
                        args: 5,
                        msg: 'La puntuación máxima es 5'
                    },
                    isInt: {
                        args: true,
                        msg: 'La puntuación debe ser un número entero'
                    }
                }
            },
            numReviews: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                    min: {
                        args: 0,
                        msg: 'El número mínimo de reseñas es 0'
                    },
                    isInt: {
                        args: true,
                        msg: 'El número de reseñas debe ser un número entero'
                    }
                }
            },
        },
        {
            sequelize,
            modelName: 'commerce',
        }
    );

    return commerce;
};
