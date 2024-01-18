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
/*   name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING */
  name: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for unregistered users
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for unregistered users
    unique: true, // Ensure that email is unique for registered users
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for unregistered users
  },
  tempId: {
    type: DataTypes.UUID, // Store UUID for unregistered users
    allowNull: true,
    unique: true, // Ensure that tempId is unique
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;