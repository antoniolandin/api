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
                type: DataTypes.STRING
            },
            CIF: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'El CIF ya está en uso'
                }
            },
            address: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            activity: {
                type: DataTypes.STRING
            },
            summary: {
                type: DataTypes.STRING
            },
            scoring: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            numReviews: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        },
        {
            sequelize,
            modelName: 'commerce',
        }
    );

    return commerce;
};
