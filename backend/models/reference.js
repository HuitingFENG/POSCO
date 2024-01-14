// models/reference.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Reference extends Model {}

Reference.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: DataTypes.STRING,
  Train: DataTypes.FLOAT,
  Bus: DataTypes.FLOAT,
  Avion: DataTypes.FLOAT,
  Voiture: DataTypes.FLOAT,
}, {
  sequelize,
  modelName: 'reference',
});

module.exports = Reference;

