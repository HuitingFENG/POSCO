// models/Option.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Option extends Model {}

Option.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  mobiliteCategoryId: {
    type: DataTypes.INTEGER,
  },
  options: {
    type: DataTypes.JSON,
  }
}, {
  sequelize,
  modelName: 'option',
});

module.exports = Option;

