const { db } = require('../../config/mysql.js')
const { DataTypes } = require('sequelize');

const admins = db.define('admins', {
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
});
