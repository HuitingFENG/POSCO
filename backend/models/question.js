// models/question.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Question extends Model {}

Question.init({
  // Define columns
  question_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add more columns as needed
}, {
  sequelize,
  modelName: 'question',
  // additional options
});

module.exports = Question;
