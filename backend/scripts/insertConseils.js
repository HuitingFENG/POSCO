// insertConseils.js

const sequelize = require('../config/sequelize');
const Conseil = require('../models/conseil');
const { conseilsList } = require('../data/mockData');

sequelize.sync().then(() => {
    Conseil.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(conseilsList.map(conseil => Conseil.create(conseil)));
    })
    .then(() => {
        console.log("All conseils have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting conseils:", error);
    });
});

