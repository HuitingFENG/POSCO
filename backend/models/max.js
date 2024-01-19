// models/max.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Max extends Model {}

Max.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  year: DataTypes.INTEGER,
  L1: DataTypes.DECIMAL(10,2),
  L2: DataTypes.DECIMAL(10,2),
  L3: DataTypes.DECIMAL(10,2),
  M1: DataTypes.DECIMAL(10,2),
  M2: DataTypes.DECIMAL(10,2),
}, {
  sequelize,
  modelName: 'max'
});

module.exports = Max;

