// insertEmissions.js

const sequelize = require('../config/sequelize');
const Emission = require('../models/emission');
const { emissionsList } = require('../data/mockData');

sequelize.sync().then(() => {
    Emission.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(emissionsList.map(Emission => Emission.create(Emission)));
    })
    .then(() => {
        console.log("All Emissions have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting Emissions:", error);
    });
});

