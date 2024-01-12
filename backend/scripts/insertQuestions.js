// insertQuestions.js

const sequelize = require('../config/sequelize');
const Question = require('../models/question');
// const questionsList = require('./path/to/questionsData'); // Path to your questions list
const questionsList = [
    { question_text: "What is your first question?" },
    { question_text: "What is your second question?" },
    { question_text: "What is your third question?" },
    { question_text: "What is your fourth question?" },
    { question_text: "What is your fifth question?" },
];

sequelize.sync().then(() => {
    Promise.all(
        questionsList.map(question => Question.create(question))
    )
    .then(() => {
        console.log("All questions have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting questions:", error);
    });
});


