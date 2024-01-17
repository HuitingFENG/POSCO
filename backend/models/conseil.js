// models/conseil.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


class Conseil extends Model {}

Conseil.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  type: DataTypes.STRING,
  options: DataTypes.JSON
}, {
  sequelize,
  modelName: 'conseil',
});

module.exports = Conseil;