// models/user.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;