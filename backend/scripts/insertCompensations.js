// insertcompensations.js

const sequelize = require('../config/sequelize');
const Compensation = require('../models/compensation');
const { compensationsList } = require('../data/mockData');

sequelize.sync().then(() => {
    Compensation.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(compensationsList.map(compensation => Compensation.create(compensation)));
    })
    .then(() => {
        console.log("All compensations have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting compensations:", error);
    });
});

