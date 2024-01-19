// insertMaxs.js

const sequelize = require('../config/sequelize');
const Max = require('../models/max');
const { maxMobiliteCarbonEmissionList } = require('../data/mockData');

sequelize.sync().then(() => {
    const maxsList = maxMobiliteCarbonEmissionList;
    Max.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(maxsList.map(max => Max.create(max)));
    })
    .then(() => {
        console.log("All maxs have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting maxs:", error);
    });
});

