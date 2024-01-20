// models/compensation.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


class Compensation extends Model {}

Compensation.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  type: DataTypes.STRING,
  options: DataTypes.JSON
}, {
  sequelize,
  modelName: 'compensation',
});

module.exports = Compensation;

