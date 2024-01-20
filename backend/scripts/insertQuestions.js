// insertQuestions.js

const sequelize = require('../config/sequelize');
const Question = require('../models/question');
const { questionsList } = require('../data/mockData');

// sequelize.sync().then(() => {
//     Question.destroy({
//         where: {},
//         truncate: true 
//     })
//     .then(() => {
//         return Promise.all(questionsList.map(question => Question.create(question)));
//     })
//     .then(() => {
//         console.log("All questions have been inserted successfully");
//         sequelize.close(); 
//     })
//     .catch(error => {
//         console.error("Error inserting questions:", error);
//     });
// });



const insertQuestions = async () => {
    try {
        // Clear existing data
        await Question.destroy({
            where: {},
            truncate: true 
        });
        console.log("Existing questions cleared.");

        // Insert new questions
        for (const question of questionsList) {
            await Question.create(question);
            console.log(`Inserted question: ${question.question_text}`);
        }

        console.log("All questions have been inserted successfully");
    } catch (error) {
        console.error("Error occurred during question insertion:", error);
    } finally {
        sequelize.close();
    }
};

sequelize.sync().then(insertQuestions);