// models/response.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Question = require('./question');

class Response extends Model {}

Response.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null if it's an unregistered user
  },
  tempId: {
    type: DataTypes.UUID,
    allowNull: true, // Allow null if it's a registered user
  },
/*   userId: DataTypes.INTEGER, */
  questionId: DataTypes.INTEGER,
  answer: DataTypes.STRING
}, {
  sequelize,
  modelName: 'response'
});

// Response.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });


module.exports = Response;