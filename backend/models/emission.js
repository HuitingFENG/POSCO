// models/emission.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


class Emission extends Model {}

Emission.init({
  userId: DataTypes.INTEGER,
  responsesList: DataTypes.JSON,
  totalEmissions: DataTypes.DECIMAL(10,2),
}, {
  sequelize,
  modelName: 'emission'
});

module.exports = Emission;