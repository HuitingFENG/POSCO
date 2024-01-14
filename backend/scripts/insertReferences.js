// insertReferences.js

const sequelize = require('../config/sequelize');
const Reference = require('../models/reference');
const { countryEmissions } = require('../data/mockData');

sequelize.sync().then(() => {
    const referencesList = countryEmissions;
    Reference.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(referencesList.map(reference => Reference.create(reference)));
    })
    .then(() => {
        console.log("All references have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting references:", error);
    });
});

