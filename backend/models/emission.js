// models/emission.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


class Emission extends Model {}

Emission.init({
  // userId: DataTypes.INTEGER,
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null for emissions from unregistered users
    // references: {
    //   model: 'user', // Name of the User model, ensure this matches your User model name
    //   key: 'userId',
    // }
  },
  tempId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  responsesList: DataTypes.JSON,
  totalEmissions: DataTypes.DECIMAL(10,2),
  totalConsummationEmissions: DataTypes.DECIMAL(10,2),
  totalCountryEmissions: DataTypes.DECIMAL(10,2)
}, {
  sequelize,
  modelName: 'emission'
});

module.exports = Emission;