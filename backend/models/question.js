// models/question.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Response = require('./response');

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: DataTypes.STRING,
  options: DataTypes.JSON
}, {
  sequelize,
  modelName: 'question',
});

// Question.hasMany(Response, { foreignKey: 'questionId', as: 'responses' });


Question.updateOrder = async () => {
  try {
    // Find questions by their current IDs
    const question1 = await Question.findByPk(4);
    const question2 = await Question.findByPk(5);

    // Update the order by setting new IDs
    question1.id = 5;
    question2.id = 4;

    // Save the changes
    await question1.save();
    await question2.save();

    console.log('Questions order updated successfully.');
  } catch (error) {
    console.error('Error updating question order:', error);
  }
};



module.exports = Question;

