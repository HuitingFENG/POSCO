// models/user.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  userId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;