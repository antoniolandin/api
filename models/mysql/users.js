const { db } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
    },
    city: {
        type: DataTypes.STRING,
    },
    interests: {
        type: DataTypes.STRING,
    },
    recibeOffers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = users;
