// scripts/insertResponses.js

const sequelize = require('../config/sequelize');
const Response = require('../models/response');
const { responsesList } = require('../data/mockData'); 

sequelize.sync().then(() => {
    Response.destroy({ where: {
        userId: null,
        questionId: null,
        answer: null
    }, truncate: true })
        .then(() => {
            return Promise.all(responsesList.map(response => Response.create(response)));
        })
        .then(() => {
            console.log("All responses have been inserted successfully");
            sequelize.close(); 
        })
        .catch(error => {
            console.error("Error inserting responses:", error);
        });
});
