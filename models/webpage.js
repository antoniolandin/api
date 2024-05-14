'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class webpage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  webpage.init({
    city: DataTypes.STRING,
    activity: DataTypes.STRING,
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    scoring: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    numReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'webpage',
  });

    webpage.associate = function(models) {
       webpage.belongsTo(models.commerce)
    }
  return webpage;
};
