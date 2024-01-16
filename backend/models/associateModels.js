// associateModels.js
const Question = require('./question');
const Response = require('./response');

const associateModels = () => {
    Response.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });
    Question.hasMany(Response, { foreignKey: 'questionId', as: 'responses' });
};

module.exports = { associateModels };