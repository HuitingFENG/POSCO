// // models/max.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Max extends Model {}

Max.init({
  id: {
    type: DataTypes.INTEGER,
    // autoIncrement: true,
    primaryKey: true
  },
  year: DataTypes.INTEGER,
  PGE_L1 : DataTypes.DECIMAL(10,2),
  PGE_L2 : DataTypes.DECIMAL(10,2),
  PGE_L3 : DataTypes.DECIMAL(10,2),
  PGE_M1 : DataTypes.DECIMAL(10,2),
  PGE_M2 : DataTypes.DECIMAL(10,2),
  PEx_B1 : DataTypes.DECIMAL(10,2),
  PEx_B2 : DataTypes.DECIMAL(10,2),
  PEx_B3 : DataTypes.DECIMAL(10,2),
  PEx_MS1 : DataTypes.DECIMAL(10,2),
  PEx_MS2_Cyber : DataTypes.DECIMAL(10,2),
  PEx_MS2_Optionnelle : DataTypes.DECIMAL(10,2),
  Autres : DataTypes.DECIMAL(10,2),
}, {
  sequelize,
  modelName: 'max',
  tableName: 'maxs',
});

module.exports = Max;



// class Max extends Model {}

// Max.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   year: DataTypes.INTEGER,
//   PGE_L3_FISE: DataTypes.DECIMAL(10,2),
//   PGE_L3_FISA: DataTypes.DECIMAL(10,2),
//   PEx_B2: DataTypes.DECIMAL(10,2),
//   PEx_M2_Msc_Cyber: DataTypes.DECIMAL(10,2),
//   PEx_M2_Optionnelle: DataTypes.DECIMAL(10,2),
// }, {
//   sequelize,
//   modelName: 'max'
// });

