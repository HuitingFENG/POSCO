// models/question.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'question',
  // additional options
});

module.exports = Question;
