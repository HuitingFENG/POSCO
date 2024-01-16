// models/response.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Question = require('./question');

class Response extends Model {}

Response.init({
  userId: DataTypes.INTEGER,
  questionId: DataTypes.INTEGER,
  answer: DataTypes.STRING
}, {
  sequelize,
  modelName: 'response'
});

// Response.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });


module.exports = Response;