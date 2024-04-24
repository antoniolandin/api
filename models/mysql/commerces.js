const { db } = require('../../config/mysql')
const { DataTypes } = require('sequelize')

const commerces = db.define('commerces', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CIF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    city: {
        type: DataTypes.STRING,
    },
    activity: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
    },
    summary: {
        type: DataTypes.STRING,
    },
    scoring: {
        type: DataTypes.INTEGER,
    },
    numReviews: {
        type: DataTypes.INTEGER,
    },
})

module.exports = commerces
