// insertOptions.js

const sequelize = require('../config/sequelize');
const Option = require('../models/option');
const { destinationOptionsList } = require('../data/mockData');



const insertOptions = async () => {
    try {
        // Clear existing data
        await Option.destroy({
            where: {},
            truncate: true 
        });
        console.log("Existing Options cleared.");

        // Insert new Options
        for (const option of destinationOptionsList) {
            await Option.create(option);
            console.log(`Inserted Option: ${option.id}`);
        }

        console.log("All Options have been inserted successfully");
    } catch (error) {
        console.error("Error occurred during Option insertion:", error);
    } finally {
        sequelize.close();
    }
};

sequelize.sync().then(insertOptions);