// associateModels.js
const Emission = require('./emission');
const Question = require('./question');
const Response = require('./response');
const User = require('./user');

const associateModels = () => {
    Response.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });
    Question.hasMany(Response, { foreignKey: 'questionId', as: 'responses' });

    Emission.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    User.hasMany(Emission, { foreignKey: 'userId', as: 'emissions' });
};

module.exports = { associateModels };