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
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'El email ya está en uso'
                }
            },
            password: {
                type: DataTypes.STRING
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
