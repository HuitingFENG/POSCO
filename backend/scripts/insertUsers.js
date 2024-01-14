// insertusers.js

const sequelize = require('../config/sequelize');
const User = require('../models/user');
const { usersList } = require('../data/mockData');

sequelize.sync().then(() => {
    User.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(usersList.map(user => User.create(user)));
    })
    .then(() => {
        console.log("All users have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting users:", error);
    });
});

