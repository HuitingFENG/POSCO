// models/response.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Response extends Model {}

Response.init({
  userId: DataTypes.INTEGER,
  questionId: DataTypes.INTEGER,
  answer: DataTypes.STRING
}, {
  sequelize,
  modelName: 'response'
});

module.exports = Response;