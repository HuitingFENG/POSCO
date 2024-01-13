// insertQuestions.js

const sequelize = require('../config/sequelize');
const Question = require('../models/question');
const { questionsList } = require('../data/mockData');

sequelize.sync().then(() => {
    Question.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(questionsList.map(question => Question.create(question)));
    })
    .then(() => {
        console.log("All questions have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting questions:", error);
    });
});

